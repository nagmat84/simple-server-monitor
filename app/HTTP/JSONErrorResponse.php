<?php
namespace SSM\HTTP;

class JSONErrorResponse extends AbstractJSONResponse {
	protected function __construct (int $code, string $message) {
		parent::__construct($code, $message);
	}
	
	static public function createNotFound(string $errorMessage = "") : JSONErrorResponse {
		return new self(404, ($errorMessage === "" ? "Not found" : $errorMessage));
	}
	
	static public function createMethodNotAllowed() : JSONErrorResponse {
		return new self(405, "Method not allowed");
	}
	
	static public function createInternalServerError(string $errorMessage = "") : JSONErrorResponse {
		return new self(500, ($errorMessage === "" ? "Internal Server Error" : $errorMessage));
	}
	
	protected function getResponse(): array {
		return [];
	}
}

?>
