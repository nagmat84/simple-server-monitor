'use strict';

/**
 * @typedef LogPriorityDefinition
 * @property {number} level
 * @property {string} shortText
 * @property {string} longText
 * @property {string} cssClass
 */

/**
 * @type {LogPriorityDefinition[]}
 * @property {LogPriorityDefinition} DEBUG
 * @property {LogPriorityDefinition} INFO
 * @property {LogPriorityDefinition} NOTICE
 * @property {LogPriorityDefinition} WARNING
 * @property {LogPriorityDefinition} ERROR
 * @property {LogPriorityDefinition} CRITICAL
 * @property {LogPriorityDefinition} ALERT
 * @property {LogPriorityDefinition} EMERGENCY
 */
const LogPriority = [];

/**
 * @type {LogPriorityDefinition}
 */
LogPriority.DEBUG = {
    level: 7,
    shortText: 'DBG',
    longText: 'DEBUG',
    cssClass: 'log-entry-debug'
};
Object.seal(LogPriority.DEBUG);

/**
 * @type {LogPriorityDefinition}
 */
LogPriority.INFO = {
    level: 6,
    shortText: 'INFO',
    longText: 'INFO',
    cssClass: 'log-entry-info'
};
Object.seal(LogPriority.INFO);

/**
 * @type {LogPriorityDefinition}
 */
LogPriority.NOTICE = {
    level: 5,
    shortText: 'NOTE',
    longText: 'NOTICE',
    cssClass: 'log-entry-notice'
};
Object.seal(LogPriority.NOTICE);

/**
 * @type {LogPriorityDefinition}
 */
LogPriority.WARNING = {
    level: 4,
    shortText: 'WARN',
    longText: 'WARNING',
    cssClass: 'log-entry-warning'
};
Object.seal(LogPriority.WARNING);

/**
 * @type {LogPriorityDefinition}
 */
LogPriority.ERROR = {
    level: 3,
    shortText: 'ERR',
    longText: 'ERROR',
    cssClass: 'log-entry-error'
};
Object.seal(LogPriority.ERROR);

/**
 * @type {LogPriorityDefinition}
 */
LogPriority.CRITICAL = {
    level: 2,
    shortText: 'CRIT',
    longText: 'CRITICAL',
    cssClass: 'log-entry-critical'
};
Object.seal(LogPriority.CRITICAL);

/**
 * @type {LogPriorityDefinition}
 */
LogPriority.ALERT = {
    level: 1,
    shortText: 'ALRT',
    longText: 'ALERT',
    cssClass: 'log-entry-alert'
};
Object.seal(LogPriority.ALERT);

/**
 * @type {LogPriorityDefinition}
 */
LogPriority.EMERGENCY = {
    level: 0,
    shortText: 'EMRG',
    longText: 'EMERGENCY',
    cssClass: 'log-entry-emergency'
};
Object.seal(LogPriority.EMERGENCY);

LogPriority.push(
    LogPriority.EMERGENCY,
    LogPriority.ALERT,
    LogPriority.CRITICAL,
    LogPriority.ERROR,
    LogPriority.WARNING,
    LogPriority.NOTICE,
    LogPriority.INFO,
    LogPriority.DEBUG
);
Object.seal(LogPriority);

/**
 * @typedef LogFacilityDefinition
 * @property {number} index
 * @property {string} text
 */

/**
 * @type {LogFacilityDefinition[]}
 * @property {LogFacilityDefinition} KERN
 * @property {LogFacilityDefinition} USER
 * @property {LogFacilityDefinition} MAIL
 * @property {LogFacilityDefinition} DAEMON
 * @property {LogFacilityDefinition} AUTH
 * @property {LogFacilityDefinition} SYSLOG
 * @property {LogFacilityDefinition} PRINT
 * @property {LogFacilityDefinition} NEWS
 * @property {LogFacilityDefinition} UUCP
 * @property {LogFacilityDefinition} CRON
 * @property {LogFacilityDefinition} AUTH_PRIV
 * @property {LogFacilityDefinition} FTP
 * @property {LogFacilityDefinition} NTP
 * @property {LogFacilityDefinition} AUDIT
 * @property {LogFacilityDefinition} ALERT
 * @property {LogFacilityDefinition} CLOCK
 * @property {LogFacilityDefinition} LOCAL_1
 * @property {LogFacilityDefinition} LOCAL_2
 * @property {LogFacilityDefinition} LOCAL_3
 * @property {LogFacilityDefinition} LOCAL_4
 * @property {LogFacilityDefinition} LOCAL_5
 * @property {LogFacilityDefinition} LOCAL_6
 * @property {LogFacilityDefinition} LOCAL_7
 */
const LogFacility = [];

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.KERN = {
    index: 0,
    text: "KERNEL"
};
Object.seal(LogFacility.KERN);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.USER = {
    index: 1,
    text: "USER"
};
Object.seal(LogFacility.USER);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.MAIL = {
    index: 2,
    text: "MAIL"
};
Object.seal(LogFacility.MAIL);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.DAEMON = {
    index: 3,
    text: "DAEMON"
};
Object.seal(LogFacility.DAEMON);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.AUTH = {
    index: 4,
    text: "AUTH"
};
Object.seal(LogFacility.AUTH);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.SYSLOG = {
    index: 5,
    text: "SYSLOG"
};
Object.seal(LogFacility.SYSLOG);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.PRINT = {
    index: 6,
    text: "PRINT"
};
Object.seal(LogFacility.PRINT);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.NEWS = {
    index: 7,
    text: "NEWS"
};
Object.seal(LogFacility.NEWS);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.UUCP = {
    index: 8,
    text: "UUCP"
};
Object.seal(LogFacility.UUCP);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.CRON = {
    index: 9,
    text: "CRON"
};
Object.seal(LogFacility.CRON);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.AUTH_PRIV = {
    index: 10,
    text: "AUTH_PRIV"
};
Object.seal(LogFacility.AUTH_PRIV);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.FTP = {
    index: 11,
    text: "FTP"
};
Object.seal(LogFacility.FTP);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.NTP = {
    index: 12,
    text: "NTP"
};
Object.seal(LogFacility.NTP);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.AUDIT = {
    index: 13,
    text: "AUDIT"
};
Object.seal(LogFacility.AUDIT);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.ALERT = {
    index: 14,
    text: "ALERT"
};
Object.seal(LogFacility.ALERT);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.CLOCK = {
    index: 15,
    text: "CLOCK"
};
Object.seal(LogFacility.CLOCK);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.LOCAL_0 = {
    index: 16,
    text: "LOCAL_0"
};
Object.seal(LogFacility.LOCAL_0);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.LOCAL_1 = {
    index: 17,
    text: "LOCAL_1"
};
Object.seal(LogFacility.LOCAL_1);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.LOCAL_2 = {
    index: 18,
    text: "LOCAL_2"
};
Object.seal(LogFacility.LOCAL_2);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.LOCAL_3 = {
    index: 19,
    text: "LOCAL_3"
};
Object.seal(LogFacility.LOCAL_3);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.LOCAL_4 = {
    index: 20,
    text: "LOCAL_4"
};
Object.seal(LogFacility.LOCAL_4);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.LOCAL_5 = {
    index: 21,
    text: "LOCAL_5"
};
Object.seal(LogFacility.LOCAL_5);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.LOCAL_6 = {
    index: 22,
    text: "LOCAL_6"
};
Object.seal(LogFacility.LOCAL_6);

/**
 * @type {LogFacilityDefinition}
 */
LogFacility.LOCAL_7 = {
    index: 23,
    text: "LOCAL_7"
};
Object.seal(LogFacility.LOCAL_7);

LogFacility.push(
    LogFacility.KERN,
    LogFacility.USER,
    LogFacility.MAIL,
    LogFacility.DAEMON,
    LogFacility.AUTH,
    LogFacility.SYSLOG,
    LogFacility.PRINT,
    LogFacility.NEWS,
    LogFacility.UUCP,
    LogFacility.CRON,
    LogFacility.AUTH_PRIV,
    LogFacility.FTP,
    LogFacility.NTP,
    LogFacility.AUDIT,
    LogFacility.ALERT,
    LogFacility.CLOCK,
    LogFacility.LOCAL_0,
    LogFacility.LOCAL_1,
    LogFacility.LOCAL_2,
    LogFacility.LOCAL_3,
    LogFacility.LOCAL_4,
    LogFacility.LOCAL_5,
    LogFacility.LOCAL_6,
    LogFacility.LOCAL_7
);
Object.seal(LogFacility);
