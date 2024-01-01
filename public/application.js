'use strict';

/**
 * @constructor
 */
function Application() {
	this.messageBox = document.getElementById( 'message-box' )
	Object.seal( this );
}

Application.prototype.clearMessage = function() {
	this.showMessage( '' );
};

/**
 * @param {string} msg
 */
Application.prototype.showMessage = function(msg ) {
	this.messageBox.textContent = msg;
};

/**
 * @param {JsonErrorResponse} json
 * @return {boolean}
 */
Application.prototype.handleJSONError = function(json ) {
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

Application.prototype.init = function() {
	if(! 'content' in document.createElement('template') ) {
		this.showMessage( 'Browser too old' );
		return;
	}

	const logView = new LogView(this);
	logView.init();
};

function init() {
	const app = new Application();
	app.init();
}
