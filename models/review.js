const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const reviewSchema= new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min : 1,
        max : 5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "user",
    }
})
const Reviews = mongoose.model("review" , reviewSchema);
module.exports= Reviews ;