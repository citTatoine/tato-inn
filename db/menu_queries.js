/**
 * Created by renzo on 2017-05-13.
 */

var pg = require('pg');
var dbURL;

var queries ={
    setCredentials: function(dburl){
        dbURL = dburl;
    },

    saveItemType: function (req,resp) {
        var client = new pg.Client(dbURL);
        client.connect();
        var query = client.query("SELECT item_type from items where item_name ='"+ req.query.selected_item_name+"'");
        query.on("end", function(result){
            client.end();
            console.log(result);
            resp.send(result);
        });
    },

    ////////////EDITING MENU////////////
    alterItem: function(req,resp){
        var client = new pg.Client(dbURL);
        client.connect();
        var type = "";

        if(req.query.added_item_type ==1){
            type = "meal";
        }
        else if(req.query.added_item_type ==2){
            type = "drink";
        }
        else if(req.query.added_item_type ==3){
            type = "desert";
        }


        if(req.query.edited_item_name != 'default'){
            var query = client.query("UPDATE items SET item_name = '"+req.query.edited_item_name+"' WHERE item_name = "+"'"+req.query.selected_item_name+"'");
            query.on("end", function () {
                client.end();
            });
        }
        if(req.query.edited_item_type != 'default'){
            var query = client.query("UPDATE items SET item_type = '"+type+"' WHERE item_name = "+"'"+req.query.selected_item_name+"'");
            query.on("end", function () {
                client.end();
            });
        }
        if(req.query.edited_item_price != 'default'){
            var query = client.query("UPDATE items SET item_price = '"+req.query.edited_item_price+"' WHERE item_name = "+"'"+req.query.selected_item_name+"'");
            query.on("end", function () {
                client.end();
            });
        }
        if(req.query.edited_item_combo_price != 'default'){
            var query = client.query("UPDATE items SET item_combo_price = '"+req.query.edited_item_combo_price+"' WHERE item_name = "+"'"+req.query.selected_item_name+"'");
            query.on("end", function () {
                client.end();
            });
        }
        if(req.query.edited_item_img != 'default'){
            var query = client.query("UPDATE items SET item_imgurl = '"+req.query.edited_item_img+"' WHERE item_name = "+"'"+req.query.selected_item_name+"'");
            query.on("end", function () {
                client.end();
            });
        }
    },
    addItem: function(req){
        var client = new pg.Client(dbURL);
        client.connect();
        var type = "";

        if(req.query.added_item_type ==1){
            type = "meal";
        }
        else if(req.query.added_item_type ==2){
            type = "drink";
        }
        else if(req.query.added_item_type ==3){
            type = "desert";
        }
        var query = client.query("INSERT INTO items (item_name, item_type, item_price, item_combo_price, item_imgurl) VALUES ('"+req.query.added_item_name+"','"+type+"','"+req.query.added_item_price+"','"+req.query.added_item_combo_price+"','"+req.query.added_item_img+"')");
        query.on("end", function () {
            client.end();
        });
    },

    deleteItem: function(req) {
        var client = new pg.Client(dbURL);
        client.connect();
        var query = client.query("DELETE FROM items WHERE item_name = '" + req.query.deleted_item_name + "'");
        query.on("end", function () {
            client.end();
        });
    },


    ////////////ORDER FUNCTIONALITY////////////
    getCategory: function(req, resp) {
        var client = new pg.Client(dbURL);
        client.connect();
        var query = client.query("select * from items WHERE item_type = '" + req.query.itemType+ "'");

        query.on("end", function (result) {
            client.end();
            if(result.rows.length > 0) {

                var foodType = result.rows;

                resp.send(foodType);
            }
        });




    },


    getAllItems: function(req, resp) {
        var client = new pg.Client(dbURL);
        client.connect();
        var query = client.query("select * from items");

        query.on("end", function (result) {
            client.end();
            if(result.rows.length > 0) {

                var foodType = result.rows;

                resp.send(foodType);
            }
        });




    },


    getCombo: function(req, resp) {
        var client = new pg.Client(dbURL);
        client.connect();
        var query = client.query("select * from items WHERE item_type = '" + req.query.itemType+ "'" + "and item_combo_price is NOT NULL");

        query.on("end", function (result) {
            client.end();
            if(result.rows.length > 0) {

                var foodType = result.rows;

                resp.send(foodType);
            }
        });




    },

    addOrder: function(req,resp){
        var client = new pg.Client(dbURL);
        client.connect();

        var query = client.query("INSERT INTO product_order (item_id, combo, order_id, quantity) VALUES ('"+req.query.item_ID+"','"+req.query.comboBoolean+"','"+req.query.order_ID+"','"+req.query.quantity+"')");
        query.on("end", function () {
            client.end();
            resp.send("success")
        });
    },


    addOrderItems: function(req,resp){
        var client = new pg.Client(dbURL);
        client.connect();

        var query = client.query("INSERT INTO orders (order_cost, order_status) VALUES ('"+req.query.total+"','"+req.query.orderStatus+"')RETURNING order_id, order_pickup_id");
        query.on("end", function (result) {
            client.end();
            resp.send(result.rows[0])
        });
    }

};

module.exports = queries;