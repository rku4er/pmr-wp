<div class="v-info">
	<span class="title"><?php the_title(); ?></span>
	<p class="by">by <span class="author"><?php the_field('author_name'); ?></span></p>
</div>

<div class="video" style="background-image: url('<?php the_field('video_preview'); ?>');">

	<video controls>
		<source src="<?php the_field('video'); ?>" type="video/mp4">
		<source src="<?php the_field('video'); ?>" type="video/ogg">
	</video>

	<div class="author-bio clearfix">
		<div class="avatar">
			<img src="<?php the_field('author_foto'); ?>" />
		</div>
		<div class="bio">
			<span class="name"><?php the_field('author_name'); ?></span>
			<p><?php the_field('bio'); ?></p>
		</div>
	</div>

	<div class="question">
		<h1><?php the_field('question'); ?></h1>
		<span id="counter">10</span>
		<a href="#" class="answer btn yes">Yes</a>
		<a href="#" class="answer btn no">No</a>
	</div>
</div> 