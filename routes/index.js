const express = require('express');

const router = express.Router();

const rooms = require('../assets/rooms');

/* GET home page. */
router.get('/', (req, res, next) => {
  // console.log(rooms[0].price, 'this is rooms');
  const adults = 1;
  const children = 1;
  const todayDate = new Date();
  const currentDateFormat = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;
  const tomorrowDateFormat = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${(todayDate.getDate() + 1)}`;
  const roomsSortedByPrice = rooms.sort((a, b) => ((a.price > b.price) ? 1 : -1));
  // console.log(roomsSortedByPrice, 'by price')
  res.render('index', {
    title: 'THN',
    copyright: '© 2019 THN',
    currentDateFormat,
    tomorrowDateFormat,
    adults,
    children,
    roomsSortedByPrice,
  });
});

router.get('/modify', async (req, res, next) => {
  const {
    checkin, checkout, adults, children,
  } = req.query;
  const currentDateFormat = checkin;
  const tomorrowDateFormat = checkout;
  // const adultsNumber = parseFloat(adults);
  // const childrenNumber = parseFloat(children);
  // const people = adultsNumber + childrenNumber;
  // const accommodationSelection = await accommodations.filter( accommodation => { return accommodation.people >= people});
  // await sortAccommodations(accommodationSelection);
  res.render('index', {
    title: 'THN',
    copyright: '© 2019 THN',
    currentDateFormat,
    tomorrowDateFormat,
    adults,
    children,
  });
});

module.exports = router;
