const db = require('../models/data');

const apiController = {};

apiController.create = async (req, res, next) => {
    const { longitude, latitude, id } = req.body;
    const time = new Date(Date.UTC(96, 1, 2, 3, 4, 5)).toUTCString();

    const text = `
        INSERT INTO parking(longitude, latitude, time, available, reserve, taken)
        values($1, $2, $3, $4, $5, $6)
    `

    const values = [longitude, latitude, time, true, false, false ];

   await db.query(text, params)
        .then(response => console.log(response))
        .catch(err => console.log(err))

    next();
}

apiController.findAll = async (req, res, next) =>{
    const text = `
        SELECT * 
        FROM parking
    `
    await db.query(text)
    .then(response =>{
        res.locals.pins = response.rows;
        console.log(response)
    })
    .catch(err => {
        console.log(err)
    })
}

apiController.findOne = async (req, res, next) =>{
  const { longitude, latitude, id } = req.body;
  const text = `
                SELECT parking_id
                FROM parking
                WHERE longitude = '${longitude}' AND latitude = '${latitude}'
                `
  await db.query(text)
    .then(response => {
      res.locals.id = response.rows[0].parking_id;
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    })

  const text2 = `
        INSERT INTO users(parking_spot)
        values($1)
                `

  const values = [res.locals.id]
  await db.query(text2, values)
    .then(response => {console.log(response)})
    .catch(err => {console.log(err)})

  next();
}

apiController.updateMarker = async (req, res, next) => {
  const { longitude, latitude } = req.body;
  const text = `SELECT * 
                FROM parking 
                WHERE longitude = '${longitude}' AND latitude = '${latitude}'`;
  await db.query(text)
    .then(response =>{
    res.locals.updated = response.rows[0];
    console.log(response);
    })
    .catch(err =>{
      console.log(err); 
    })

  next();
}

module.exports = apiController;