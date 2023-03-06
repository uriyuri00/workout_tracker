const { Post } = require("../models");

const postData = [
  {
    title: "SQUATS",
    text: "45 Squat Variations to Keep You on Your Toes",
    imgUrl:"https://res.cloudinary.com/dotdha3jx/image/upload/v1678064760/qrdbex9u6dsywwltr3sd.jpg",
    user_id: 1,
  },
  {
    title: "Cardio",
    text: "Cardio refers to cardiovascular exercise and includes various aerobic exercises that are designed to increase overall stamina and endurance. Cardio includes walking, Jogging, Cycling, Swimming, etc.",
    imgUrl:"https://res.cloudinary.com/dotdha3jx/image/upload/v1678064698/i2ufyan3bxemqwlfrylj.jpg",
    user_id: 2,
  },
  {
    title: "Strength",
    text:
      "Strength training places emphasis on building muscles by repeating motions that are hindered by some form of resistance. Arms, Chest, Shoulders, Biceps ",
      imgUrl:"https://res.cloudinary.com/dotdha3jx/image/upload/v1678065799/sjw8i7uoerjaqlaefp5w.jpg",
      user_id: 3,
  },
  {
    title: "Aerobic",
    text:
      "Aerobic that can make your body sweat profusely, your lungs breathe faster, and cardiovascular system pump the blood faster for a considerable duration.",
      imgUrl:"https://res.cloudinary.com/dotdha3jx/image/upload/v1678065826/sljc03mod06b2zos2kwk.jpg",
    user_id: 4,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;