'use strict';

/**
 * @constructor
 */
function Application() {
	this.messageBox = document.getElementById( 'message-box' );
	this.rootURL = '';
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

	// Determine the root URL of the WebApp.
	// The root URL is required to construct URLs for the Web Worker Fetch API
	// and which point to our backend API.
	// If the WebApp is installed not installed inside the root of a domain
	// (e.g. `https://ssm.my-domain.tld/) but in some sub-path (e.g.
	// `https://www.my-domain.tld/ssm/), then using `window.location.origin`
	// is not sufficient as it does include the sub-path.
	//
	// Here we use a heuristic to determine the root URL.
	// As this code is executed very early, `index.html` is loaded.
	// Depending on the configuration of the web-server,
	// `window.location.pathname` may look like:
	//  - `/<sub-path>/index.html`
	//  - `/<sub-path>/`
	//  - `/<sub-path>`
	// If present, we strip off a trailing `index.html` or `/` and normalize
	// it such that is always equals the third pattern.

	this.rootURL =
		window.location.protocol +
		window.location.hostname +
		(window.location.port ? ':' + window.location.port : '') +
		window.location.pathname.replace(/\/?(index\.html)?$/, '');

	const logView = new LogView(this);
	logView.init();
};

function init() {
	const app = new Application();
	app.init();
}
