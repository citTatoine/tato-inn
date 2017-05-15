/**
 * Created by renzo on 2017-05-11.
 */
module.exports = {
    // getUsers: function(req, resp) {
    //     var pg = require('pg');
    //     var dbURL = process.env.DATABASE_URL || "postgres://postgres:Ilikepie5231!@localhost:5432/tatooine";
    //     var client = new pg.Client(dbURL);
    //     client.connect();
    //     var query = client.query("select * from users");
    //     query.on("row", function (row, result) {
    //         result.addRow(row);
    //     });
    //     query.on("end", function (result) {
    //         client.end();
    //         res.writeHead(200, {'Content-Type': 'text/plain'});
    //         res.write(JSON.stringify(result.rows, null, "    ") + "\n");
    //         res.end();
    //     });
    // },
    // delUser : function(req, resp){
    //     var pg = require('pg');
    //     var dbURL = process.env.DATABASE_URL ||  "postgres://postgres:Ilikepie5231!@localhost:5432/tatooine";
    //     var client = new pg.Client(dbURL);
    //     client.connect();
    //     var query = client.query( "Delete from employee Where id ="+req.query.id);
    //     query.on("end", function (result) {
    //         client.end();
    //         res.write('Success');
    //         res.end();
    //     });
    // },
    // alterUser : function(req, resp) {
    //     var pg = require('pg');
    //     var bcrypt = require('bcrypt');
    //     var dbURL = process.env.DATABASE_URL || "postgres://postgres:Ilikepie5231!@localhost:5432/tatooine";
    //     var client = new pg.Client(dbURL);
    //     client.connect();
    //     bcrypt.hash(req.query.pass, 5, function (err, bpass) {
    //         if (err) {
    //             console.log(err);
    //             resp.send({status: "fail"});
    //         }
    //
    //         client.query("UPDATE users SET password = "+"'"+"+bpass"+"'"+"WHERE username = "+"'"+req.query.username+"'", function (err, result) {
    //
    //             done();
    //             if (err) {
    //                 console.log(err);
    //                 resp.send({status: "fail"});
    //             }
    //
    //             resp.send({status: "success"});
    //         });
    //     });
    //     query.on("end", function (result) {
    //         client.end();
    //         res.write('Success');
    //         res.end();
    //     });
    // },
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