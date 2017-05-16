/*
 index.js

 This script stores all of the server side logic for our application, from setup to front end integrations.

 Author: Lucas Silva on May 4th. 2017
 */


//========== Init Dependencies ==========//

const express = require("express");
const port = process.env.PORT || 10000;
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const pg = require("pg");
const bcrypt = require("bcrypt");
const logfmt = require("logfmt");
const request = require("request");
const http = require("http");


var app = express();

const server = require("http").createServer(app);

var io = require("socket.io")(server);

//resolving paths
var pF = path.resolve(__dirname, "public");
var css = path.resolve(__dirname, "css");
var src = path.resolve(__dirname, "build");
var jF = path.resolve(__dirname,"js");
var db = path.resolve(__dirname, "db");
var img = path.resolve(__dirname, "img");
var modules = path.resolve(__dirname, "node_modules");
var adminP = path.resolve(__dirname,"admin-partials");
var orderP = path.resolve(__dirname,"order-partials");

const loginOperation = require (db+"/login_query.js");
const adminAccOperation = require (db+"/account_queries.js");
const adminMenuOperation = require (db+"/menu_queries.js");
const adminTransOperation = require (db+"/transaction_queries");

app.use("/styles", express.static(css));
app.use("/bundle", express.static(src));
app.use("/plugin", express.static(jF));
app.use("/img", express.static(img));
app.use("/modules", express.static(modules));
app.use("/admin-partials", express.static(adminP));
app.use("/order-partials", express.static(orderP));

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(session({
    secret:"something",
    resave: true,
    saveUninitialized: true
}));

app.all("/", function(req, resp){
    resp.sendFile(pF+"/login.html");
});

app.all("/start", function(req,resp){
    resp.sendFile(pF+"/startorder.html");
});

app.all("/order", function(req,resp){
    resp.sendFile(pF+"/orderpage.html");
});


app.all("/kitchen", function(req,resp){
    resp.sendFile(pF+"/kitchen.html");
});

app.all("/admin", function(req,resp){
    resp.sendFile(pF+"/administration.html");
});




//========== Login Queries ==========//
app.get("/db/login", function(req,resp){
    loginOperation.login(req,resp);
});

//========== Account Queries ==========//
app.get("/db/register", function(req,resp){
    adminAccOperation.addUser(req,resp);
});
app.get("/db/modify", function(req,resp){
    adminAccOperation.alterUser(req,resp);
});

//========== Menu Queries ==========//
app.get("/db/alterItem", function(req,resp){
    adminMenuOperation.alterItem(req,resp);
});
app.get("/db/addItem", function(req,resp){
    adminMenuOperation.addItem(req,resp);
});


server.listen(port, function(err){
    if(err){
        console.log(err);
        return false;
    }
    console.log("Application running on port "+port);
});