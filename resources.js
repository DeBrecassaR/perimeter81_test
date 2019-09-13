
const Boom = require("boom");
const maxmind = require('maxmind');
const ipRangeCheck = require("ip-range-check");
const Resource = require("./dao_models/resource");
const { postResourcesCode } = require("./resp_codes/response.codes");

function response(h, code) {
  return h.response(postResourcesCode[code]).code(code);
}

async function addResources(req, h) {

  const bodyRequest = JSON.parse(JSON.stringify(req.payload).toLowerCase());
  const resourceToFind = await Resource.findOne({ name: bodyRequest.name });

  if (!bodyRequest.iprange && !bodyRequest.location) response(h, 403);

  if ((bodyRequest.iprange && bodyRequest.iprange.length == 0)
    || (bodyRequest.location && bodyRequest.location.length == 0)) response(h, 403);

  if (!resourceToFind) {
    let resource = new Resource();
    if (bodyRequest.iprange) {
      resource.name = bodyRequest.name;
      resource.context = bodyRequest.context;
      resource.iprange = bodyRequest.iprange;
    }
    if (bodyRequest.location) {
      resource.name = bodyRequest.name;
      resource.context = bodyRequest.context;
      resource.location = bodyRequest.location;
    }
    await resource.save();
  } else {
    return response(h, 409);
  }
  return response(h, 201);
}


async function getResources(req, h) {
  const reqName = req.params.name;
  const reqIp = req.query.ip;

  if (reqName && reqIp) {
    let resource = await Resource.findOne({ name: reqName });
    if (!resource) return h
      .response("You not allow to access to this resource")
      .code(403)
      .takeover();
    if (resource.location) {
      const locByIp = await getLocationByIp(reqIp);
      if (locByIp === resource.location) {
        return h
          .response(resource.toReturnContext())
          .code(200)
          .takeover();
      }
    }

    if (resource.iprange && resource.iprange.length > 0) {
      if (ipRangeCheck(reqIp, resource.iprange)) {
        return h
          .response(resource.toReturnContext())
          .code(200)
          .takeover();
      }
    }
  }

  return h
    .response("You not allow to access to this resource")
    .code(403)
    .takeover();
}

async function getLocationByIp(ip) {
  const lookup = await maxmind.open('./geoDB/GeoLite2-City.mmdb');
  return lookup.get(ip).location.time_zone.toLowerCase();
}

module.exports = {
  addResources: addResources,
  getResources: getResources
};