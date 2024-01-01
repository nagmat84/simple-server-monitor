<?php
namespace SSM\HTTP;

use SSM\Exceptions;

abstract class Request {
	protected string $path;
	protected string $lastPathComponent;
	
	protected function __construct() {
		$this->path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
		$this->lastPathComponent = substr($this->path, strrpos($this->path, '/') + 1);
	}
	
	static public function getCurrentRequest() : self {
		return match($_SERVER['REQUEST_METHOD']) {
			"GET" => new GetRequest(),
			default => throw new Exceptions\UnsupportedRequestMethod($_SERVER['REQUEST_METHOD']),
		};
	}
	
	public function getLastPathComponent(): string {
		return $this->lastPathComponent;
	}
}
