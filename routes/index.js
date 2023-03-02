const router = require('express').Router()

router.get('/', (req, res) => {
    const data = {
      pageTitle: 'Fitness Tracker',
      pageName: 'Fitness Tracker',
      pageDescription: 'Track your fitness goals with our app!',
      photoPath: 'https://example.com/fitness-photo.jpg',
      photoAltText: 'Fitness photo'
    };
    res.render('home', data);
  });


module.exports = router;
// const router = require('express').Router()
// const publicRoutes = require('./public')

// router.use(publicRoutes)

// module.exports = router
