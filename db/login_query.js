/**
 * Created by renzo on 2017-05-11.
 */

var pg = require('pg');
var bcrypt = require('bcrypt');

function LoginQuery(dbURL){
    this.dbURL = dbURL;
}

LoginQuery.prototype.login = function(req, resp) {
    pg.connect(this.dbURL, function(err, client, done){
        if(err){
            resp.send({
                err:true,
                errMsg:"Failed to connect to Login server",
                result:null
            });
            console.log(err);
            return false;
        }
        client.query("SELECT user_id, user_type, username, password FROM users WHERE username = $1", [req.query.uName], function(err, result){

            done();

            if(err){
                resp.send({
                    err:true,
                    errMsg:"Invalid Username/Password",
                    result:null
                });
                console.log(err);
                return false;
            } else if(result.rows.length > 0){

                bcrypt.compare(req.query.pWord, result.rows[0].password, function(err, isMatch){

                    if(isMatch){
                        console.log("match");
                        req.session.user = {
                            username:result.rows[0].username,
                            id: result.rows[0].user_id,
                            type: result.rows[0].user_type
                        };
                        resp.send({
                            err:false,
                            errMsg:null,
                            result:req.session.user
                        });
                    } else {
                        console.log(err);
                    }
                });
            }

        });

    });
};

module.exports = LoginQuery;


// module.exports = {
//     login: function(req, resp) {
//         var pg = require('pg');
//         var bcrypt = require('bcrypt');
//         var dbURL = process.env.DATABASE_URL || "postgres://localhost:5432/tatoinndb";
//         var client = new pg.Client(dbURL);
//         client.connect();


//         var query = client.query("SELECT user_id, user_type, username, password FROM users WHERE username = '" + req.query.uName+ "'");
//         query.on("end", function (result) {
//             client.end();
//             if(result.rows.length > 0){
//                 bcrypt.compare(req.query.pWord, result.rows[0].password, function(err, isMatch){
//                     if(isMatch){
//                         console.log("match");
//                         req.session.user = {
//                             username:result.rows[0].username,
//                             id: result.rows[0].user_id,
//                             type: result.rows[0].user_type
//                         };
//                         resp.send(req.session.user);
//                     } else {
//                         console.log(err);
//                     }
//                 });
//             }
//         });
//     }
// };