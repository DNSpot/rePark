const db = require('../models/data');


// const cookieController = {
    
//     setSSIDCookie (req, res, next) {
//         User.find({name: res.locals.user.name})
//         .exec()
//         .then(user => {
//             res.cookie('ssid', user[0]._id, {httpOnly: true});
//             res.locals.userId = user[0]._id;
//             return next();
//         })
//         .catch(
//             err => {return next({
//                 log: 'Express error handler caught setSSIDcookie error',
//                 status: 400,
//                 message: { err: 'An error occurred' },
//               })}
//         )
//     }
// };

const cookieController = {}; 

cookieController.setCookie = (req, res, next) =>{
    const { phone } = req.body;
    const phoneNum = Number(phone);
    res.cookie('id', phoneNum, {httpOnly: false});
    //creating a column in the users table 
    //const text = `ALTER TABLE users ADD cookie `
    //console.log(req.)
    next();
}
module.exports = cookieController;