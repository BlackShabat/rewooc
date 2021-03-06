<?php

namespace Rewooc\Core;

use Rewooc\Common\Media;
use Rewooc\Common\Navigation;
use Rewooc\Common\User;
use Rewooc\Shop\Cart;

class View {

	/**
	 * Return global app data for all pages
	 *
	 * @return array
	 */
	private static function getCommonData() {

		return [
			'headerNavigation' => self::getHeaderNavigation(),
			'logo'             => self::getLogo(),
			'favicon'          => self::getFavicon(),
			'phone'            => self::getPhone(),
			'price'            => self::getCurrencyFormat(),
			'baseUrl'          => self::baseUrl(),
			'ajaxUrl'          => self::ajaxUrl(),
			'siteMeta'         => self::getSiteMeta(),
			'cart'             => Cart::getCartItems( WC()->cart->get_cart_contents() ),
			'user'             => self::getUserData()
		];
	}

	/**
	 * Provide data to Frontend
	 *
	 * @param array $data - an array with data for specific page
	 *
	 */
	public static function renderPage( $data ) {
		wp_send_json( $data );
	}

	public static function response( $data ) {
		wp_send_json( $data );
	}

	public static function responseSuccess( $data = null ) {
		wp_send_json_success( $data );
	}

	public static function responseError( $data = null ) {
		wp_send_json_error( $data );
	}

	public static function renderCommonData() {
		wp_send_json( self::getCommonData() );
	}

	private static function getCurrencyFormat() {
		return [
			'thousandSeparator' => wc_get_price_thousand_separator(),
			'decimalSeparator'  => wc_get_price_decimal_separator(),
			'decimals'          => wc_get_price_decimals(),
			'priceFormat'       => get_woocommerce_price_format(),
			'currencySymbol'    => html_entity_decode( get_woocommerce_currency_symbol() )
		];
	}

	private static function getLogo() {
		$imageId = get_theme_mod( 'custom_logo' );
		if ( ! $imageId ) {
			return false;
		}

		$logo = new Media( $imageId );

		return $logo->getImages();

	}

	private static function getPhone() {
		return get_theme_mod( 'rewooc_site_phone' );
	}

	private static function getSiteMeta() {
		return [
			'title'       => get_bloginfo( 'name' ) . '' . wp_title( '', false ),
			'description' => get_bloginfo( 'description' ),
			'charset'     => get_bloginfo( 'charset' )
		];
	}

	private static function baseUrl() {
		return parse_url( site_url(), PHP_URL_PATH ) ?: '';
	}

	private static function ajaxUrl() {
		return \WC_AJAX::get_endpoint( '%%endpoint%%' );
	}

	private static function getHeaderNavigation() {
		$headerNav = new Navigation( 'header_nav' );

		return $headerNav->getNav( [ 'ID', 'title', 'menu_item_parent', 'url' ] );
	}

	private static function getFavicon() {
		return get_site_icon_url();
	}

	private static function getUserData() {
		$wpUser = get_user_by( 'id', get_current_user_id() );
		if ( ! $wpUser ) {
			return false;
		}

		$user = new User( $wpUser );

		return $user->getData();

	}
}