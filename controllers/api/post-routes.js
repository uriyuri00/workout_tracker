const router = require('express').Router();
const { User, Post, Comment, Trainer } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id','title','text','imgUrl'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Trainer,
                attributes:['specialty','certification']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id','title','text','imgUrl','user_id'],
      include: [
        {
          model: User,
          attributes: ['username','email','password', 'is_trainer']
        },
        {

            model: Trainer,
            attributes:['username','specialty','certification']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'user_id', 'post_id'],
            include: {
                model: User,
                attributes: ['username','email','password', 'is_trainer']
            }
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', withAuth, (req, res) => {
  
    Post.create({
        title: req.body.title,
        text: req.body.text,
        imgUrl:req.body.imgUrl,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
   // Post.update({title:req.body.title,},
   Post.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;