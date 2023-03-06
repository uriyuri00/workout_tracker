const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// const session = require('express-session');
const withAuth = require('../../utils/auth');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);


// router.get('/', (req, res) => {
//     User.findAll({
//         attributes: { exclude: ['password'] }
//     })
//       .then(dbUserData => res.json(dbUserData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

// router.get('/:id', (req, res) => {
//     User.findOne({
//       attributes: { exclude: ['password'] },
//       where: {
//         id: req.params.id
//       },
//       include: [
//         {
//           model: Post,
//           attributes: ['id', 'title', 'text','imgUrl']
//         },
//        /* {
//           model: Trainer,
//           attributes:['specialty','certification']
//         },*/
//         {
//             model: Comment,
//             attributes: ['id', 'comment_text', 'post_id', 'user_id'],
//             include: {
//                 model: Post,
//                 attributes: ['title']
//             }
//         }
//       ]
//     })
//       .then(dbUserData => {
//         if (!dbUserData) {
//           res.status(404).json({ message: 'No user found with this ID' });
//           return;
//         }
//         res.json(dbUserData);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    trainer: true
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
    
        res.json(dbUserData);
        console.log(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
      
//       res.json({ user: userData, message: 'You are now logged in!' });
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });



router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
        where: {
        username: req.body.username
        }
    });
        if (!dbUserData) {
        res.status(400).json({ message: 'No user found with this username' });
        return;
        }
        const validPassword = dbUserData.checkPw(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
        //  req.session.username = dbUserData.username;
          req.session.loggedIn = true;
    
          res.json({ user: dbUserData, message: 'You are logged in!' });
        });
      } catch (err) {
        res.status(400).json(err);
      }
    });  


router.post('/logout', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})

router.put('/:id', withAuth, (req, res) => {
  
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  })

router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;