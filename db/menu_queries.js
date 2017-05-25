/**
 * Created by renzo on 2017-05-13.
 */
var pg = require('pg');

function MenuQuery(dbURL){
    /*
     * Construction for menuQueries object.
     */
    this.dbURL = dbURL;
}

MenuQuery.prototype.saveItemType = function(req, resp) {
    var client = new pg.Client(this.dbURL);
    client.connect();
    var query = client.query("SELECT item_type from items where item_name ='"+ req.query.selected_item_name+"'");
    query.on("end", function(result){
        client.end();
        resp.send(result);
    });
};

MenuQuery.prototype.alterItem = function(req, resp) {

    var client = new pg.Client(this.dbURL);


    client.connect();
    var type = "";

    switch(req.query.edited_item_type){
        case '1':
            type = "appetizer";
            break;
        case '2':
            type = "breakfast";
            break;
        case '3':
            type = "burger";
            break;
        case '4':
            type = "desserts";
            break;
        case '5':
            type = "drinks";
            break;
        default:
            type = "misc";
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
        var query = client.query("UPDATE items SET item_comboprice = '"+req.query.edited_item_combo_price+"' WHERE item_name = "+"'"+req.query.selected_item_name+"'");
        query.on("end", function () {
            client.end();
        });
    }
    if(req.query.edited_item_img != 'undefined'){
        var query = client.query("UPDATE items SET item_imgurl = '"+req.query.edited_item_img+"' WHERE item_name = "+"'"+req.query.selected_item_name+"'");
        query.on("end", function () {
            client.end();
        });
    }
}

MenuQuery.prototype.addItem = function(req, resp) {
    var client = new pg.Client(this.dbURL);
    client.connect();
    var type = "";

    switch(req.query.added_item_type){
        case '1':
            type = "appetizer";
            break;
        case '2':
            type = "breakfast";
            break;
        case '3':
            type = "burger";
            break;
        case '4':
            type = "desserts";
            break;
        case '5':
            type = "drinks";
            break;
        default:
            type = "misc";
    }
    var query = client.query("INSERT INTO items (item_name, item_type, item_price, item_comboprice, item_imgurl) VALUES ('"+req.query.added_item_name+"','"+type+"','"+req.query.added_item_price+"','"+req.query.added_item_combo_price+"','"+req.query.added_item_img+"')");
    query.on("end", function () {
        client.end();
    });
};

MenuQuery.prototype.deleteItem = function(req, resp) {
    var client = new pg.Client(this.dbURL);
    client.connect();
    var query = client.query("DELETE FROM items WHERE item_name = '" + req.query.deleted_item_name + "'");
    query.on("end", function () {
        client.end();
    });
};

MenuQuery.prototype.getCategory = function(req, resp) {
    var client = new pg.Client(this.dbURL);
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
    var query = client.query("select * from items WHERE item_type = '" + req.query.itemType+ "'" + "and item_comboprice is not null");

    query.on("end", function (result) {
        client.end();
        if(result.rows.length > 0) {

            var foodType = result.rows;
            resp.send(foodType);
        }
    });
};

MenuQuery.prototype.getAllItems = function(req, resp) {
    var client = new pg.Client(this.dbURL);
    client.connect();
    var query = client.query("select * from items");

    query.on("end", function (result) {
        client.end();
        if(result.rows.length > 0) {

            var foodType = result.rows;

            resp.send(foodType);
        }
    });
};

MenuQuery.prototype.addOrder = function(req, resp) {
    var client = new pg.Client(this.dbURL);
    client.connect();

    var query = client.query("INSERT INTO items_orders (item_id, combo, order_id, quantity) VALUES ('"+req.query.item_ID+"','"+req.query.comboBoolean+"','"+req.query.order_ID+"','"+req.query.quantity+"')");
    query.on("end", function () {
        client.end();
        resp.send("success")
    });
}

MenuQuery.prototype.addOrderItems = function(req, resp){
    var client = new pg.Client(this.dbURL);
    client.connect();

    var query = client.query("INSERT INTO orders (order_cost, order_status) VALUES ('"+req.query.total+"','"+req.query.orderStatus+"')RETURNING order_id, order_pickup");
    query.on("end", function (result) {
        client.end();
        resp.send(result.rows[0])
    });
}

module.exports = MenuQuery;