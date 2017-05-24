/**
 * Created by renzo on 2017-05-13.
 */
<<<<<<< HEAD
module.exports ={

    ////////////EDITING MENU////////////
    alterItem: function(req,resp){
        var pg = require('pg');
        var dbURL = process.env.DATABASE_URL || "postgres://postgres:Ilikepie5231!@localhost:5432/tatooine";
        var client = new pg.Client(dbURL);
=======
var pg = require('pg');

function MenuQuery(dbURL){
    /*
     * Construction for menuQueries object.
     */
     this.dbURL = dbURL;
}

MenuQuery.prototype.alterItem = function(req, resp) {
    
    var client = new pg.Client(this.dbURL);


>>>>>>> 922b7cbb5f39eb181197996dbccb9de93b91085a
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
        console.log(req.query.edited_item_name);
        console.log(req.query.edited_item_type);
        console.log(req.query.edited_item_price);
        console.log(req.query.edited_item_combo_price);

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
}

MenuQuery.prototype.addItem = function(req, resp) {
    var pg = require('pg');
        var client = new pg.Client(this.dbURL);
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
};

<<<<<<< HEAD

    ////////////ORDER FUNCTIONALITY////////////
    getCategory: function(req, resp) {
        var pg = require('pg');
        var dbURL = process.env.DATABASE_URL || "postgres://enterprisedb:kenster123@localhost:5444/tatooine";
        var client = new pg.Client(dbURL);
=======
MenuQuery.prototype.getCategory = function(req, resp) {
        getCategory: function(req, resp) {
        var client = new pg.Client(this.dbURL);
>>>>>>> 922b7cbb5f39eb181197996dbccb9de93b91085a
        client.connect();
        var query = client.query("select * from items WHERE item_type = '" + req.query.itemType+ "'");

        query.on("end", function (result) {
            client.end();
            if(result.rows.length > 0) {

                var foodType = result.rows;

                resp.send(foodType);
            }
        });
};

MenuQuery.prototype.getCombo = function(req, resp) {
    var client = new pg.Client(this.dbURL);
    client.connect();
    var query = client.query("select * from items WHERE item_type = '" + req.query.itemType+ "'" + "and item_comboprice is NOT NULL");

    query.on("end", function (result) {
        client.end();
        if(result.rows.length > 0) {

            var foodType = result.rows;
            resp.send(foodType);
        }
    });
};

MenuQuery.prototype.getItemPrice = function(req, resp) {
    var client = new pg.Client(this.dbURL);
    client.connect();
    var query = client.query("select * from items WHERE item_name = '" + req.query.itemName+ "'");

    query.on("end", function (result) {
        client.end();
        if(result.rows.length > 0) {

            var itemPrice = result.rows[0];

            resp.send(itemPrice);
        }
    });
};

MenuQuery.prototype.addOrder = function(req, resp) {
    var client = new pg.Client(this.dbURL);
        client.connect();

        var query = client.query("INSERT INTO product_order (item_id, combo, order_id, quantity) VALUES ('"+req.query.item_ID+"','"+req.query.comboBoolean+"','"+req.query.order_ID+"','"+req.query.quantity+"')");
        query.on("end", function () {
            client.end();
            resp.send("success")
        });
}

MenuQuery.prototype.addOrderItems = function(req, resp){
    var client = new pg.Client(this.dbURL);
        client.connect();

        var query = client.query("INSERT INTO orders (order_cost, order_status) VALUES ('"+req.query.total+"','"+req.query.orderStatus+"')RETURNING order_id, order_pickup_id");
        query.on("end", function (result) {
            client.end();
            resp.send(result.rows[0])
        });
}

module.exports = MenuQuery;
