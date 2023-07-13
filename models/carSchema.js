// import mongoose
const mongoose = require("mongoose");

const carsSchema = mongoose.Schema({
    v_id: {
        type:Number,
        required:true,
        unique:true
    },
  accessibility: {
    fuel_policy: {
        type:String,
        required:false
    },
    transmission: {
        type:String,
        required:true
    },
  },
  vehicle_info: {
    seats: {
        type:String,
        required:true
    },
    image_url:
    {
        type:String,
        required:true
    },
    v_name: {
        type:String,
        required:true
    },
    mileage: {
        type:String,
        required:true
    },
    suitcases: {
      big:{
        type:String,
        required:true
    },
      small:{
        type:String,
        required:true
    },
    },
    group: {
        type:String,
        required:true
    },
    transmission: {
        type:String,
        required:true
    },
    label: {
        type:String,
        required:false
    },
    doors: {
        type:String,
        required:false
    },
    free_cancellation: {
        type:String,
        required:false
    },
    airbags: {
        type:String,
        required:false
    },
    badges: {},
    fuel_type: {
        type:String,
        required:false
    },
  },
  pricing_info: {
    drive_away_price: {
        type:Number,
        required:false
    },
    currency: {
        type:String,
        required:false
    },
    discount: {
        type:Number,
        required:false
    },
    pay_when: {
        type:String,
        required:false
    },
    base_deposit: {
        type:Number,
        required:false
    },
    deposit: {
        type:Number,
        required:false
    },
    base_price: {
        type:Number,
        required:false
    },
    price: {
        type:Number,
        required:false
    },
  },
  rating_info: {
    average: {
        type:Number,
        required:false
    },
    value_for_money: {
        type:Number,
        required:false
    },
    dropoff_time: {
        type:Number,
        required:false
    },
    cleanliness:{
        type:Number,
        required:false
    },
    location: {
        type:Number,
        required:false
    },
    average_text: {
        type:String,
        required:false
    },
    efficiency: {
        type:Number,
        required:false
    },
    pickup_time: {
        type:Number,
        required:false
    },
    no_of_ratings: {
        type:Number,
        required:false
    },
    condition: {
        type:Number,
        required:false
    },
  },
  content: {
    supplier: {
      name: {
        type:String,
        required:false
    },
      imageUrl:
      {
        type:String,
        required:false
    },
      rating: {
        subtitle: {
            type:String,
            required:false
        },
        average: {
            type:String,
            required:false
        },
        title: {
            type:String,
            required:false
        },
      },
    },
    badges: [
      {
        variation: {
            type:String,
            required:false
        },
        type: {
            type:String,
            required:false
        },
        text:{
            type:String,
            required:false
        },
      },
    ],
  },
});
// create a model for collection
const products = mongoose.model("products",carsSchema)
// export model
module.exports = products