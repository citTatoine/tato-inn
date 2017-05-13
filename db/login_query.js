/**
 * Created by renzo on 2017-05-11.
 */
module.exports = {
    login: function(req, resp) {
        var pg = require('pg');
        var bcrypt = require('bcrypt');
        var dbURL = process.env.DATABASE_URL || "postgres://postgres:Ilikepie5231!@localhost:5432/tatooine";
        var client = new pg.Client(dbURL);
        client.connect();


        var query = client.query("SELECT user_id, user_type, username, password FROM users WHERE username = '" + req.query.uName+ "'");
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
    }
};