'use strict';

/**
 * @constructor
 * @param {Application} app
 */
function LogView(app) {
	this.app = app;
	/**
	 * @type {LogTable[]}
	 */
	this.logTables = [];
	/**
	 * @type {HTMLDivElement}
	 */
	this.htmlViewRoot = document.getElementById( 'log-view' );
	Object.seal( this );
}

LogView.prototype.init = function() {
	for (const tableConfig of Config.logView.logTables) {
		const logTable = new LogTable(this.app, this, tableConfig);
		this.logTables.push(logTable);
		logTable.init();
	}
};

/**
 * @param {HTMLTableElement} table
 */
LogView.prototype.appendLogTable = function(table) {
	this.htmlViewRoot.appendChild(table);
}
