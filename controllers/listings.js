const list = require("../models/listing");

// INDEX ROUTE
module.exports.index = async (req, res) => {
  const { search, category } = req.query;
  let listx;
  try {
    if (search) {
      // Search
      listx = await list.find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
          { country: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      });
    } else if (category) {
      listx = await list.find({ category: category });
    } else {
      listx = await list.find({});
    }
    res.render("./listing/index.ejs", { listx });
  } catch (err) {
    console.log(err);
    res.redirect("/listings");
  }
};

// RENDER NEW FORM
module.exports.renderNewForm = (req, res) => {
  res.render("./listing/new.ejs");
};

// SHOW ROUTE
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listx = await list
    .findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listx) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  console.log(listx.owner.username);
  res.render("./listing/show.ejs", { listx });
};

// CREATE ROUTE
module.exports.createListing = async (req, res, next) => {
  try {
    const mapToken = process.env.MAP_API_KEY;
    const address = req.body.listx.location;

    const url = `https://api.olamaps.io/places/v1/geocode?address=${encodeURIComponent(
      address
    )}&api_key=${mapToken}`;

    const response = await fetch(url);
    const data = await response.json();

    let urlPath = req.file.path;
    let filename = req.file.filename;
    const newList = new list(req.body.listx);
    newList.owner = req.user._id;
    newList.img = { url: urlPath, filename };
    if (
      data.status === "ok" &&
      data.geocodingResults &&
      data.geocodingResults.length > 0
    ) {
      const location = data.geocodingResults[0].geometry.location;
      newList.geometry = {
        type: "Point",
        coordinates: [location.lng, location.lat],
      };
    } else {
      console.log("Geocoding failed:", data);
      req.flash("error", "Could not find location. Try a different address.");
      return res.redirect("/listings/new");
    }
    let savedListing = await newList.save();
    console.log(savedListing);

    req.flash("success", "New listing created!");
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong.");
    res.redirect("/listings/new");
  }
};

//render edit form
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listx = await list.findById(id);
  if (!listx) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  res.render("./listing/edit.ejs", { listx });
};

// UPDATE ROUTE
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  const newlistx = req.body.listx;
  const Listing = await list.findByIdAndUpdate(id, newlistx, {
    new: true,
  });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    Listing.img = { url, filename };
    await Listing.save();
  }
  req.flash("success", "Listing Updated!");
  console.log(id, "updated Successfully!!");
  res.redirect(`/listings/${id}`);
};

// DELETE ROUTE
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await list.findByIdAndDelete(id);
  console.log(id, "deleted Successfully!!");
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
