var express = require('express');
var router = express.Router();
var cors = require("cors");
router.use(cors());
const items = [
  {
    itemName: 'i7-8700k',
    store: 'Bestbuy',
    price: 400,
    description: 'cpu',
    image: 'src/assets/items/i7-8700k.png'
  },
  {
    itemName: '16GB Memory',
    store: 'Bestbuy',
    price: 100,
    description: 'memory',
    image: 'src/assets/items/memory.jfif'
  },
  {
    itemName: 'i7-9700',
    store: 'Bestbuy',
    price: 500,
    description: 'cpu',
    image: 'src/assets/items/i7-8700k.png'
  }
];
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.render('index', { title: 'Express' });
});

router.post('/search', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.body);
  const request = req.body.name;
  const result = [];

  items.forEach(function (element) {
    if (element.itemName.includes(request)) {
      result.push(element);
      console.log(element.itemName);
    }
  });

  res.json(result);
});

router.get('/getlist', function (req, res) {
  r.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.json(items);
});
module.exports = router;
