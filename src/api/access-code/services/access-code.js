'use strict';

/**
 * access-code service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::access-code.access-code');
