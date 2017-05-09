const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./server/routes/auth.js');

const app = express();

app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
