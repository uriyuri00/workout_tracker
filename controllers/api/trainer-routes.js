const router = require('express').Router();
const { User, Trainer, Post, Comment } = require('../../models');

// Get all Trainer
router.get('/', (req, res) => {
    Trainer.findAll({
        attributes: {
            exclude: ['password']
        }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get specific Trainer
router.get('/:id', (req, res) => {
    Trainer.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: ['id', 'title', 'content']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a Trainer
router.post('/', (req, res) => {
    Trainer.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.post('/login', (req, res) => {
    Trainer.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({
                    message: 'No user with that username!'
                });
                return;
            }

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({
                    user: dbUserData,
                    message: 'You are now logged in!'
                });
            });

            const validPassword = dbUserData.chkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({
                    message: 'Incorrect password!'
                });
                return;
            }

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({
                    user: dbUserData,
                    message: 'You are now logged in!'
                });
            });
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }

});

module.exports = router;