const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {validateListing, isLoggedIn, isOwner} = require("../middleware.js");
const listingControllers = require("../controllers/listing.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


//Index and Create route
router.route("/")
.get(wrapAsync(listingControllers.index))
.post(isLoggedIn, validateListing, upload.single("listing[image]"), wrapAsync(listingControllers.createListing));


// New Route
router.get("/new", isLoggedIn, listingControllers.renderNewForm);


//Show, update and delete route
router.route("/:id")
.get(wrapAsync(listingControllers.showListing))
.put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingControllers.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingControllers.destroyListing));





// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControllers.renderEditForm));


module.exports = router;