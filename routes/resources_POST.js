"use strict";

const addResourcesSchema = require("../verification_schemas/addResourcesSchema");
const { addResources } = require("../resources");

module.exports = {
  method: "POST",
  path: "/resources",
  config: {
    auth: false,
    handler: addResources,
    validate: {
      payload: addResourcesSchema,
      failAction: (request, h, error) => {
        return h
          .response('{ code: 400, message: "Some of attributes not meet requirements"}')
          .code(400)
          .takeover()
      }
    }
  }
};