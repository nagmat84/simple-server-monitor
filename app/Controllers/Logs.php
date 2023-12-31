<?php
namespace SSM\Controllers;

use SSM\HTTP;

class Logs {
	const JOURNAL_BIN = "/usr/bin/journalctl";
	const JOURNAL_ARGS = "--output json --since \"-1w\"";
	const JOURNAL_ARG_FACILITY = "--facility";
	const JOURNAL_ARG_PRIORITY = "--priority";
	
	const JOURNAL_TIMESTAMP_FIELD = "__REALTIME_TIMESTAMP";
	const JOURNAL_PRIORITY_FIELD = "PRIORITY";
	const JOURNAL_FACILITY_FIELD = "SYSLOG_FACILITY";
	const JOURNAL_IDENTIFIER_FIELD = "SYSLOG_IDENTIFIER";
	const JOURNAL_MESSAGE_FIELD = "MESSAGE";
	
	const SYSLOG_FACILITY_KERN = 0;
	const SYSLOG_FACILITY_USER = 1;
	const SYSLOG_FACILITY_MAIL = 2;
	const SYSLOG_FACILITY_DAEMON = 3;
	const SYSLOG_FACILITY_AUTH = 4;
	const SYSLOG_FACILITY_SYSLOG = 5;
	const SYSLOG_FACILITY_PRINT = 6;
	const SYSLOG_FACILITY_NEWS = 7;
	const SYSLOG_FACILITY_UUCP = 8;
	const SYSLOG_FACILITY_CRON = 9;
	const SYSLOG_FACILITY_AUTHPRIV = 10;
	const SYSLOG_FACILITY_FTP = 11;
	const SYSLOG_FACILITY_NTP = 12;
	const SYSLOG_FACILITY_AUDIT = 13;
	const SYSLOG_FACILITY_ALERT = 14;
	const SYSLOG_FACILITY_CLOCK = 15;
	const SYSLOG_FACILITY_LOCAL_0 = 16;
	const SYSLOG_FACILITY_LOCAL_1 = 17;
	const SYSLOG_FACILITY_LOCAL_2 = 18;
	const SYSLOG_FACILITY_LOCAL_3 = 19;
	const SYSLOG_FACILITY_LOCAL_4 = 20;
	const SYSLOG_FACILITY_LOCAL_5 = 21;
	const SYSLOG_FACILITY_LOCAL_6 = 22;
	const SYSLOG_FACILITY_LOCAL_7 = 23;
	
	const SYSLOG_SEVERITY_EMERGENCY = 0;
	const SYSLOG_SEVERITY_ALERT = 1;
	const SYSLOG_SEVERITY_CRITICAL = 2;
	const SYSLOG_SEVERITY_ERROR = 3;
	const SYSLOG_SEVERITY_WARNING = 4;
	const SYSLOG_SEVERITY_NOTICE = 5;
	const SYSLOG_SEVERITY_INFO = 6;
	const SYSLOG_SEVERITY_DEBUG = 7;
	
	const QUERY_PARAM_FACILITY = "facility";
	const QUERY_PARAM_PRIORITY = "priority";
	
	public function get( HTTP\GetRequest $request ): HTTP\AbstractJSONResponse {
		$journalArgs = self::JOURNAL_ARGS;
		foreach( $request->getQueryParameters() as $key => $value ) {
			$journalArgs = $journalArgs . match( $key ) {
				self::QUERY_PARAM_FACILITY => " " . self::JOURNAL_ARG_FACILITY . " " . $value,
				self::QUERY_PARAM_PRIORITY => " " . self::JOURNAL_ARG_PRIORITY . " " . $value,
				default => ""
			};
		}
		
		$journalOutput = [];
		$journalResult = 0;
		if( exec(self::JOURNAL_BIN . " " . $journalArgs, $journalOutput, $journalResult) === false ) {
			return HTTP\JSONErrorResponse::createInternalServerError("Could not execute " . self::JOURNAL_BIN);
		}
		if( $journalResult !== 0 ) {
			return HTTP\JSONErrorResponse::createInternalServerError(self::JOURNAL_BIN . " returned with result code " . $journalResult);
		}
		
		$processedJournal = array_map([self::class, 'processJournalEntry'], $journalOutput);
		return new HTTP\JSONSuccessResponse( $processedJournal );
	}
	
	private static function processJournalEntry( string $rawJournalEntry ): array {
		$journalEntry = json_decode( $rawJournalEntry, true, 3, JSON_THROW_ON_ERROR );
		return [
			"timestamp" => intval( $journalEntry[self::JOURNAL_TIMESTAMP_FIELD] ),
			"priority" => intval( $journalEntry[self::JOURNAL_PRIORITY_FIELD] ),
			"facility" => array_key_exists( self::JOURNAL_FACILITY_FIELD, $journalEntry) ? intval( $journalEntry[self::JOURNAL_FACILITY_FIELD] ) : null,
			"identifier" => $journalEntry[self::JOURNAL_IDENTIFIER_FIELD] ?? null,
			"message" => $journalEntry[self::JOURNAL_MESSAGE_FIELD] ?? null
		];
	}
}

?>
