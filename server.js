require('dotenv').config()
const path = require("path");
const express = require('express');
const session = require('express-session');
const expresshbs = require('express-handlebars')
const routes = require('./controllers')
const route = require('./routes')
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;
const hbs = expresshbs.create({});

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'))

//handlebars set up
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(routes);
app.use(route);

sequelize.sync({ force: false }).then(() => {
  console.log("Database connection successful.");
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});

