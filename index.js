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

var app = express();

const server = require("http").createServer(app);

var io = require("socket.io")(server);
var dbURL = process.env.DATABASE_URL || "postgres://postgres:Ilikepie5231!@localhost:5432/tatooine";

//resolving paths
var pF = path.resolve(__dirname, "public");
var css = path.resolve(__dirname, "css");
var src = path.resolve(__dirname, "build");

app.use("/bundle", express.static(src));
app.use("/styles", express.static(css));
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(session({
    secret:"something", 
    resave: true,
    saveUninitialized: true
}));

app.get("/", function(req, resp){
    resp.sendFile(pF+"/login.html");
});

app.get("/order", function(req,resp){
    resp.sendFile(pF+"/order.html");
});


app.get("/kitchen", function(req,resp){
    resp.sendFile(pF+"/kitchen.html");
});


//========== Login Queries ==========//

app.post("/register", function(req, resp){
    
    
    bcrypt.hash(req.body.pass, 5, function(err, bpass){
        pg.connect(dbURL, function(err, client, done){
            if(err){
                console.log(err);
                resp.send({status:"fail"});
            }

            client.query("INSERT INTO users (user_type, username, password) VALUES ($1, $2, $3) RETURNING user_id", [req.body.user, req.body.un, bpass], function(err, result){

                done();
                if(err){
                    console.log(err);
                    resp.send({status:"fail"});
                }

                resp.send({status:"success", id:result.rows[0].id});
            });
        });
    })
   
});

app.post("/login", function(req, resp){
    
    pg.connect(dbURL, function(err, client, done){
        if(err){
            console.log(err);
            resp.send({status:"fail"});
        }
        
        client.query("SELECT user_id, user_type, username, password FROM users WHERE username = $1", [req.body.username], function(err, result){
            
            done();
            if(err){
                console.log(err);
                resp.send({status:"fail"});
            }
            
            if(result.rows.length > 0){
                bcrypt.compare(req.body.pass, result.rows[0].password, function(err, isMatch){
                    if(isMatch){
                        console.log("match");
                        req.session.user = {
                            username:result.rows[0].username,
                            id: result.rows[0].id
                        };
                        resp.send({status:"success", user:req.session.user});
                    } else {
                        console.log(err);
                    }
                });
            } else {
                resp.send({status:"fail"});
            }
        });
    })
});

server.listen(port, function(err){
    if(err){
        console.log(err);
        return false;
    }
    console.log("Application running on port "+port);
});