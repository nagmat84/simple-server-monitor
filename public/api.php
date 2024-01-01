<?php
namespace SSM\API;

error_reporting(E_STRICT|E_ALL);
require_once '../lib/autoload.php';

use SSM\Exceptions;
use SSM\HTTP;

$routes = [
	'Logs::get' => ['\SSM\Controllers\Logs', 'get']
];

/**
 * @throws \ErrorException
 */
function handleError($severity, $message, $fileName, $lineNo) {
    throw new \ErrorException($message, 0, $severity, $fileName, $lineNo);
}

set_error_handler('\SSM\API\handleError');

try {
	$response = null;
	$request = HTTP\Request::getCurrentRequest();
	$apiCall = $request->getLastPathComponent();
	if( !array_key_exists($apiCall, $routes) ) {
		$response = HTTP\JSONErrorResponse::createNotFound("Route does not exist");
	} else {
		$route = $routes[$apiCall];
		$controllerName = $route[0];
		$methodName = $route[1];
		$controller = new $controllerName;
		$response = $controller->$methodName($request);
	}
	$response->send();
} catch( Exceptions\UnsupportedRequestMethod ) {
	try {
		$response = HTTP\JSONErrorResponse::createMethodNotAllowed();
		$response->send();
	} catch( \Throwable ) {}
} catch( \JsonException $e ) {
	try {
		$response = HTTP\JSONErrorResponse::createInternalServerError( $e->getMessage() );
		$response->send();
	} catch( \Throwable ) {}
} catch(\Throwable $e) {
	try {
		$response = HTTP\JSONErrorResponse::createInternalServerError( $e->getFile() . ":" . $e->getLine() . ":" . $e->getMessage() );
		$response->send();
	} catch( \Throwable ) {}
}
