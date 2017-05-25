/**
 * Created by renzo on 2017-05-11.
 */

//modular dependency

var pg = require('pg');
var bcrypt = require('bcrypt');


function AccQuery(dbURL){
    /*
     * AccQuery object constructor. This class requires the database's url in order to operate its functions.
     */

    this.dbURL = dbURL;
}

AccQuery.prototype.alterPass = function(req, resp) {
    /*
     * This function allows a user with admin status to alter the password of another registered user, provided they have the previous one.
     * 
     */
    pg.connect(this.dbURL, function(err, client, done){

        if(err){

            resp.send({
                err:true,
                errMsg:"Could not connect to Account servers, please try again later",
                result:null
            });
            console.log(err);
            return false;

        } else {

            client.query("SELECT emp_pword FROM employees WHERE emp_uname = $1;", [req.session.user.username], function(err, result){

                if(err){

                    resp.send({
                        err:true,
                        errMsg:"Invalid username/password",
                        result:null
                    });
                    console.log(err);
                    return false;

                } else if (result.rows = null){

                    resp.send({
                        err:true,
                        errMsg:"Invalid username/password",
                        result:null
                    });
                    console.log("User does not exist");
                    return false;

                } else {
                    bcrypt.compare(req.query.old_password, row.password, function(err, isMatch){

                        if(err){
                            console.log(err);
                            resp.send({
                                err:true,
                                errMsg:"password do not match",
                                result:null
                            });
                            return false;
                        } else if(isMatch){

                            console.log("match");

                            if (req.query.new_created_password == req.query.con_new_created_password) {

                                bcrypt.hash(req.query.new_created_password, 5, function (err, bpass) {

                                    client.query("UPDATE employees SET emp_pword = $1 WHERE emp_uname = $2", [bpass, req.session.user.username], function(err, result){
                                        done();

                                        if(err){

                                            resp.send({
                                                err:true,
                                                errMsg:"Invalid username/password",
                                                result:null
                                            });
                                            console.log(err);
                                            return false;

                                        } else {
                                            resp.send({
                                                err:false,
                                                errMsg:null,
                                                result:"success"
                                            });
                                        }

                                    });
                                });

                            } else {
                                alert("passwords do not match");
                            }

                        }
                    });
                }
            });
        }
    });
};

AccQuery.prototype.addUser = function(req,resp){
    /*
     * This function allows a user with admin rights, to create another user inside the database
     */
    pg.connect(this.dbURL, function(err,client,done){

        if(err){

            resp.send({
                err:true,
                errMsg:"Could not connect to Account servers, please try again later",
                result:null
            });
            console.log(err);
            return false;

        } else {
            var type = "";

            if(req.query.user_option ==1){
                type = "admin";
            }
            else if(req.query.user_option ==2){
                type = "chef";
            }

            if(req.query.created_password == req.query.con_created_password) {
                bcrypt.hash(req.query.created_password, 5, function (err, bpass) {
                    client.query("INSERT INTO employees (emp_type, emp_uname, emp_pword) VALUES ($1,$2,$3) RETURNING emp_id", [type,req.query.created_username,bpass],function(err,result){
                        done();

                        if (err) {
                            console.log(err);
                            resp.send({
                                err:true,
                                errMsg:"Invalid Parameters",
                                result:null
                            });
                            return false;
                        }

                        resp.send({
                            err: false,
                            errMsg:null,
                            result: {id:result.rows[0].user_id}
                        });

                    });
                });
            }
            else{
                alert("passwords do not match");
            }
        }
    });
};
AccQuery.prototype.deleteUser = function(req,resp){
    /*
     * This function allows a user with admin rights, to create another user inside the database
     */
    pg.connect(this.dbURL, function(err,client){

        if(err){

            resp.send({
                err:true,
                errMsg:"Could not connect to Account servers, please try again later",
                result:null
            });
            console.log(err);
            return false;

        } else {
            var query = client.query("SELECT emp_pword FROM employees WHERE emp_uname = '" + req.session.user.username + "'");
            query.on("row", function (row) {
                if (row != null) {
                    bcrypt.compare(req.query.own_password, row.password, function (err, isMatch) {
                        if (isMatch) {
                            var query = client.query("DELETE FROM employees where emp_uname = '" + req.query.deleted_user + "'");
                            query.on("end", function () {
                                client.end();
                                console.log("success");
                            });
                        }
                        else {
                            console.log(err);
                        }
                    });
                }
                else {
                    alert("password does not match account");
                }
            });
        }
    });
};

module.exports = AccQuery;