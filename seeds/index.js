const commentSeeds = require('./comment-seeds');
const postSeeds = require('./post-seeds');
const trainerSeeds = require('./trainer-seeds');
const userSeeds = require('./user-seeds'); 

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await userSeeds();
    console.log('\n----- USERS SEEDED -----\n');
  
    await trainerSeeds();
    console.log('\n----- TRAINERS SEEDED -----\n');
  
    await postSeeds();
    console.log('\n----- POSTS SEEDED -----\n');
  
    await commentSeeds();
    console.log('\n----- COMMENTS SEEDED -----\n');
  
    process.exit(0);
  };

  seedAll();
  