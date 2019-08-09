const express = require('express');

const router = express.Router();

const rooms = require('../assets/rooms');

const app = express();

function dataStoredGlobal(roomsSortedByPrice, children, adults, checkin, checkout) {
  app.locals.roomsSortedByPrice = roomsSortedByPrice;
  app.locals.children = children;
  app.locals.adults = adults;
  app.locals.checkin = checkin;
  app.locals.checkout = checkout;
}

/* GET home page. */
router.get('/', async (req, res, next) => {
  const adults = 1;
  const children = 1;
  const pax = adults + children;
  const todayDate = new Date();
  const checkin = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;
  const checkout = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${(todayDate.getDate() + 1)}`;
  const roomsByCapacity = await rooms.filter( room => room.people <= 2);
  const roomsSortedByPrice = await roomsByCapacity.sort((a, b) => ((a.price > b.price) ? 1 : -1));
  dataStoredGlobal(roomsSortedByPrice, children, adults, checkin, checkout);
  res.render('index', {
    title: 'THN',
    copyright: '© 2019 THN',
    checkin,
    checkout,
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
  const adultsToNumber = parseInt(adults, 10);
  const childrenToNumber = parseInt(children, 10);
  const pax = (adultsToNumber + childrenToNumber);
  const roomsByCapacity = await rooms.filter( room => room.people >= pax);
  const roomsSortedByPrice = await roomsByCapacity.sort((a, b) => ((a.price > b.price) ? 1 : -1));
  dataStoredGlobal(roomsSortedByPrice, children, adults, checkin, checkout);
  res.render('index', {
    title: 'THN',
    copyright: '© 2019 THN',
    checkin,
    checkout,
    adults,
    children,
    roomsSortedByPrice,
    pax,
  });
});

router.get('/save/:promo', (req, res, next) => {
  const { checkin, checkout, adults, children } = app.locals;
  const { name, price } = app.locals.roomsSortedByPrice[0];
  const { promo } = req.query;
  const prePromo = promo.slice(0, 3);
  const postPromo = parseInt(promo.slice(3, 5), 10);
  let isPromoValid = false;

  if (prePromo === 'THN' && promo.length === 5 && postPromo <= 99 && postPromo >= 1) {
    isPromoValid = true;
    res.render('purchase', {
      title: 'THN',
      copyright: '© 2019 THN',
      checkin,
      checkout,
      adults,
      children,
      name,
      price,
      postPromo,
      isPromoValid,
    });
  } else {
    res.render('purchase', {
      title: 'THN',
      copyright: '© 2019 THN',
      checkin,
      checkout,
      adults,
      children,
      name,
      price,
      postPromo,
      isPromoValid,
    });
  }
});


module.exports = router;
