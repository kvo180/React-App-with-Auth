const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

// connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();

app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
app.use(bodyParser.json());

// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware ????
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes ???
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
