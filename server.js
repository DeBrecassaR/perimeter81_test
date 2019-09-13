"use strict";

const Hapi = require("hapi");
const mongoose = require("mongoose");
const glob = require("glob");
const path = require("path");
const DB = require("./config").DB;
const PORT = process.env.PORT || 3000;

const init = async () => {
    const server = new Hapi.Server({
        host: "localhost",
        port: PORT,
        router: {
            stripTrailingSlash: true
        }
    });

    glob.sync("/routes/*.js", {
        root: __dirname
    }).forEach(file => {
        server.route(require(path.join(file)));
    });

    // Connect to DB
    try {
        await mongoose.connect(DB, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("Database is connected");
    } catch (err) {
        console.log("Can't connect to database", err);
    }


    await server.start();

    return server;
};

init()
    .then(server => {
        console.log("Server running at:", server.info.uri);
    })
    .catch(error => {
        console.log(error);
    });
