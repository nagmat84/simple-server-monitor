<?php
namespace SSM\Exceptions;

class UnsupportedRequestMethod extends \RangeException {
	function public __construct(string $method) {
		parent::__construct("Unsupported HTTP request method: " . $method);
	}
}
