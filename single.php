<?php
	$post = $wp_query->post;

	if (in_category('webinar')) {
		include(TEMPLATEPATH.'/single-video.php');
	}
	else {
		include(TEMPLATEPATH.'/single-default.php');
	}
?>