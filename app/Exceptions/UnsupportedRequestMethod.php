<?php
namespace SSM\Exceptions;

class UnsupportedRequestMethod extends \RangeException {
	public function __construct( string $method ) {
		parent::__construct( "Unsupported HTTP request method: " . $method );
	}
}
