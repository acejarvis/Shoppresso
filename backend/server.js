var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var cors = require("cors");
var checkRateLimit = require("rate-limit");
var cors_proxy = require("cors-anywhere");
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
   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));
   let verify = "not exist";
   for (let i = 0; i < db.users.length; i++) {
      if (req.body.username == db.users[i].username || req.body.email == db.users[i].email) {
         if (req.body.password == db.users[i].password) {
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
   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));
   db.currentUser = "JarvisIsGay"
   fs.writeFileSync("mongodb.json", JSON.stringify(db));
   res.json("ok");
   res.end();
})

// getCurrentUser info method
app.get('/user/getCurrentUser', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));
   if (db.currentUser == "JarvisIsGay")
      res.json("JarvisIsGay");
   else {
      res.json(db.users.find(({ username }) => username === db.currentUser));
   }
   res.end();
})

// Manage Users //

// Verify username not taken, noGG not taken, hadGG already taken.
app.post('/user/verifyUsername', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE, PUT");
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
   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE, PUT");
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
   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE, PUT");
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
      res.json("Username/Email has been taken.");
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
   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE, PUT");
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
   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE, PUT");
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
   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   //linux only
    const { exec } = require('child_process');
    exec('python3 prototying_web_crawler.py ' + req.query.q, (error, stdout, stderr) => {
      console.log('python3 prototying_web_crawler.py ' + req.query.q);
      if (error) {
           console.error(`exec error: ${error}`);
          return;
       }
       res.write(stdout);
       res.end();
   });


   // //windows only
   // var pyProg = spawn('python', ['./prototying_web_crawler.py', req.query.q]);
    // pyProg.stdout.on('data', function (data) {
    // res.write(data.toString());
    // res.end();

   // });

})

app.post('/item', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));

   // Add item to db
   if (req.query.cmd == "add") {
      db.items.push({
         "itemId": db.currentId,
         "displayedName": req.body.displayedName,
         "name": req.body.name,
         "store": req.body.store,
         "price": req.body.price,
         "img": req.body.img
      });

      let list = new Date().toDateString();

      let found = false;
      for (let i = 0; i < db.shoppingLists.length; i++) {
         if (db.shoppingLists[i].listId == list) {
            db.shoppingLists.find(({ listId }) => listId === list).items.push(db.currentId.toString());
            found = true;
            break;
         }
      }
      if (!found) {
         db.shoppingLists.push({
            "listId": list,
            "items": [db.currentId.toString()]
         });
      }

      db.currentId += 1;
      fs.writeFileSync("mongodb.json", JSON.stringify(db));
      res.end();
   }

})

// Shopping List operations
app.post('/shoppingList', function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));

   // Add item to shopping list
   if (req.query.cmd == "add") {
      let list = new Date(req.query.date).toDateString();
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
      let list = new Date(req.query.date).toDateString();
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
      let list = new Date(req.query.date).toDateString();
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
   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE, PUT");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   let db = JSON.parse(fs.readFileSync("mongodb.json", "utf8"));

   // Get shopping list of a certain date
   if (req.query.cmd == "getShoppingList") {
      let list = new Date(req.query.date).toDateString();
      let shpLt = []
      for (let i = 0; i < db.shoppingLists.length; i++) {
         if (db.shoppingLists[i].listId == list) {
            let itemList = db.shoppingLists.find(({ listId }) => listId === list).items;
            for (let i = 0; i < itemList.length; i++) {
               shpLt.push(db.items.find(({ itemId }) => itemId.toString() === itemList[i]))
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

var originBlacklist = parseEnvList(process.env.CORSANYWHERE_BLACKLIST);
var originWhitelist = parseEnvList(process.env.CORSANYWHERE_WHITELIST);
function parseEnvList(env) {
   if (!env) {
      return [];
   }
   return env.split(',');
}

cors_proxy.createServer({
   originBlacklist: originBlacklist,
   originWhitelist: originWhitelist,
   requireHeader: [],
   'rejectUnauthorized': false,
   'http.proxyStrictSSL': false,
   removeHeaders: [
      'cookie',
      'cookie2',
      // Strip Heroku-specific headers
      'x-heroku-queue-wait-time',
      'x-heroku-queue-depth',
      'x-heroku-dynos-in-use',
      'x-request-start',
   ],
   redirectSameOrigin: true,
   httpProxyOptions: {
      // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
      xfwd: false,
      secure: false,
   },
}).listen(8000, "0.0.0.0", function () {
   console.log('Running CORS Anywhere on 0.0.0.0:' + 8000);
});
