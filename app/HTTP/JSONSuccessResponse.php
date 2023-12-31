<?php
namespace SSM\HTTP;

class JSONSuccessResponse extends AbstractJSONResponse {
	protected array $payload;
	
	public function __construct( array $payload ) {
		parent::__construct(200, "OK");
		$this->payload = $payload;
	}
	
	protected function getResponse(): array {
		return ['payload' => $this->payload];
	}
}

?>
