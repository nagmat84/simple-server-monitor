<?php
namespace SSM\HTTP;

abstract class AbstractJSONResponse {
	protected int $code;
	protected string $message;
	
	protected function __construct(int $code, string $message) {
		$this->code = $code;
		$this->message = $message;
	}

	/**
	 * @throws \JsonException
	 */
	public function send(): never {
		\header( 'Cache-Control: no-cache' );
		\header( 'Content-type: application/json; charset=UTF-8' );
		\http_response_code( $this->code );
		$response = $this->getResponse();
		$response['code'] = $this->code;
		$response['message'] = $this->message;
		echo( \json_encode( $response, \JSON_THROW_ON_ERROR ) );
		exit();
	}
	
	abstract protected function getResponse(): array;
}
