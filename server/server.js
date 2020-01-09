const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const login = require('./router/login');
const signup = require('./router/signup');
const api = require('./router/api');
// const sessionController = require('./controllers/sessionController');

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, './assets')));

app.use('/signup', signup);

app.use('/login', login);

app.use('/api', api);

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}

// app.get('/api/parking', (req, res) => {
//   Parking.find({})
//     .exec()
//     .then((docs) => {
//       // console.log('docs:', docs)
//       res.status(200).json(docs)
//     });
// })
/**
 * root
 */
// respond with main app
app.get('/*',
  (req, res) => { res.status(200).sendFile(path.resolve(__dirname, '../client/index.html')) });

// app.use('/signup', signup);

// app.use('/login', login);

app.get('/index', (req, res) => {
    res.render('./../client/index.html', {});
  })

// app.post('/api/parking', (req, res) => {
//   const { longitude, latitude } = req.body;
//   const user_id = req.cookies.ssid;

//   Parking.create({
//     spot: {
//       coordinate: [longitude, latitude],
//       available_time: new Date(Date.UTC(96, 1, 2, 3, 4, 5)).toUTCString(),
//       user_id: user_id
//     }
//   })
// });

app.use('/api', api);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  console.log(err);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`)
})

module.exports = app;
