<?php

namespace Rewooc\Common;

class Post {
	public static function objectToArray( $post ) {

		$image = new Media( get_post_thumbnail_id($post), 'thumbnail' );
		$image->setImageAlt( $post->post_title );

		return [
			'id'    => $post->ID,
			'title' => $post->post_title,
			'link'  => get_permalink( $post->ID ),
			'image' => $image->getImage(),
			'dateCreated' => $post->post_date,
		];
	}
}