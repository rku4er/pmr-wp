<?php
/**
* @package WordPress
* @subpackage Clean
*/

// Функция для Title сайта
function clean_wp_title( $title, $sep ) {
	global $paged, $page;

	if ( is_feed() )
		return $title;
	// Add the site name.
	$title .= get_bloginfo( 'name' );
	// Add the site description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		$title = "$title $sep $site_description";
	// Add a page number if necessary.
	if ( $paged >= 2 || $page >= 2 )
		$title = "$title $sep " . sprintf( __( 'Page %s', 'twentythirteen' ), max( $paged, $page ) );
	return $title;
}
add_filter( 'wp_title', 'clean_wp_title', 10, 2 );

// Регистрируем 2 меню
register_nav_menus( array(
	'top' => 'Верхнее меню',
	'left' => 'Нижнее'
) );

// Миниатюры постов
add_theme_support('post-thumbnails');
set_post_thumbnail_size( 254, 190 );
add_image_size( 'live-meeting-thumb', 216, 120, true );

// Регистрируем сайдбар
if ( function_exists('register_sidebar') )
register_sidebar();

// Заголовок письма на почте
add_filter('wp_mail_from_name', 'new_mail_from_name');

function new_mail_from_name($old) {
	return 'COMPANY_NAME_HERE';
}

add_filter('show_admin_bar', '__return_false');


function remove_menus(){
  remove_menu_page( 'index.php' );
  remove_menu_page( 'edit.php' );
  // remove_menu_page( 'upload.php' );
  remove_menu_page( 'edit.php?post_type=page' );
  remove_menu_page( 'edit-comments.php' );
  remove_menu_page( 'themes.php' );
  remove_menu_page( 'plugins.php' );
  // remove_menu_page( 'users.php' );
  // remove_menu_page( 'tools.php' );
  remove_menu_page( 'options-general.php' );
}
add_action( 'admin_menu', 'remove_menus' );

// function remove_acf_menu() {
// 	remove_menu_page('edit.php?post_type=acf');
// }
// add_action( 'admin_menu', 'remove_acf_menu', 999);





// Limit post
function trim_title_chars($count, $after) {
	$title = get_the_title();
	if (mb_strlen($title) > $count) $title = mb_substr($title,0,$count);
	else $after = '';
	echo $title . $after;
}

function custom_excerpt_length( $length ) {
	return 40;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

function new_excerpt_more( $more ) {
	return '..';
}
add_filter('excerpt_more', 'new_excerpt_more');


function content($num) {
	$theContent = get_the_content();
	$output = preg_replace('/<img[^>]+./','', $theContent);
	$output = preg_replace( '/<blockquote>.*<\/blockquote>/', '', $output );
	$output = preg_replace( '|\[(.+?)\](.+?\[/\\1\])?|s', '', $output );
	$limit = $num+1;
	$content = explode(' ', $output, $limit);
	array_pop($content);
	$content = implode(" ",$content)."...";
	echo $content;
}

// Max File Limit
add_filter( 'upload_size_limit', 'my_upload_size_limit' );
function my_upload_size_limit( $limit ) {
    return wp_convert_hr_to_bytes( '1000M' );
}


/**
 * Configuration values
 */
if (!defined('WP_ENV')) {
  // Fallback if WP_ENV isn't defined in your WordPress config
  // Used in lib/assets.php to check for 'development' or 'production'
  define('WP_ENV', 'production');
}

if (!defined('DIST_DIR')) {
  // Path to the build directory for front-end assets
  define('DIST_DIR', '/dist/');
}


/**
 * Scripts and stylesheets
 *
 * Enqueue stylesheets in the following order:
 * 1. /theme/dist/styles/main.css
 *
 * Enqueue scripts in the following order:
 * 1. /theme/dist/scripts/modernizr.js
 * 2. /theme/dist/scripts/main.js
 */

class JsonManifest {
  private $manifest;

  public function __construct($manifest_path) {
    if (file_exists($manifest_path)) {
      $this->manifest = json_decode(file_get_contents($manifest_path), true);
    } else {
      $this->manifest = [];
    }
  }

  public function get() {
    return $this->manifest;
  }

  public function getPath($key = '', $default = null) {
    $collection = $this->manifest;
    if (is_null($key)) {
      return $collection;
    }
    if (isset($collection[$key])) {
      return $collection[$key];
    }
    foreach (explode('.', $key) as $segment) {
      if (!isset($collection[$segment])) {
        return $default;
      } else {
        $collection = $collection[$segment];
      }
    }
    return $collection;
  }
}

function asset_path($filename) {
  $dist_path = get_template_directory_uri() . DIST_DIR;
  $directory = dirname($filename) . '/';
  $file = basename($filename);
  static $manifest;

  if (empty($manifest)) {
    $manifest_path = get_template_directory() . DIST_DIR . 'assets.json';
    $manifest = new JsonManifest($manifest_path);
  }

  if (array_key_exists($file, $manifest->get())) {
    return $dist_path . $directory . $manifest->get()[$file];
  } else {
    return $dist_path . $directory . $file;
  }
}

function assets() {
  wp_enqueue_style('sage_css', asset_path('styles/main.css'), false, null);

  if (is_single() && comments_open() && get_option('thread_comments')) {
    wp_enqueue_script('comment-reply');
  }

  wp_enqueue_script('wtools', 'http://prihcs.com/dev/temp/js/wtools-noscroll.js', [], null, false);
  wp_enqueue_script('modernizr', asset_path('scripts/modernizr.js'), [], null, true);
  wp_enqueue_script('sage_js', asset_path('scripts/main.js'), ['jquery'], null, true);
}
add_action('wp_enqueue_scripts', 'assets', 100);
