'use strict';

/**
 * @constructor
 * @param {Application} app
 * @param {LogView} logView
 * @param {LogTableConfig} tableConfig
 */
function LogTable(app, logView, tableConfig) {
    this.app = app;
    this.logView = logView;
    this.tableConfig = tableConfig;
    /**
     * @type {?HTMLDivElement}
     */
    this.htmlTableContainer = null;
    this.logTableContainerFragment = document.getElementById( 'log-table-container-fragment' ).content;
    this.logTableRowFragment = document.getElementById( 'log-tr-fragment' ).content;
    Object.seal( this );
}

LogTable.prototype.createTable = function() {
    const tableContainerFragment = this.logTableContainerFragment.cloneNode(true);
    tableContainerFragment.querySelector('caption').textContent = this.tableConfig.caption;
    this.htmlTableContainer = tableContainerFragment.firstElementChild;
    this.logView.appendLogTable(this.htmlTableContainer);
}

LogTable.prototype.fetchLog = function() {
    const successHandler = ( function( logTable ) {
        return function( json ) {
            logTable.onLogFetched( json );
        };
    })( this );

    const errorHandler = ( function( app ) {
        return function( err ) {
            app.showMessage( 'Error: ' + err.message );
        };
    })( this.app );

    const getLogsUrl = new URL(this.app.rootURL + '/api/Logs::get');
    if( this.tableConfig.priority !== null ) {
        getLogsUrl.searchParams.set('priority', '' + this.tableConfig.priority.level);
    }
    if( this.tableConfig.facility !== null ) {
        getLogsUrl.searchParams.set('facility', '' + this.tableConfig.facility.index);
    }

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
LogTable.formatLogTime = function(ts) {
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
LogTable.prototype.onLogFetched = function( logResponseJSON ) {
    if( this.app.handleJSONError( logResponseJSON ) )
        return;
    const newTableBody = document.createElement( "tbody" );
    const logTableRowFragment = this.logTableRowFragment;
    // Currently hard-coded: Put most recent entries to the top
    logResponseJSON.payload.sort((a, b) =>
        Math.sign(b.timestamp - a.timestamp)
    );
    logResponseJSON.payload.forEach( function( logEntry ) {
        const curTrFragment = logTableRowFragment.cloneNode( true );
        const timestamp = new Date( logEntry.timestamp );
        curTrFragment.querySelector( 'tr' ).classList.add( LogPriority[logEntry.priority].cssClass );
        curTrFragment.querySelector( 'td.log-time' ).textContent = LogTable.formatLogTime(timestamp);
        curTrFragment.querySelector( 'td.log-priority' ).textContent = LogPriority[logEntry.priority].shortText;
        if( logEntry.facility !== null ) {
            curTrFragment.querySelector('td.log-facility').textContent = LogFacility[logEntry.facility].text;
        }
        curTrFragment.querySelector( 'td.log-identifier' ).textContent = logEntry.identifier ?? '';
        curTrFragment.querySelector( 'td.log-message' ).textContent = logEntry.message;
        newTableBody.appendChild( curTrFragment.firstElementChild );
    } );
    this.htmlTableContainer.querySelector( 'tbody' ).replaceChildren( ...newTableBody.children );
};

LogTable.prototype.init = function() {
    this.createTable();
    this.refresh();
};

LogTable.prototype.refresh = function() {
    this.fetchLog();
}