const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const listingSchema= new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image:{
        url: String,
        filename:String,    
    },
    price: Number,
    state: String,
    country: String,
    reviews:  [{
        type: Schema.Types.ObjectId,
        ref: "review",
    }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref : "user",
    },
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;