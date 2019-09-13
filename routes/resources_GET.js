"use strict";

const { getResources } = require("../resources");
const Joi = require('joi');
// const { confirmAccount } = require("../util/userFunctions");

module.exports = {
  method: "GET",
  path: "/resources/{name}",
  config: {
    auth: false,
    handler: getResources,
    validate: {
      params: {
        name: Joi.string().required()
      },
      failAction: (req, h, error) => {
        return h
          .response('{ code: 400, message: "Invalid params name"}')
          .code(400)
          .takeover()
      }
    }
  }
};