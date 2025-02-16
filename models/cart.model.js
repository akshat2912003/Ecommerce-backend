
// // const mongoose = require("mongoose");
// // const { productSchema } = require("./product.model");
// // const config = require("../config/config");


// // // const cartItemProductSchema = new mongoose.Schema({
// // //     _id: {
// // //         type: mongoose.Schema.Types.ObjectId,  // Changed from String
// // //         required: true
// // //     },
// // //     name: String,
// // //     category: String,
// // //     cost: Number,
// // //     rating: Number,
// // //     image: String
// // // });  // Removed { _id: false }

// // const cartItemProductSchema = new mongoose.Schema({
// //     _id: {
// //         type: mongoose.Schema.Types.ObjectId, // Match MongoDB ObjectId type
// //         required: true
// //     },
// //     name: String,
// //     category: String,
// //     cost: Number,
// //     rating: Number,
// //     image: String
// // }, { _id: false }); // Keep _id: false since we're using product's _id

// // // Add this to ensure proper casting
// // cartItemProductSchema.path('_id').set((v) => new mongoose.Types.ObjectId(v));

// // const cartSchema = mongoose.Schema({
// //     email: {
// //         type: String,
// //         required: true,
// //         unique: true
// //     },
// //     cartItems: [{
// //         product: cartItemProductSchema,
// //         quantity: Number
// //     }],
// //     paymentOption: {
// //         type: String,
// //         default: config.default_payment_option
// //     }
// // });

// // const Cart = mongoose.model("Cart",cartSchema)
// // module.exports.Cart = Cart;





// const mongoose = require("mongoose");
// const { productSchema } = require("./product.model");
// const config = require("../config/config");

// // Define cart item product schema
// const cartItemProductSchema = new mongoose.Schema({
//   _id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   category: {
//     type: String,
//     required: true
//   },
//   cost: {
//     type: Number,
//     required: true
//   },
//   rating: Number,
//   image: {
//     type: String,
//     required: true
//   }
// }, { _id: false }); // Prevent duplicate _id for subdocuments

// // Define main cart schema
// const cartSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       index: true
//     },
//     cartItems: [{
//       product: {
//         type: cartItemProductSchema,
//         required: true
//       },
//       quantity: {
//         type: Number,
//         required: true,
//         min: 1,
//         default: 1
//       }
//     }],
//     paymentOption: {
//       type: String,
//       enum: ['COD', 'CARD'], // Example enum
//       default: config.default_payment_option
//     }
//   },
//   { 
//     timestamps: true,
//     autoIndex: false, // Disable automatic index creation
//     toJSON: { virtuals: true }, // Include virtuals when converting to JSON
//     toObject: { virtuals: true }
//   }
// );

// // Add index on email field explicitly
// cartSchema.index({ email: 1 }, { unique: true });

// // Virtual for total cart value
// cartSchema.virtual('totalValue').get(function() {
//   return this.cartItems.reduce(
//     (total, item) => total + (item.product.cost * item.quantity),
//     0
//   );
// });

// // Pre-save hook to ensure data consistency
// cartSchema.pre('save', function(next) {
//   // Remove duplicate cart items before saving
//   const seen = new Map();
//   this.cartItems = this.cartItems.filter(item => {
//     const key = item.product._id.toString();
//     return !seen.has(key) && seen.set(key, true);
//   });
//   next();
// });

// const Cart = mongoose.model("Cart", cartSchema);

// // Create indexes in background during startup
// async function createCartIndexes() {
//   try {
//     await Cart.createIndexes();
//     console.log('Cart indexes created successfully');
//   } catch (error) {
//     console.error('Error creating cart indexes:', error);
//   }
// }

// createCartIndexes();

// module.exports = Cart;



const mongoose = require("mongoose");
const { productSchema } = require("./product.model");
const config = require("../config/config");
const cartSchema =  mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    cartItems : [
        {
            product : productSchema,
            quantity :Number
        }
    ],
    paymentOption : {
        type:String,
        default:config.default_payment_option
    }
})

const Cart = mongoose.model("Cart",cartSchema)
module.exports.Cart = Cart