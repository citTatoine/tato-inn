/**
 * Created by renzo on 2017-05-13.
 */
module.exports ={
    alterItem: function(req,resp){
        var pg = require('pg');
        var dbURL = process.env.DATABASE_URL || "postgres://localhost:5432/tatoinndb";
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
    },
    addItem: function(req,resp){
        var pg = require('pg');
        var dbURL = process.env.DATABASE_URL || "postgres://postgres:Ilikepie5231!@localhost:5432/tatooine";
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

    getCategory: function(req, resp) {
        var pg = require('pg');
        var dbURL = process.env.DATABASE_URL || "postgres://enterprisedb:kenster123@localhost:5444/tatooine";
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


    getCombo: function(req, resp) {
        var pg = require('pg');
        var dbURL = process.env.DATABASE_URL || "postgres://enterprisedb:kenster123@localhost:5444/tatooine";
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


    getItemPrice: function(req, resp) {
        var pg = require('pg');
        var dbURL = process.env.DATABASE_URL || "postgres://enterprisedb:kenster123@localhost:5444/tatooine";
        var client = new pg.Client(dbURL);
        client.connect();
        var query = client.query("select * from items WHERE item_name = '" + req.query.itemName+ "'");

        query.on("end", function (result) {
            client.end();
            if(result.rows.length > 0) {

                var itemPrice = result.rows[0];

                resp.send(itemPrice);
            }
        });




    },

};