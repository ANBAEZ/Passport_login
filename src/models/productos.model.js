const mongoose = require('mongoose');

const ProductosSchema = mongoose.Schema({
    id: {
        type: Number,
        require: true
      },
      name: {
        type: String,
        required: true
      },
      picture: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        default: 0, 
        required: true
      },
      category: {
        type: String,
        enum: ['computer','phone', 'accesories']
      },
      description:{
        type: String,
        required: true
      }
      
    });
    
    
    module.exports = mongoose.model('Product', ProductosSchema, 'products');