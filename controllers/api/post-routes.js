const router = require('express').Router();
const { User, Post, Comment, Trainer } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const upload = multer({ storage });

router.post('/', withAuth, upload.single('file'), (req, res) => {
  // Create a new post object with the uploaded image URL
  const newPost = {
    title: req.body.title,
    text: req.body.description,
    imgUrl: `/uploads/${req.file.filename}`, // this assumes you are storing the images in a 'public/uploads' directory
    user_id: req.session.user_id,
  };

  // Create the post in the database
  Post.create(newPost)
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

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

// router.post('/', withAuth, (req, res) => {
  
//     Post.create({
//         title: req.body.title,
//         text: req.body.text,
//         imgUrl:req.body.imgUrl,
//         user_id: req.session.user_id
//     })
//     .then(dbPostData => res.json(dbPostData))
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

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