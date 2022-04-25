// |->O.o|->>> >>'Jesus Gabriel Morales Tepole'<< <<-|o.O<-|>>>11/04/2022  Se declaran variables de y se descargan sus librerias
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');
const jwtconfig = require('../config/jwt.config');


module.exports = function (passport) { //Jesús_Gabriel|->O.o|->>> >>11/04/2022: Se declara la función
    let opts = {}; // Jesús_Gabriel|->O.o|->>> >>11/04/2022: Se declara variable 
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//Jesús_Gabriel|->O.o|->>> >>11/04/2022: Se obtiene 
    //la variable "OPTS" y se crea funcion para generación de TOKEN
    opts.secretOrKey = jwtconfig.secret; //Jesús_Gabriel|->O.o|->>> >>11/04/2022:funcion para generación de TOKEN 
    passport.use(new Strategy(opts, (payload, done) => {
        getUserById(payload.data._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));

}

function getUserById(id, callback) {//Jesús_Gabriel|->O.o|->>> >>11/04/2022: Se declara función para obtener datos
    User.findById(id, callback);
}