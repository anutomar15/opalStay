const Review = require("../models/review.js");
const Listing = require("../models/listing.js");


// Create Review
module.exports.createReview = async(req, res)=>{
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    console.log("Review body:", req.body);
    // to create new review
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    
    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();
    req.flash("success", "New review added!");
    res.redirect(`/listings/${listing._id}`);
};


// Delete review
module.exports.destroyReview = async(req, res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
};