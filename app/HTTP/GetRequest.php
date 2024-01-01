<?php
namespace SSM\HTTP;

class GetRequest extends Request {
	protected array $queryParameters;
	
	protected function __construct() {
		parent::__construct();
		$this->queryParameters = $_GET;
	}
	
	public function getQueryParameters() : array {
		return $this->queryParameters;
	}
}
