const path = require('path');
const db = require('../models/data');

const userController = {};

userController.createUser = (req, res, next) => {
  const { name, phone, pass, email } = req.body;
  const phoneNum = Number(phone);
  const text = `
      INSERT INTO users(name, password, phone_number, email)
      values($1, $2, $3, $4);
  `

  const values = [ name, pass, phoneNum, email ];

  db.query(text, values)
    .then(response => console.log(response))
    .catch(err => console.log(err))

    next();
  }

/*
const userController = {

  //Create user controller
  createUser(req, res, next) {
    const { name, phone, pass } = req.body;
    const phoneNum = Number(phone);
    const newUser = {
      name: name,
      phone: phoneNum,
      pass: pass
    }

    User.create(newUser)
      .then(userDoc => {
        res.locals.user = userDoc;
        return next();
      })
      .catch(err => {
        return next({
          log: 'Express error handler caught user create error',
          status: 400,
          message: { err: 'An error occurred' },
        });
      });
  },

  //verify user controller
  verifyUser(req, res, next) {
    const { phone, pass } = req.body;
    User.findOne({ phone: phone })
      .exec()
      .then(userDoc => {
        if (!userDoc) {
          res.locals.auth = false;
          return next();
        }
        if (userDoc.pass === req.body.pass) {
          res.locals.auth = true;
          res.locals.id = userDoc._id;
          return next();
        }
        res.locals.auth = false;
        return next();
      })
      .catch(err => {
        res.status(401).json({ 'Error': err });
        return next({
          log: 'ERROR: userController verifyUser error',
          status: 400,
          message: { err: 'An error occurred' },
        });
      });
  },

  updateUserCar(req, res, next) {
    const { car_make, car_model, car_color } = req.body.car;
    const { id } = req.body;
    User.findOneAndUpdate({ _id: id },
      {
        car: {
          car_make: car_make,
          car_model: car_model,
          car_color: car_color
        }
      },
      { new: true }, (err, updatedDoc) => {
        if (err) {
          return next({
            log: 'Express error handler caught car update error',
            status: 400,
            message: { err: 'An error occurred' },
          });
        };
        res.locals.successfulSignup = true;
        return next();
      })
  }
}

*/
userController.verifyUser = async (req, res, next)=>{
  const { phone, pass } = req.body;
  const phoneNum = Number(phone);

  const text = `
    SELECT phone_number
    FROM users
    WHERE password = '${pass}' AND phone_number = ${phoneNum}
  `

  await db.query(text)
  .then(response => {
    res.locals.id = response.rows[0].phone_number;
    res.locals.auth = true;
    console.log(response)
  })
  .catch(err => {
    res.locals.auth = false;
    console.log(err)})

  next();
}

userController.updateUserCar = (req, res, next) => {
  const { car_make, car_model, car_color } = req.body;
  const { id } = req.body;
  const phoneNum = Number(id);
  console.log('req.body in userController: ', req.body);
  const text = `
    UPDATE users
    SET car_make = '${req.body.car.car_make}',
        car_model = '${req.body.car.car_model}',
        car_color = '${req.body.car.car_color}'
    WHERE phone_number = ${id}  
  `

  db.query(text)
    .then(response =>{console.log(response)})
    .catch(err => {console.log(err)});

  next();
}

module.exports = userController;