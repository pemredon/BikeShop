var express = require('express');
var router = express.Router();

// This is our new data structure (as an array of objects), to store our bikes info.
var dataBike = [
  {name: 'Model BIKO45', price: 679, url: '/images/bike-1.jpg'},
  {name: 'Model ZOOK7', price: 799, url: '/images/bike-2.jpg'},
  {name: 'Model LIKO89', price: 839, url: '/images/bike-3.jpg'},
  {name: 'Model GEWO', price: 1206, url: '/images/bike-4.jpg'},
  {name: 'Model TITAN5', price: 989, url: '/images/bike-5.jpg'},
  {name: 'Model AMIG39', price: 599, url: '/images/bike-6.jpg'}
];

// We set our basket structure to an empty array in order to add items only when we click on buy
var dataCardBike = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {dataBike});
});

/* POST shop page. */
router.post('/shop', function(req, res, next) {
  // Here we just want to check what can we get in our backend when the POST request is sent front the front end index.ejs
  console.log("Detection of the complete POST request:", req.body)
  console.log("Detection of the key 'bikeName' in our POST request:", req.body.bikeNameFromFront)
  console.log("Detection of the key 'bikePrice' in our POST request:", req.body.bikePriceFromFront)
  console.log("Detection of the key 'bikeImage' in our POST request:", req.body.bikeImageFromFront)
  console.log("Detection of the key 'bikeQuantity' in our POST request:", req.body.bikeQuantityFromFront)

  // Now that we can handle the requested data from the front, we can push a new object in our dataCardBike array (we need to use the same keys as in our dataBike array)
  dataCardBike.push(
    {
      name: req.body.bikeNameFromFront,
      price: req.body.bikePriceFromFront,
      url: req.body.bikeImageFromFront,
      quantity: req.body.bikeQuantityFromFront
    }
  );

  res.render('shop', {dataCardBike});
});


/* GET delete shop page. */
router.get('/delete-shop', function(req, res, next) {
  console.log("Detection of the complete GET request:", req.query)
  console.log("Detection of the specific key 'position' in our GET request:", req.query.position)

  // Here, we want to use a JavaScript method named splice. It enables us to delete from a specific position (req.query.position) a certain number of elements (only 1).
  dataCardBike.splice(req.query.position, 1);

  res.render('shop', {dataCardBike});
});


/* POST update shop page. */
router.post('/update-shop', function(req, res, next) {
  console.log("Detection of the complete POST request:", req.body)
  console.log("Detection of the specific key 'position' in our POST request:", req.body.position)
  console.log("Detection of the specific key 'quantity' in our POST request:", req.body.quantity)

  // Now, we want to update for a specific element with a specific key (quantity), a new quantity sent from the frontend
  dataCardBike[req.body.position].quantity = req.body.quantity;

  res.render('shop', {dataCardBike});
});





// // // // // //
// ***BONUS*** //
// // // // // //


// /* ***BONUS*** GET shop page. */
// // This bonus aims to give the user the possibity to reach the shop page without clicking on buy
router.get('/shop', function(req, res, next) {
  res.render('shop', {dataCardBike});
});



// /* ***BONUS*** POST update shop page. */
// // This bonus aims to check to check if the requested quantity is 0, then delete the item, otherwise if not 0, then update the quantity
// router.post('/update-shop', function(req, res, next) {
//
//   if (req.body.quantity == 0) {
//     dataCardBike.splice(req.body.position, 1);
//   } else {
//     dataCardBike[req.body.position].quantity = req.body.quantity;
//   }
//
//   res.render('shop', {dataCardBike});
// });




// /* ***BONUS*** POST shop page. */
// // // This bonus aims to check if the requested bike to add already exists in the shop basket, then we want to update the quantity of this bike but we do not want to add it, if not, add it.
// router.post('/shop', function(req, res, next) {
//
//   console.log(req.body)
//
//   var mustbeUpdated = false;
//   for (var i = 0; i < dataCardBike.length; i++) {
//     if (req.body.bikeNameFromFront == dataCardBike[i].name) {
//       mustbeUpdated = true;
//       dataCardBike[i].quantity++
//     }
//   }
//   if (mustbeUpdated == false) {
//     dataCardBike.push(
//       {
//         name: req.body.bikeNameFromFront,
//         price: req.body.bikePriceFromFront,
//         url: req.body.bikeImageFromFront,
//         quantity: req.body.bikeQuantityFromFront
//       }
//     );
//   }
//
//   res.render('shop', {dataCardBike});
// });

module.exports = router;
