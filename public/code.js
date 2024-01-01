'use strict';

/**
 * @typedef {Object} JsonResponse
 * @property {int} code
 * @property {string} message
 */

/**
 * @typedef {Object} JsonErrorResponse
 * @augments JsonResponse
 * @property {int} code
 * @property {string} message
 */

/**
 * @typedef {Object} JsonLogResponse
 * @augments JsonResponse
 * @property {int} code
 * @property {string} message
 * @property {?JsonLogEntry[]} payload
 */

/**
 * @typedef {Object} JsonLogEntry
 * @property {int} timestamp
 * @property {int} priority
 * @property {?int} facility
 * @property {?string} identifier
 * @property {string} message
 */

/**
 * @constructor
 */
function App() {
	this.messageBox = document.getElementById( 'message-box' )
	this.backupLogTable = document.getElementById( 'backup-log-table' );
	this.logTableRowFragment = document.getElementById( 'log-tr-fragment' ).content;
	Object.seal( this );
}

App.prototype.clearMessage = function() {
	this.showMessage( '' );
};

/**
 * @param {string} msg
 */
App.prototype.showMessage = function( msg ) {
	this.messageBox.textContent = msg;
};

/**
 * @param {JsonErrorResponse} json
 * @return {boolean}
 */
App.prototype.handleJSONError = function( json ) {
	if( json.code === 200 ) {
		this.clearMessage();
		return false;
	}
	let msg;
	switch( json.code ) {
		case 401:
			msg = 'Authentication failure (Internal error message: "' + json.code + '—' + json.message + '")';
			break;
		case 400:
		case 405:
			msg = 'Client error (Internal error message: "' + json.code + '—' + json.message + '")';
			break;
		case 500:
			msg = 'Server error (Internal error message: "' + json.code + '—' + json.message + '")';
			break;
		default:
			msg = 'Unknown error (Internal error message: "' + json.code + '—' + json.message + '")';
	}
	this.showMessage( msg );
	return true;
};

App.prototype.fetchBackupLogs = function() {
	const successHandler = ( function( app ) {
		return function( json ) {
			app.onBackupLogsFetched( json );
		};
	})( this );

	const errorHandler = ( function( app ) {
		return function( err ) {
			app.showMessage( 'Error: ' + err.message );
		};
	})( this );
	
	const getLogsUrl = new URL('/api/Logs::get', window.location.origin);
	getLogsUrl.searchParams.set('priority', '4');
	getLogsUrl.searchParams.set('facility', '0');
	
	fetch(getLogsUrl, {
		cache: 'no-store',
		headers: {
			'Accept': 'application/json'
		}
	}).then( function( response ) {
		return response.json();
	} ).then( successHandler ).catch( errorHandler );
};

App.prototype.onBackupLogsFetched = function( logResponseJSON ) {
	if( this.handleJSONError( logResponseJSON ) )
		return;
	const newTableBody = document.createElement( "tbody" );
	const logTableRowFragment = this.logTableRowFragment;
	const locale = 'de-DE';
	const timeOptions = { dateStyle: 'medium', timeStyle: 'short' };
	const timeSuffix = ' Uhr';
	logResponseJSON.payload.forEach( function( logEntry ) {
		const curTrFragment = logTableRowFragment.cloneNode( true );
		const timestamp = new Date( logEntry.timestamp );
		curTrFragment.querySelector( 'td.log-time' ).textContent = timestamp.toLocaleString( locale, timeOptions ) + timeSuffix;
		curTrFragment.querySelector( 'td.log-priority' ).textContent = logEntry.priority;
		curTrFragment.querySelector( 'td.log-facility' ).textContent = logEntry.facility;
		curTrFragment.querySelector( 'td.log-identifier' ).textContent = logEntry.identifier;
		curTrFragment.querySelector( 'td.log-message' ).textContent = logEntry.message;
		newTableBody.appendChild( curTrFragment.firstElementChild );
	} );
	this.backupLogTable.querySelector( 'tbody' ).replaceChildren( ...newTableBody.children );
};

App.prototype.init = function() {
	if(! 'content' in document.createElement('template') ) {
		this.showMessage( 'Browser too old' );
		return;
	}
	
	this.fetchBackupLogs();
};

function init() {
	const app = new App();
	app.init();
}
