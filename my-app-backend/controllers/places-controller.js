const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Place = require("../models/places");
const User = require("../models/users");
let DummyPlace = [
  {
    id: "p1",
    title: "Cafe Coffee Day,IITK",
    description:
      "Operating on a space funded by the Batch of '87, the CCD outlet is situated just next to the P K Kelkar Library. It serves CCD's conventional menu like patries, brownies, cappacino, chocolate drinks etc. at a 40% subsidised rate. At exam times, it provides a nice refreshing environment for students studying at the library. The outlet is open from 9 am to 11 pm on all days.",
    address:
      "Lounge 68, Inside IIT Campus, Kalyanpur, Kanpur, Uttar Pradesh 208016",
    creator: "u1",
    ccordinates: "2356",
  },
];

const getplacebyId = async (req, res, next) => {
  const placeId = req.params.pid;
  let places;
  try {
    places = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Could not load the place", 500);
    return next(error);
  }
  if (!places) {
    return next(new HttpError("could not find place with provided id", 404));
  }
  res.json({ places: places.toObject({ getters: true }) });
};

const getplacebyuserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError("error fetching the places", 500);
    return next(error);
  }
  if (!places || places.length === 0) {
    next(new HttpError("could not find place with given user id", 404));
  }
  res.json({ users: places.map((place) => place.toObject({ getters: true })) });
};

const createaPlace = async (req, res, next) => {
  console.log("hi");
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("please check the data you input", 422));
  }
  const { title, description, coordinates, address, creator, image } = req.body;
  const id = mongoose.Types.ObjectId(creator);
  const CreatedPlace = new Place({
    title,
    description,
    address,
    creator: id,
    coordinates,
    image,
  });
  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(new HttpError("Creatin Place failed , try again"), 500);
  }

  if (!user) {
    return next(new HttpError("could not find the user with given id"));
  }
  console.log(user);
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await CreatedPlace.save({ session: sess });
    user.places.push(CreatedPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Could not store place to ", 500));
  }
  res.status(201).json(CreatedPlace);
};

const updatePlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError("please check the data you input", 422));
  }
  const { title, description, address } = req.body;
  const placeId = req.params.pid;
  let updatedPlace;
  try {
    updatedPlace = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Error updating the place", 500);
    return next(error);
  }

  if (updatedPlace.creator.toString() != req.userdata.userid) {
    const error = new HttpError("You are not allowed to edit this place", 500);
    return next(error);
  }

  updatedPlace.title = title;
  updatedPlace.description = description;
  updatedPlace.address = address;
  try {
    await updatedPlace.save();
  } catch (err) {
    const error = new HttpError("error while updating", 500);
    return next(error);
  }

  res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError("Could not delete try again", 500);
    return next(error);
  }

  if (place.creator.toString() != req.userdata.userid) {
    const error = new HttpError("You are not allowed to delete the place", 500);
    return next(error);
  }

  if (!place) {
    return next(new HttpError("could not find the place with given id", 401));
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Could not delete try again", 500);
    return next(error);
  }
  res.status(200).json({ message: "deleted successfully" });
};

exports.getplacebyId = getplacebyId;
exports.getplacebyuserId = getplacebyuserId;
exports.createaPlace = createaPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
