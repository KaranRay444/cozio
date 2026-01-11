const list = require("../models/listing");
const Review = require("../models/reviews");

// CREATE REVIEW
module.exports.createReview = async (req, res) => {
  const listx = await list.findById(req.params.id);
  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;

  listx.reviews.push(newReview);
  await newReview.save();
  await listx.save();
  req.flash("success", "New Review created!");

  res.redirect(`/listings/${listx._id}`);
};
// DELETE REVIEW
module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  // Remove review reference from the listing
  await list.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });

  // Delete the review
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");

  res.redirect(`/listings/${id}`);
};
