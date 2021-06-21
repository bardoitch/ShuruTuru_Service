const mongoose = require('mongoose');
const validator = require ('validator');

var pathSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    }
});

var TourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    start_date:{
        type: Date, 
        default: Date.now,
        required: true,
        trim: true
    },
    duration:{
        type:Number,
        required:true,
        trim:true,
        validate(value) {
            if (!value < 0) {
                throw new Error('Doration is invalid.')
            }
        }
    },
    cost:{
        type:Number,
        required:true,
        trim:true,
        validate(value) {
            if (!value < 0) {
                throw new Error('Cost is invalid.')
            }
        }
    },
    path:{
        type:[pathSchema],
        required:false
    } ,
    guide: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide',required:true},
}
);



const Tour = mongoose.model('Tour', TourSchema );
module.exports = Tour