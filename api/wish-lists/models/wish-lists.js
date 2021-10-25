'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const uuid = require('uuid');

module.exports = {
  lifecycles: {
    beforeCreate: async (model) => model.uid = uuid.v4()
  }
};
