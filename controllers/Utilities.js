var q = require('q');

module.exports = {

  create: function(model, body) {
    var dfd = q.defer();
    var newModel = new model(body);
    newModel.save(function(err, data) {
      if (err) {
        return dfd.reject(err);
      } else {
        return dfd.resolve(data);
      }
    });
    return dfd.promise;
  },

  readAll: function(model, user_id) {
    var dfd = q.defer();
    model.find({ onwer: user_id })
      .exec()
      .then(function(data, err) {
        if (err) {
          return dfd.reject(err);
        } else {
          return dfd.resolve(data);
        }
      })
    return dfd.promise;
  },

  readOne: function(model, id) {
    var dfd = q.defer();
    model.findById(id)
      .then(function(data, err) {
        if (err) {
          return dfd.reject(err);
        } else {
          return dfd.resolve(data);
        }
      });
    return dfd.promise;
  },

  delete: function(model, id) {

  },


// *******************************************************************************/
// Auth Utilities 
// *******************************************************************************/
  requireAuth: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(403).json({ "message": "Not logged in." }).end();
    }
    return next();
  }
}

// import q from 'q'

// /*******************************************************************************
// Create
// *******************************************************************************/
// export function crudCreate ( model, body ){
//   let dfd = q.defer()
//   new model(body).save()
//     .then(result => {
//       return dfd.resolve(result)
//     })
//     .catch(err => {
//       return dfd.reject(err)
//     })
//     return dfd.promise
// }

// /*******************************************************************************
// Read
// *******************************************************************************/
// export function crudReadOne( model, query ){
//   let dfd = q.defer()
//   model.findOne( query )
//     .then( result => {
//       if(!result){
//         return dfd.reject(result)
//       }
//       return dfd.resolve(result)
//     })
//     .catch( err => {
//       return dfd.reject(err)
//     })
//   return dfd.promise
// }

// export function crudReadAll( model ){
//   let dfd = q.defer()
//   model.find()
//     .then( result => {
//       if(!result || result.length === 0){
//         return dfd.reject(result)
//       }
//       return dfd.resolve(result)
//     })
//     .catch( err => {
//       return dfd.reject(err)
//     })
//   return dfd.promise
// }

// /*******************************************************************************
// Update
// *******************************************************************************/
// export function crudUpdate( model, query, body ){
//   let dfd = q.defer()
//   model.findOneAndUpdate(query, body, {}, (err, result) => {
//     if(err)
//       return dfd.reject(err)
//     return dfd.resolve(result)
//   })
//   return dfd.promise
// }

// /*******************************************************************************
// Delete
// *******************************************************************************/
// export function crudDelete( model, query = {}){
//   let dfd = q.defer()
//   model.find(query).remove()
//     .then( result => {
//       return dfd.resolve(`Delete Successful`)
//     })
//     .catch( err => {
//       return dfd.reject(`Could Not Delete`)
//     })
//   return dfd.promise
// }
//
