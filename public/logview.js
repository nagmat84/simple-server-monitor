'use strict';

/**
 * @constructor
 * @param {Application} app
 */
function LogView(app) {
	this.app = app;
	this.backupLogTable = document.getElementById( 'backup-log-table' );
	this.logTableRowFragment = document.getElementById( 'log-tr-fragment' ).content;
	Object.seal( this );
}

LogView.LogPriority = [];

LogView.LogPriority.DEBUG = {
	level: 7,
	shortText: 'DBG',
	longText: 'DEBUG',
	cssClass: 'log-entry-debug'
};
Object.seal(LogView.LogPriority.DEBUG);

LogView.LogPriority.INFO = {
	level: 6,
	shortText: 'INFO',
	longText: 'INFO',
	cssClass: 'log-entry-info'
};
Object.seal(LogView.LogPriority.INFO);

LogView.LogPriority.NOTICE = {
	level: 5,
	shortText: 'NOTE',
	longText: 'NOTICE',
	cssClass: 'log-entry-notice'
};
Object.seal(LogView.LogPriority.NOTICE);

LogView.LogPriority.WARNING = {
	level: 4,
	shortText: 'WARN',
	longText: 'WARNING',
	cssClass: 'log-entry-warning'
};
Object.seal(LogView.LogPriority.WARNING);

LogView.LogPriority.ERROR = {
	level: 3,
	shortText: 'ERR',
	longText: 'ERROR',
	cssClass: 'log-entry-error'
};
Object.seal(LogView.LogPriority.ERROR);

LogView.LogPriority.CRITICAL = {
	level: 2,
	shortText: 'CRIT',
	longText: 'CRITICAL',
	cssClass: 'log-entry-critical'
};
Object.seal(LogView.LogPriority.CRITICAL);

LogView.LogPriority.ALERT = {
	level: 1,
	shortText: 'ALRT',
	longText: 'ALERT',
	cssClass: 'log-entry-alert'
};
Object.seal(LogView.LogPriority.ALERT);

LogView.LogPriority.EMERGENCY = {
	level: 0,
	shortText: 'EMRG',
	longText: 'EMERGENCY',
	cssClass: 'log-entry-emergency'
};
Object.seal(LogView.LogPriority.EMERGENCY);

LogView.LogPriority.push(
	LogView.LogPriority.EMERGENCY,
	LogView.LogPriority.ALERT,
	LogView.LogPriority.CRITICAL,
	LogView.LogPriority.ERROR,
	LogView.LogPriority.WARNING,
	LogView.LogPriority.NOTICE,
	LogView.LogPriority.INFO,
	LogView.LogPriority.DEBUG
);
Object.seal(LogView.LogPriority);

LogView.LogFacility = [];

LogView.LogFacility.KERN = {
	index: 0,
	text: "KERNEL"
};
Object.seal(LogView.LogFacility.KERN);

LogView.LogFacility.USER = {
	index: 1,
	text: "USER"
};
Object.seal(LogView.LogFacility.USER);

LogView.LogFacility.MAIL = {
	index: 2,
	text: "MAIL"
};
Object.seal(LogView.LogFacility.MAIL);

LogView.LogFacility.DAEMON = {
	index: 3,
	text: "DAEMON"
};
Object.seal(LogView.LogFacility.DAEMON);

LogView.LogFacility.AUTH = {
	index: 4,
	text: "AUTH"
};
Object.seal(LogView.LogFacility.AUTH);

LogView.LogFacility.SYSLOG = {
	index: 5,
	text: "SYSLOG"
};
Object.seal(LogView.LogFacility.SYSLOG);

LogView.LogFacility.PRINT = {
	index: 6,
	text: "PRINT"
};
Object.seal(LogView.LogFacility.PRINT);

LogView.LogFacility.NEWS = {
	index: 7,
	text: "NEWS"
};
Object.seal(LogView.LogFacility.NEWS);

LogView.LogFacility.UUCP = {
	index: 8,
	text: "UUCP"
};
Object.seal(LogView.LogFacility.UUCP);

LogView.LogFacility.CRON = {
	index: 9,
	text: "CRON"
};
Object.seal(LogView.LogFacility.CRON);

LogView.LogFacility.AUTH_PRIV = {
	index: 10,
	text: "AUTH_PRIV"
};
Object.seal(LogView.LogFacility.AUTH_PRIV);

LogView.LogFacility.FTP = {
	index: 11,
	text: "FTP"
};
Object.seal(LogView.LogFacility.FTP);

LogView.LogFacility.NTP = {
	index: 12,
	text: "NTP"
};
Object.seal(LogView.LogFacility.NTP);

LogView.LogFacility.AUDIT = {
	index: 13,
	text: "AUDIT"
};
Object.seal(LogView.LogFacility.AUDIT);

LogView.LogFacility.ALERT = {
	index: 14,
	text: "ALERT"
};
Object.seal(LogView.LogFacility.ALERT);

LogView.LogFacility.CLOCK = {
	index: 15,
	text: "CLOCK"
};
Object.seal(LogView.LogFacility.CLOCK);

LogView.LogFacility.LOCAL_0 = {
	index: 16,
	text: "LOCAL_0"
};
Object.seal(LogView.LogFacility.LOCAL_0);

LogView.LogFacility.LOCAL_1 = {
	index: 17,
	text: "LOCAL_1"
};
Object.seal(LogView.LogFacility.LOCAL_1);

LogView.LogFacility.LOCAL_2 = {
	index: 18,
	text: "LOCAL_2"
};
Object.seal(LogView.LogFacility.LOCAL_2);
const SYSLOG_FACILITY_LOCAL_2 = 18;

LogView.LogFacility.LOCAL_3 = {
	index: 19,
	text: "LOCAL_3"
};
Object.seal(LogView.LogFacility.LOCAL_3);

LogView.LogFacility.LOCAL_4 = {
	index: 20,
	text: "LOCAL_4"
};
Object.seal(LogView.LogFacility.LOCAL_4);

LogView.LogFacility.LOCAL_5 = {
	index: 21,
	text: "LOCAL_5"
};
Object.seal(LogView.LogFacility.LOCAL_5);

LogView.LogFacility.LOCAL_6 = {
	index: 22,
	text: "LOCAL_6"
};
Object.seal(LogView.LogFacility.LOCAL_6);

LogView.LogFacility.LOCAL_7 = {
	index: 23,
	text: "LOCAL_7"
};
Object.seal(LogView.LogFacility.LOCAL_7);

LogView.LogFacility.push(
	LogView.LogFacility.KERN,
	LogView.LogFacility.USER,
	LogView.LogFacility.MAIL,
	LogView.LogFacility.DAEMON,
	LogView.LogFacility.AUTH,
	LogView.LogFacility.SYSLOG,
	LogView.LogFacility.PRINT,
	LogView.LogFacility.NEWS,
	LogView.LogFacility.UUCP,
	LogView.LogFacility.CRON,
	LogView.LogFacility.AUTH_PRIV,
	LogView.LogFacility.FTP,
	LogView.LogFacility.NTP,
	LogView.LogFacility.AUDIT,
	LogView.LogFacility.ALERT,
	LogView.LogFacility.CLOCK,
	LogView.LogFacility.LOCAL_0,
	LogView.LogFacility.LOCAL_1,
	LogView.LogFacility.LOCAL_2,
	LogView.LogFacility.LOCAL_3,
	LogView.LogFacility.LOCAL_4,
	LogView.LogFacility.LOCAL_5,
	LogView.LogFacility.LOCAL_6,
	LogView.LogFacility.LOCAL_7
);
Object.seal(LogView.LogFacility);

LogView.prototype.fetchBackupLogs = function() {
	const successHandler = ( function( logView ) {
		return function( json ) {
			logView.onBackupLogsFetched( json );
		};
	})( this );

	const errorHandler = ( function( app ) {
		return function( err ) {
			app.showMessage( 'Error: ' + err.message );
		};
	})( this.app );
	
	const getLogsUrl = new URL('/api/Logs::get', window.location.origin);
	getLogsUrl.searchParams.set('priority', LogView.LogPriority.WARNING.level);
	getLogsUrl.searchParams.set('facility', LogView.LogFacility.KERN.index);
	
	fetch(getLogsUrl, {
		cache: 'no-store',
		headers: {
			'Accept': 'application/json'
		}
	}).then( function( response ) {
		return response.json();
	} ).then( successHandler ).catch( errorHandler );
};

/**
 * @param {Date} ts
 * @return {string}
 */
LogView.formatLogTime = function(ts) {
	const Y = ts.getUTCFullYear();
	const M = ts.getUTCMonth()+1;
	const D = ts.getUTCDate();
	const h = ts.getUTCHours();
	const m = ts.getUTCMinutes();
	const s = ts.getUTCSeconds();
	return '' +
		Y + (M < 10 ? '-0': '-') + M + (D < 10 ? '-0': '-') + D +
		(h < 10 ? ' 0': ' ') + h + (m < 10 ? ':0' : ':') + m + (s < 10 ? ':0' : ':') + s;
}

/**
 * @param {JsonLogResponse} logResponseJSON
 */
LogView.prototype.onBackupLogsFetched = function( logResponseJSON ) {
	if( this.app.handleJSONError( logResponseJSON ) )
		return;
	const newTableBody = document.createElement( "tbody" );
	const logTableRowFragment = this.logTableRowFragment;
	logResponseJSON.payload.forEach( function( logEntry ) {
		const curTrFragment = logTableRowFragment.cloneNode( true );
		const timestamp = new Date( logEntry.timestamp );
		curTrFragment.querySelector( 'tr' ).classList.add( LogView.LogPriority[logEntry.priority].cssClass );
		curTrFragment.querySelector( 'td.log-time' ).textContent = LogView.formatLogTime(timestamp);
		curTrFragment.querySelector( 'td.log-priority' ).textContent = LogView.LogPriority[logEntry.priority].shortText;
		curTrFragment.querySelector( 'td.log-facility' ).textContent = LogView.LogFacility[logEntry.facility].text;
		curTrFragment.querySelector( 'td.log-identifier' ).textContent = logEntry.identifier;
		curTrFragment.querySelector( 'td.log-message' ).textContent = logEntry.message;
		newTableBody.appendChild( curTrFragment.firstElementChild );
	} );
	this.backupLogTable.querySelector( 'tbody' ).replaceChildren( ...newTableBody.children );
};

LogView.prototype.init = function() {
	this.fetchBackupLogs();
};
