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
        var query = client.query("SELECT * FROM orders where order_start_time = current_date");
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
        var query = client.query("SELECT items.item_id, order_id, item_name, combo, item_price, item_combo_price FROM items INNER JOIN item_order on items.item_id = item_order.item_id where order_id ="+req.query.order_id);
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
        var query = client.query("SELECT * FROM items where item_id ="+req.query.item_id);
        query.on("row", function (row,result) {
            result.addRow(row);
        });
        query.on("end",function(end){
            resp.send(end);
        });
    }
};
module.exports = queries;