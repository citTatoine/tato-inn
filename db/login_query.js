/**
 * Created by renzo on 2017-05-11.
 */

var pg = require('pg');
var bcrypt = require('bcrypt');

function LoginQuery(dbURL){
    this.dbURL = dbURL;
}

LoginQuery.prototype.login = function(req, resp) {
    var client = new pg.Client(this.dbURL);
    client.connect();


    var query = client.query("SELECT emp_id, emp_type, emp_uname, emp_pword FROM employees WHERE emp_uname = '" + req.query.uName+ "'");
    query.on("end", function (result) {
        client.end();
        if(result.rows.length > 0){
            bcrypt.compare(req.query.pWord, result.rows[0].password, function(err, isMatch){
                if(isMatch){
                    console.log("match");
                    req.session.user = {
                        username:result.rows[0].username,
                        id: result.rows[0].user_id,
                        type: result.rows[0].user_type
                    };
                    resp.send(req.session.user);
                } else {
                    console.log(err);
                }
            });
        }
    });
};

<<<<<<< HEAD
module.exports = LoginQuery;
=======
module.exports = LoginQuery;

>>>>>>> 6ea4e6eac6890aa7ec30073c89ee4924b4b95841
