/**
 * Created by renzo on 2017-05-11.
 */
module.exports = {
    alterUser: function(req, resp) {
        var pg = require('pg');
        var bcrypt = require('bcrypt');
        var dbURL = process.env.DATABASE_URL || "postgres://postgres:Ilikepie5231!@localhost:5432/tatooine";
        var client = new pg.Client(dbURL);
        client.connect();
        var query = client.query("SELECT password FROM users WHERE username = '" + req.session.user.username+ "'");
        query.on("row", function (row){
            if(row != null){
                bcrypt.compare(req.query.old_password, row.password, function(err, isMatch){
                    if(isMatch){
                        console.log("match");
                        if (req.query.new_created_password == req.query.con_new_created_password) {
                            bcrypt.hash(req.query.new_created_password, 5, function (err, bpass) {
                                var query = client.query("UPDATE users SET password = '" + bpass +  "' WHERE username = " + "'" + req.session.user.username + "'");
                                query.on("end", function () {
                                    client.end();
                                    if (err) {
                                        console.log(err);
                                        resp.send({status: "fail"});
                                    }

                                    resp.send({status: "success"});
                                });
                            });
                        }
                        else {
                            alert("passwords do not match");
                        }

                    } else {
                        console.log(err);
                    }
                });
            }
            else{
                alert("wrong password");
            }
        });
    },
    addUser: function(req, resp){
        var pg = require('pg');
        var bcrypt = require('bcrypt');
        var dbURL = process.env.DATABASE_URL ||  "postgres://postgres:Ilikepie5231!@localhost:5432/tatooine";
        var client = new pg.Client(dbURL);
        client.connect();
        var type = "";

        if(req.query.user_option ==1){
            type = "admin";
        }
        else if(req.query.user_option ==2){
            type = "chef";
        }

        if(req.query.created_password == req.query.con_created_password) {
            bcrypt.hash(req.query.created_password, 5, function (err, bpass) {
                var query = client.query("INSERT INTO users (user_type, username, password) VALUES ('"+type+"','"+req.query.created_username+"','"+bpass+"') RETURNING user_id");
                query.on("end", function (result) {
                    client.end();
                    if (err) {
                        console.log(err);
                        resp.send({status: "fail"});
                    }

                    resp.send({status: "success", id: result.rows[0].user_id});
                });
            });
        }
        else{
            alert("passwords do not match");
        }
    }
};