const express = require('express');
const api = express.Router();

const apiController = require('../controllers/apiController');
  
//jk
api.post('/parking', apiController.create, apiController.findOne, (req, res) => {
    res.status(200).json(res.locals.id);
})

api.get('/parking', apiController.findAll, (req, res)=>{
    //CHECK WITH FRONT END WHAT IS SENT OVER THROUGH JSON, CHECK WHAT NEEDS TO BE CHANGED TO CORRECTLY IDENTIFY LONG/LAT 
    res.status(200).json(res.locals.pins);
})

api.patch('/parking', apiController.updateMarker, (req, res) => {
    res.status(200).json(res.locals.updated);
})

module.exports = api;

// app.get('/api/parking', (req, res) => {
    //     Parking.find({})
    //       .exec()
    //       .then((docs) => {
    //         // console.log('docs:', docs)
    //         res.status(200).json(docs)
    //       });
    //   })
      
    // app.post('/api/parking', (req, res) => {
    //     const { longitude, latitude } = req.body;
    //     const user_id = req.cookies.ssid;
      
    //     Parking.create({
    //       spot: {
    //         coordinate: [longitude, latitude],
    //         available_time: new Date(Date.UTC(96, 1, 2, 3, 4, 5)).toUTCString(),
    //         user_id: user_id
    //       }
    //     })
    //   });