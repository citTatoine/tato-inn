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
const multer = require('multer');

var item_type = '';

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/'+ item_type);
    },
    filename: function(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
            var err = new Error();
            err.code = 'filetype';
            return cb(err);
        } else {
            cb(null, file.originalname);
        }
    }
});

var upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }
}).single('myfile');

var dbURL = process.env.DATABASE_URL || "postgres://localhost:5432/tatoinn"; // edit this line to change DB url

var app = express();

const server = require("http").createServer(app);

var shopStatus = false;

// var io = require("socket.io")(server);

//resolving paths
var pF = path.resolve(__dirname, "public");
var css = path.resolve(__dirname, "css");
var src = path.resolve(__dirname, "build");
var db = path.resolve(__dirname, "db");
var img = path.resolve(__dirname, "img");
var adminP = path.resolve(__dirname, "admin-partials");

const loginQueries = require (db+"/login_query.js");
const accQueries = require (db+"/account_queries.js");
const menuQueries = require (db+"/menu_queries.js");
const adminTransOperation = require (db+"/transaction_queries");

var accounts = new accQueries(dbURL);
var loginQ = new loginQueries(dbURL);
<<<<<<< HEAD
var menu = new menuQueries(dbURL);
=======
var menu = new adminMenuOperation(dbURL);
>>>>>>> 6ea4e6eac6890aa7ec30073c89ee4924b4b95841

app.use("/bundle", express.static(src));
app.use("/styles", express.static(css));
app.use("/admin-partials", express.static("admin-partials"));
app.use("/order-partials", express.static("order-partials"));
app.use("/plugin", express.static("js"));
app.use("/img", express.static(img));

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(session({
    secret:"something",
    resave: true,
    saveUninitialized: true
}));

<<<<<<< HEAD
app.all("/staff", function(req, resp){
=======

app.all("/staff/*", function(req, resp){
     if (!req.session.user) {

         resp.sendFile(pF+"/login.html");
        
     } else if(req.session.user.type == "admin"){

         resp.sendFile(pF+"/administration.html");

     } else if(req.session.user.type == "chef"){

         resp.sendFile(pF+"/kitchen.html");

     }

>>>>>>> 6ea4e6eac6890aa7ec30073c89ee4924b4b95841
    resp.sendFile(pF+"/administration.html");
});

app.all("/", function(req,resp){
    if(shopStatus == true) {
        resp.sendFile(pF + "/startorder.html");
    }
    else if(shopStatus == false){
        resp.sendFile(pF + "/errorpage.html")
    }
});

app.all("/order", function(req,resp){
    if(shopStatus == true) {
        resp.sendFile(pF + "/orderpage.html");
    }
    else if(shopStatus == false){
        resp.sendFile(pF + "/errorpage.html")
    }
});


// app.all("/kitchen", function(req,resp){
//     resp.sendFile(pF+"/kitchen.html");
// });

// app.all("/admin", function(req,resp){
//     resp.sendFile(pF+"/administration.html");
// });


app.all("/pickup", function(req,resp){
    resp.sendFile(pF+"/pickup.html");
});

//====== Store/Send Pickup Number ========//
app.get("/save/CusPickupNo", function (req,resp) {

    req.session.pickup = req.query.pickup;

    console.log(req.session.pickup);

    resp.send("Success")

});

app.get("/get/CusPickupNo", function (req,resp) {

    console.log(req.session.pickup);

    resp.send(req.session.pickup)

});

//========== Shop ==========//
app.get("/openShop", function () {
    shopStatus = true;
});
app.get("/closeShop", function () {
    shopStatus = false;
});

//========== Login Queries ==========//
app.get("/db/login", function(req,resp){
    loginQ.login(req,resp);
});
//========== Logout Queries ==========//
app.get("/logout", function(req,resp){
   req.session.destroy();
   resp.send("data");
});
//========== Account Queries ==========//
app.get("/db/register", function(req,resp){
    accounts.addUser(req,resp);
});
app.get("/db/modify", function(req,resp){
    accounts.alterPass(req,resp);
});
app.get("/db/deleteUser", function(req,resp){
    accounts.deleteUser(req,resp);
});
//========== Menu Editing Queries ==========//
app.get("/db/saveItemType", function(req,resp){
    menu.saveItemType(req,resp);
});

app.get("/db/alterItem", function(req,resp){
<<<<<<< HEAD
    menu.alterItem(req,resp);
});
app.get("/db/addItem", function(req,resp){
    menu.addItem(req,resp);
=======
    if(req.query.edited_item_price != 'default'){
        switch(req.query.edited_item_type){
            case 1:
                item_type = "appetizer";
                break;
            case 2:
                item_type = "breakfast";
                break;
            case 3:
                item_type = "breakfast-combo";
                break;
            case 4:
                item_type = "burger";
                break;
            case 5:
                item_type = "burger-combo";
                break;
            case 6:
                item_type = "desserts";
                break;
            case 7:
                item_type = "drinks";
                break;
            default:
                item_type = "misc";
                break;
        }
    }
    else{
        item_type = req.query.item_type;
    }
    menu.alterItem(req,resp);
    resp.send('success');
});
app.get("/db/addItem", function(req,resp){
    switch(req.query.added_item_type){
        case 1:
            item_type = "appetizer";
            break;
        case 2:
            item_type = "breakfast";
            break;
        case 3:
            item_type = "breakfast-combo";
            break;
        case 4:
            item_type = "burger";
            break;
        case 5:
            item_type = "burger-combo";
            break;
        case 6:
            item_type = "desserts";
            break;
        case 7:
            item_type = "drinks";
            break;
        default:
            item_type = "misc";
            break;
    }
    menu.addItem(req,resp);
    resp.send('success');
});
app.get("/db/deleteItem", function(req,resp){
    menu.deleteItem(req,resp);
>>>>>>> 6ea4e6eac6890aa7ec30073c89ee4924b4b95841
});

//========== Menu Functionality Queries ==========//
app.get('/db/getCategory', function(req,resp){
    menu.getCategory(req,resp);
});

app.get('/db/getCombo', function(req,resp){
    menu.getCombo(req,resp);
<<<<<<< HEAD
});

app.get('/db/getItemPrice', function(req,resp){
    menu.getItemPrice(req,resp);
=======
>>>>>>> 6ea4e6eac6890aa7ec30073c89ee4924b4b95841
});

app.get('/db/getAll', function(req,resp){
    menu.getAllItems(req,resp);
});

app.get('/db/addOrder', function(req,resp){
    menu.addOrder(req,resp);
});

app.get('/db/addOrderItems', function(req,resp){
    menu.addOrderItems(req,resp);
<<<<<<< HEAD
=======
});

//========== Transaction Queries ==========//
app.get('/db/transaction', function(req,resp){
    adminTransOperation.setCredentials(dbURL);
    adminTransOperation.getTransactions(req,resp);
>>>>>>> 6ea4e6eac6890aa7ec30073c89ee4924b4b95841
});

app.get('/db/orderDetails', function(req,resp){
    adminTransOperation.setCredentials(dbURL);
    adminTransOperation.getOrderDetails(req,resp);
});

app.get('/db/menuItems', function(req,resp){
    adminTransOperation.setCredentials(dbURL);
    adminTransOperation.getMenuItems(req,resp);
});

app.get('/db/menuItemDetails', function(req,resp){
    adminTransOperation.setCredentials(dbURL);
    adminTransOperation.getMenuItemDetails(req,resp);
});

//========== Img Upload Error Catching ==========//
app.post('/upload', function(req, res) {
    console.log(item_type);
    upload(req, res, function(err) {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.json({ success: false, message: 'File size is too large. Max limit is 10MB' });
            } else if (err.code === 'filetype') {
                res.json({ success: false, message: 'Filetype is invalid. Must be .png' });
            } else {
                res.json({ success: false, message: 'Unable to upload file' });
            }
        } else {
            if (!req.file) {
                res.json({ success: false, message: 'No file was selected' });
            } else {
                res.json({ success: true, message: 'File uploaded!' });
            }
        }
    });
});


server.listen(port, function(err){
    if(err){
        console.log(err);
        return false;
    }
    console.log("Application running on port "+port);
});