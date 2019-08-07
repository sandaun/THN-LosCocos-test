const express = require('express');

const router = express.Router();

const rooms = require('../assets/rooms');

/* GET home page. */
router.get('/', (req, res, next) => {
  const adults = 1;
  const children = 1;
  const pax = adults + children;
  const todayDate = new Date();
  const currentDateFormat = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;
  const tomorrowDateFormat = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${(todayDate.getDate() + 1)}`;
  const roomsByCapacity = rooms.filter( room => room.people <= 2);
  const roomsSortedByPrice = roomsByCapacity.sort((a, b) => ((a.price > b.price) ? 1 : -1));
  res.render('index', {
    title: 'THN',
    copyright: '© 2019 THN',
    currentDateFormat,
    tomorrowDateFormat,
    adults,
    children,
    roomsSortedByPrice,
    pax,
  });
});

router.get('/modify', async (req, res, next) => {
  const {
    checkin, checkout, adults, children,
  } = req.query;
  const currentDateFormat = checkin;
  const tomorrowDateFormat = checkout;
  const adultsToNumber = parseInt(adults, 10);
  const childrenToNumber = parseInt(children, 10);
  const pax = (adultsToNumber + childrenToNumber);
  const roomsByCapacity = await rooms.filter( room => room.people >= pax);
  const roomsSortedByPrice = await roomsByCapacity.sort((a, b) => ((a.price > b.price) ? 1 : -1));
  res.render('index', {
    title: 'THN',
    copyright: '© 2019 THN',
    currentDateFormat,
    tomorrowDateFormat,
    adults,
    children,
    roomsSortedByPrice,
    pax,
  });
});

module.exports = router;
