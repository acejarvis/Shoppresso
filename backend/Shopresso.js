var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var cors = require("cors");
var axios = require('axios');
var crawlerEngineHost = "localhost";
var app = express();
var { spawn } = require("child_process");

app.set("port", process.env.PORT || 9000);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Login and Logout //

// Login method, noGG bad suer bad password, notGG good user bad password, GG good user good password
app.post('/user/login', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));
   let verify = "not exist";
   for (let i = 0; i < db.users.length; i++) {
      if (db.users[i].username == req.body.username || db.users[i].email == req.body.email) {
         if (db.users[i].password == req.body.password) {
            verify = "Login Succeed"
            db.currentUser = db.users[i].username;
            break;
         } else {
            verify = "Wrong Password"
            break;
         }

      }
   }
   res.json(verify);
   fs.writeFileSync("mongodb.json", JSON.stringify(db));
   res.end();
})

// Logout method
app.get('/user/logout', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));
   db.currentUser = "JarvisIsGay"
   fs.writeFileSync("mongodb.json", JSON.stringify(db));
   res.end();
})

// getCurrentUser info method
app.get('/user/getCurrentUser', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));
   if (db.currentUser == "JarvisIsGay")
      res.json("JarvisIsGay");
   else {
      res.json(JSON.stringify(db.users.find(({ username }) => username === db.currentUser)))
   }
   res.end();
})

// Manage Users //

// Verify username not taken, noGG not taken, hadGG already taken.
app.post('/user/verifyUsername', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));
   let verify = "Valid";
   for (let i = 0; i < db.users.length; i++) {
      if (db.users[i].username == req.body.username)
         verify = "Invalid";
   }
   res.send(verify);
   res.end();
})

// Verify email not taken, noGG not taken, hadGG already taken.
app.post('/user/verifyEmail', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));
   let verify = "Valid";
   for (let i = 0; i < db.users.length; i++) {
      if (db.users[i].email == req.body.email)
         verify = "Invalid"
   }
   res.send(verify);
   res.end();
})

// Create new user
app.post('/user/newUser', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));
   let verify = "Valid";
   for (let i = 0; i < db.users.length; i++) {
      if (db.users[i].username == req.body.username || db.users[i].email == req.body.email)
         verify = "Invalid"
   }
   if (verify == "Invalid")
      res.send("Username/Email has been taken.");
   else {
      db.users.push({
         "username": req.body.username,
         "password": req.body.password,
         "email": req.body.email,
         "address": [
            {
               "tag": "home",
               "address": req.body.homeAddress
            },
            {
               "tag": "work",
               "address": req.body.workAddress
            }
         ]
      });
      fs.writeFileSync("mongodb.json", JSON.stringify(db));
   }
   res.end();
})

// Update current user address
app.post('/user/changeAddress', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));
   if (req.query.tag == "home") {
      db.users.find(({ username }) => username === db.currentUser).address[0].address = req.body.homeAddress
      fs.writeFileSync("mongodb.json", JSON.stringify(db));
      res.end();
   }
   if (req.query.tag == "work") {
      db.users.find(({ username }) => username === db.currentUser).address[1].address = req.body.workAddress
      fs.writeFileSync("mongodb.json", JSON.stringify(db));
      res.end();
   }
})

// Delete user from db
app.delete('/user/deleteUser', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));
   let verify = "User Not Found";
   for (let i = 0; i < db.users.length; i++) {
      if (db.users[i].username == req.body.username || db.users[i].email == req.body.email) {
         verify = "User Deleted";
         db.users.splice(i, 1);
      }
   }
   res.send(verify);
   fs.writeFileSync("mongodb.json", JSON.stringify(db));
   res.end();
})

// item operations

// search
app.post('/search', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   var pyProg = spawn('python', ['./prototying_web_crawler.py', req.query.q]);
   pyProg.stdout.on('data', function (data) {
      res.write(data.toString());
      res.end();
   });
})

app.post('/item', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));

   // Add item to db
   if (req.query.cmd == "add") {
      db.items.push({
         "itemId": db.currentId,
         "displayedName": req.body.name,
         "name": req.body.name,
         "store": req.body.store,
         "price": req.body.price,
         "image": req.body.image
      });
      db.currentId += 1;
      fs.writeFileSync("mongodb.json", JSON.stringify(db));
      res.end();
   }

})

// Shopping List operations

app.post('/shoppingList', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));

   // Add item to shopping list
   if (req.query.cmd == "add") {
      let list = Date.parse(req.body.date).toDateString();
      let found = false;
      for (let i = 0; i < db.shoppingLists.length; i++) {
         if (db.shoppingLists[i].listId == list) {
            db.shoppingLists.find(({ listId }) => listId === list).items.push(req.query.itemId);
            found = true;
            break;
         }
      }
      if (!found) {
         db.shoppingLists.push({
            "listId": list,
            "items": [req.query.itemId]
         });
      }
      fs.writeFileSync("mongodb.json", JSON.stringify(db));
      res.end();
   }

   // clear shopping list
   if (req.query.cmd == "clear") {
      let list = Date.parse(req.body.date).toDateString();
      for (let i = 0; i < db.shoppingLists.length; i++) {
         if (db.shoppingLists[i].listId == list) {
            db.shoppingLists.splice(i, 1);
            break;
         }
      }
      fs.writeFileSync("mongodb.json", JSON.stringify(db));
      res.end();
   }

   // Delete item from shopping list
   if (req.query.cmd == "delete") {
      let list = Date.parse(req.body.date).toDateString();
      let found = false;
      for (let i = 0; i < db.shoppingLists.length; i++) {
         if (db.shoppingLists[i].listId == list) {
            db.shoppingLists.find(({ listId }) => listId === list).items.delete(req.query.index);
            found = true;
            res.json("deleted");
            break;
         }
      }
      if (!found) {
         res.json("JarvisIsGay")
      }
      fs.writeFileSync("mongodb.json", JSON.stringify(db));
      res.end();
   }
})

// getShoppingList
app.get('/shoppingList', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));

   // Get shopping list of a certain date
   if (req.query.cmd == "getShoppingList") {
      let list = Date.parse(req.body.date).toDateString();
      let shpLt = []
      for (let i = 0; i < db.shoppingLists.length; i++) {
         if (db.shoppingLists[i].listId == list) {
            let itemList = db.shoppingLists.find(({ listId }) => listId === list).items;
            for (let i = 0; i < itemList.length; i++) {
               shpLt.push(db.shoppingLists.find(({ itemId }) => itemId === itemList[i]))
            }
            break;
         }
      }
      res.json(shpLt);
      res.end();
   }
})

// move item in shopping list up or down
// move shopping list item to another shopping list

var server = app.listen(8081, "0.0.0.0", function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
