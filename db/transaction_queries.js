/**
 * Created by renzo on 2017-05-14.
 */
var pg = require('pg');
var dbURL;

var queries = {
    setCredentials: function(dburl){
        dbURL = dburl;
    },
    getTransactions: function(req,resp){
        var client = new pg.Client(dbURL);

        client.connect();
        var query = client.query("SELECT * FROM orders where order_date > timestamp 'today'");
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            resp.send(result);
        });
    },
    getOrderDetails: function(req,resp){
        var client = new pg.Client(dbURL);
        client.connect();
        var query = client.query("SELECT items.item_id, order_id, item_name, combo, item_price, item_comboprice FROM items INNER JOIN items_orders on items.item_id = items_orders.item_id where order_id ="+req.query.order_id);
        query.on("row", function (row,result) {
            if (row != null){
                result.addRow(row);
            }
        });
        query.on("end",function(end){
            for(var i=0; i<end.rows.length;i++){
                if(end.rows[i].combo==true) {
                    end.rows[i].combo='True';
                    end.rows[i].item_price = end.rows[i].item_combo_price;
                }
                else if(end.rows[i].combo==false) {
                    end.rows[i].combo='False';
                }
            }
            resp.send(end);
        });
    },
    getMenuItems: function(req,resp){
        var client = new pg.Client(dbURL);

        client.connect();

        var query = client.query("SELECT * FROM items");
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            resp.send(result);
        });
    },
    getMenuItemDetails: function(req,resp){
        var client = new pg.Client(dbURL);
        client.connect();
        var query = client.query("select * from (SELECT item_name,(items.item_price * items_orders.qty) as total_price FROM items INNER JOIN items_orders on items.item_id = items_orders.item_id where items.item_id ="+req.query.item_id+ " and items_orders.combo = false) as y, (SELECT (items.item_comboprice * items_orders.qty) as total_combo_price FROM items INNER JOIN items_orders on items.item_id = items_orders.item_id where items.item_id ="+req.query.item_id+ " and items_orders.combo = true) as x");
        query.on("row", function (row,result) {
            result.addRow(row);
        });
        query.on("end",function(end){
            console.log(end);
            resp.send(end);
        });
    }
};
module.exports = queries;