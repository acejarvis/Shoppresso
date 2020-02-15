var express = require('express');
var router = express.Router();
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


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/search', async(req, res) => {
  console.log(req.body);
  const request = req.body.name;
  const result =[];

  items.forEach(function(element) {
    if(element.itemName.includes(request)) {
      result.push(element);
      console.log(element.itemName);
    }
  });

  res.json(result);
});

router.get('/getlist', function(req, res) {
  res.json(items);
});
module.exports = router;
