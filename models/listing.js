const mongoose = require("mongoose");
const review = require("./reviews.js");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: String,
  img: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true,
  },
  location: String,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  category: {
    type: String,
    enum: [
      "Trending",
      "Rooms",
      "Iconic Cities",
      "Mountains",
      "Castles",
      "Amazing Pools",
      "Camping",
      "Farms",
      "Arctic",
      "Domes",
      "Boats",
    ],
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listSchema.post("findOneAndDelete", async (list) => {
  if (list) {
    await review.deleteMany({ _id: { $in: list.reviews } });
  }
});

const Listing = mongoose.model("Listing", listSchema);

module.exports = Listing;
