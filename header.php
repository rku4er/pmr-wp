<?php
/**
* Cltan
* Header
* @package WordPress
* @subpackage MPR
*/
?>
<!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<html>
<head>
	<meta charset="UTF-8">
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<!-- favicons -->
	<link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?php bloginfo('template_url'); ?>/img/favicons/favicon-152.png">
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php bloginfo('template_url'); ?>/img/favicons/favicon-144.png">
	<link rel="apple-touch-icon-precomposed" sizes="120x120" href="<?php bloginfo('template_url'); ?>/img/favicons/favicon-120.png">
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php bloginfo('template_url'); ?>/img/favicons/favicon-114.png">
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php bloginfo('template_url'); ?>/img/favicons/favicon-72.png">
	<link rel="apple-touch-icon-precomposed" sizes="57x57" href="<?php bloginfo('template_url'); ?>/img/favicons/favicon-57.png">
	<link rel="apple-touch-icon-precomposed" sizes="32x32" href="<?php bloginfo('template_url'); ?>/img/favicons/favicon-32.png">
	<link rel="shortcut icon" sizes="32x32 57x57 72x72 114x114 120x120 144x144 152x152" href="<?php bloginfo('template_url'); ?>/img/favicons/favicon.ico">
	<!-- favicons -->
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/style.css">
	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<?php wp_head(); ?>
	<!-- scripts -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/scripts/sticky.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/scripts/carousel.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/scripts/img.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/scripts/scripts.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/scripts/modernizr.custom.44033.js"></script>
	<!-- scripts -->
</head>
<body>

<div id="wrapper">
	<div class="header">
		<div class="container clearfix">
			<span class="logo"></span>
			<span class="m-line"></span>
			<span class="logo_quest"></span>
		</div>
	</div>

	<div class="about">
		<div class="container">
			<p>The Pain Management Resource Center provides you with relevant news and
			information to navigate through regulations, risks, and compliance issues
			associated with opioid therapy. The important clinician resources available in this
			center empower you to keep abreast of the evolving landscape of pain
			management, with access to a variety of valuable clinician and patient tools for
			chronic and acute pain.</p>
		</div>
	</div>

	<div class="webinar">
		<div class="container">
			<h2 class="sticky hdr-hide">webinar</h2>
			<h1 class="hdr-hide">Pain Management 2015</h1>

			<div class="current-v clearfix">
				<?php $webinar = new WP_Query(array('post_type' => 'webinar')); ?>
				<?php $trc = 1 ?>
				<?php while($webinar->have_posts()) : $webinar->the_post(); ?>

					<div class="tab-content" id="tab-<?php echo $trc++; ?>">
						<i class="play desktop"></i>
						<div class="v-info">
							<span class="title"><?php the_title(); ?></span>
							<p class="by">by <span class="author"><?php the_field('author_name'); ?></span></p>
						</div>

						<div class="video" style="background-image: url('<?php the_field('video_preview'); ?>');">
							<div class="author-bio clearfix">
								<div class="avatar">
									<img src="<?php the_field('author_foto'); ?>" />
								</div>
								<div class="bio">
									<span class="name"><?php the_field('author_name'); ?></span>
									<p><?php the_field('bio'); ?></p>
								</div>
							</div>

							<video class="w-video" controls>
								<source src="<?php the_field('video'); ?>" type="video/mp4">
							</video>

							<div class="question">
								<h1><?php the_field('question'); ?></h1>
								<span id="counter">10</span>
								<span class="answer btn yes">Yes</span>
								<span class="answer btn no">No</span>
							</div>
						</div>
					</div>

				<?php endwhile; ?>
				<?php wp_reset_postdata(); ?>
			</div>

			<div class="v-tabs clearfix">
				<ul>
					<?php $webinar = new WP_Query(array('post_type' => 'webinar')); ?>
					<?php $tr = 1; ?>
					<?php while($webinar->have_posts()) : $webinar->the_post(); ?>

					<?php
						$cs = 'empty';
						if(get_field('сoming_soon') =='Enable') {
							$cs = 'coming-soon';
						} elseif (get_field('сoming_soon') == 'Disable') {
							$cs = 'disable';
						}
					?>

					<li class="active <?php echo $cs; ?> clearfix">
						<a href="#tab-<?php echo $tr++; ?>" class="pre-v" style="background-image: url('<?php the_field('video_preview'); ?>');">
							<div class="info">
								<p class="title"><?php the_title(); ?></p>
								<i class="play"></i>
								<p class="play-video">Play Video</p>
								<p class="com-s-title">Coming Soon</p>
							</div>
						</a>
					</li>

					<?php endwhile; ?>
					<?php wp_reset_postdata(); ?>
				</ul>
			</div>
		</div>
	</div>
