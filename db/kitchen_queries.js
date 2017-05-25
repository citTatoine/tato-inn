/**
 * Created by renzo on 2017-05-14.
 *
 * Credits Kenneth Situ
 */
module.exports = {

    // -------------------------------------------------------//
    // Grab all orders that are pending
    // ------------------------------------------------------//

    getOrders: function(req, resp) {
        var pg = require('pg');
        var dbURL = process.env.DATABASE_URL || "postgres://enterprisedb:kenster123@localhost:5444/tatooine";
        var client = new pg.Client(dbURL);
        client.connect();


        var query = client.query("SELECT * FROM orders WHERE order_status = 'onhold' ORDER BY order_id ASC LIMIT 6");
        query.on("end", function (result) {
            client.end();
                if(result.rows.length > 0){
                    resp.send(result.rows);
                } else {
                    console.log("Error");
                    resp.send({status:"fail"});
                }
        });
    },


    // -------------------------------------------------------//
    // Grab all items associated with orders
    // ------------------------------------------------------//
    
    getItems: function(req, resp) {
        var pg = require('pg');
        var dbURL = process.env.DATABASE_URL || "postgres://enterprisedb:kenster123@localhost:5444/tatooine";
        var client = new pg.Client(dbURL);
        client.connect();


        var query = client.query("SELECT * FROM product_order INNER JOIN items ON (product_order.item_id = items.item_id) WHERE order_id = '" + req.query.orderId+ "'");
       
        query.on("end", function (result) {
            client.end();
                if(result.rows.length > 0){
                    resp.send(result.rows);
                } else {
                    console.log("Error");
                    resp.send({status:"fail"});
                }
        });
    },


    // -------------------------------------------------------//
    // Add spoiled food / food waste
    // ------------------------------------------------------//

    addSpoiled: function(req, resp) {
        var pg = require('pg');
        var dbURL = process.env.DATABASE_URL || "postgres://enterprisedb:kenster123@localhost:5444/tatooine";
        var client = new pg.Client(dbURL);
        client.connect();


        var query = client.query("INSERT INTO spoil (item_name, quantity, price) VALUES ('"+req.query.item_name+"','"+req.query.quantity+"','"+req.query.price+"')");

        query.on("end", function () {
            client.end();

        });
    },

    // -------------------------------------------------------//
    // Get all item prices
    // ------------------------------------------------------//

    getPrice: function(req, resp) {
        var pg = require('pg');
        var dbURL = process.env.DATABASE_URL || "postgres://enterprisedb:kenster123@localhost:5444/tatooine";
        var client = new pg.Client(dbURL);
        client.connect();


        var query = client.query("SELECT item_name, item_price, item_combo_price FROM items");

        query.on("end", function (result) {
            client.end();
            if(result.rows.length > 0){
                resp.send(result.rows);
            } else {
                console.log("Error");
                resp.send({status:"fail"});
            }
        });
    },

    // -------------------------------------------------------//
    // Update finished order status from pending to done!
    // ------------------------------------------------------//

    updateStatus: function(req, resp) {
        var pg = require('pg');
        var dbURL = process.env.DATABASE_URL || "postgres://enterprisedb:kenster123@localhost:5444/tatooine";
        var client = new pg.Client(dbURL);
        client.connect();


        var query = client.query("UPDATE orders SET order_status = 'done' where order_id = '" + req.query.order+ "'");

        query.on("end", function (err) {
            client.end();
            if(err){
                console.log(err)
            }

        });
    },


};