const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validation/profile");

// Load profile model
const Profile = require("../../models/Profile");
// Load user model
const User = require("../../models/User");

// @route    GET api/profile/test
// @desc     Test profile route
// @access   Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

// @route    GET api/profile
// @desc     Get current users profile
// @access   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name"]) // [] ON NAME MIGHT BE CHANGED
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route    GET api/profile/all
// @desc     Get all profiles
// @access   Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name"]) // [] ON NAME MIGHT BE CHANGED
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profiles: "There are no profiles" }));
});

// @route    GET api/profile/handle/:handle
// @desc     Get profile by handle
// @access   Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile under this handle";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route    GET api/profile/user/:user_id
// @desc     Get all profiles
// @access   Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.staus(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route    POST api/profile
// @desc     Create or Edit users profile
// @access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.dob) profileFields.dob = req.body.dob;
    if (req.body.bio) profileFields.bio = req.body.bio;

    profileFields.socials = {};
    if (req.body.facebook) profileFields.socials.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.socials.twitter = req.body.twitter;
    if (req.body.instagram)
      profileFields.socials.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update to existing profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create new profile

        // Check if handle already exists
        Profile.findOne({ handle: profileFields.hanfle }).then(profile => {
          if (profile) {
            errors.handle = "That handle is already in use";
            res.status(400).json(errors);
          }
          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route    DELETE api/profile
// @desc     Delete profile
// @access   Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ session: true })
      );
    });
  }
);

module.exports = router;
