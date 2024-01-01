'use strict';

/**
 * @typedef {object} Config
 * @property {LogViewConfig} logView
 */

/**
 * @typedef {object} LogViewConfig
 * @property {LogTableConfig[]} logTables
 */

/**
 * @typedef {object} LogTableConfig
 * @property {string} caption
 * @property {?LogPriorityDefinition} priority
 * @property {?LogFacilityDefinition} facility
 */

/**
 * @type Config
 */
const Config = {
    logView: {
        logTables: [{
            caption: 'Logs for priority WARNING or higher and facility KERNEL',
            priority: LogPriority.WARNING,
            facility: LogFacility.KERN
        },{
            caption: 'Logs for priority WARNING or higher and facility DAEMON',
            priority: LogPriority.WARNING,
            facility: LogFacility.DAEMON
        },{
            caption: 'Logs for priority CRITICAL',
            priority: LogPriority.CRITICAL,
            facility: null
        }]
    }
};
