var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var cors = require("cors");
var axios = require('axios');
var crawlerEngineHost = "localhost";
var app = express();
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
   let verify = "noGG";
   for (user in db.users) {
      if (user.username == req.body.username || user.email == req.body.username)
         if (user.password == req.body.password) {
            verify = "GG"
            db.currentUser = user.username;
            break;
         }
         else {
            verify = "notGG"
            break;
         }
   }
   res.send(verify);
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
      res.write("JarvisIsGay");
   else {
      res.write(JSON.stringify(db.users.find(({ username }) => username === db.currentUser)))
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
   let verify = "noGG";
   for (user in db.users) {
      if (user.username == req.body.username)
         verify = "hadGG"
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
   let verify = "noGG";
   for (user in db.users) {
      if (user.email == req.body.email)
         verify = "hadGG"
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
   let verify = "noGG";
   for (user in db.users) {
      if (user.username == req.body.username || user.email == req.body.email)
         verify = "hadGG"
   }
   if (verify == "hadGG")
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
      db.users.find(({ username }) => username === db.currentUser).homeAddress = req.body.homeAddress
      fs.writeFileSync("mongodb.json", JSON.stringify(db));
      res.end();
   }
   if (req.query.tag == "work") {
      db.users.find(({ username }) => username === db.currentUser).workAddress = req.body.workAddress
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
   let verify = "noGG";
   for (user in db.users) {
      if (user.username == req.body.username || user.email == req.body.email) {
         verify = "GGgone";
         delete db.users.find(({ username }) => username === req.body.username)
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
   axios.get("http://" + crawlerEngineHost + ":8000/search?q=" + req.query.q)
      .then(response => {
         res.send(JSON.stringify(response.data));
         res.end();
      })
      .catch(error => {
         console.log(error);
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
      for (shoppingList in db.shoppingLists) {
         if (shoppingList.listId == list) {
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
      for (shoppingList in db.shoppingLists) {
         if (shoppingList.listId == list) {
            delete db.shoppingLists.find(({ listId }) => listId === list);
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
      for (shoppingList in db.shoppingLists) {
         if (shoppingList.listId == list) {
            db.shoppingLists.find(({ listId }) => listId === list).items.delete(req.query.index);
            found = true;
            res.write("deleted");
            break;
         }
      }
      if (!found) {
         res.write("JarvisIsGay")
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
      for (shoppingList in db.shoppingLists) {
         if (shoppingList.listId == list) {
            let itemList = db.shoppingLists.find(({ listId }) => listId === list).items;
            for (item in itemList) {
               shpLt.push(db.shoppingLists.find(({ itemId }) => itemId === item))
            }
            break;
         }
      }
      res.write(shpLt);
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
