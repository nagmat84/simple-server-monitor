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