const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("C:\\apna-project\\models\\listing.js");
const review = require("C:\\apna-project\\models\\review.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const bodyParser = require("body-parser");
const user = require("./models/user.js");
const isLoggedIn = require("./middleware.js");
const multer = require("multer");
const { storage } = require("./cloudConfig.js");

const upload = multer({ storage });

//const {saveRedirectUrl} = require("./middleware.js");

require("dotenv").config();
const port = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: true }));

//main().then(()=>{console.log("connection successfull!");})
//.catch(err => console.log(err));

//async function main() {
//  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');

// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
//}
const dbUrl=process.env.MONGODB_URI ;

try {
  mongoose.connect(dbUrl);
  console.log("connect to databse")
  
} catch (error) {
  console.log("Error:", error);
  
}


const store= MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:"mysecretcode"
  }, 
  touchAfter: 24 * 3600,
});

const sessionOptions = {
  store,
  secret: "mysecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.get("/", (req, res) => {
res.render("home/home.ejs");
});
app.use((req, res, next) => {
  res.locals.currUser = req.user
  next()
})

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// user login signup route

app.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

try {
  app.post("/signup", async (req, res) => {
    let { username, email, password } = req.body;
    const chutiyaUser = new User({ username, email });
    let registerUser = await User.register(chutiyaUser, password);
    await registerUser.save();
    //functionality to directly login after signup
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/listings");
      }
    });
  });
} catch (error) {
  next(err);
}

app.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/listings");
  }
);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      return res.redirect("/login");
    }
  });
});

//--------------------------------------------------------------------------------------

// Listing routes started

app.get("/listings", async (req, res,next) => {
  try {
    res.locals.currUser=req.user;
    
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
  } catch (err) {
    next(err);
  }
});

//new route
app.get("/listings/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", isLoggedIn, async (req, res) => {
  
  try {
    const id = req.params.id;
    const currUserId = req.user._id;
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    res.render("listings/show.ejs", { listing, currUserId });
  } catch (error) {
    console.log("error:", error.message);
  }
});

//create route
app.post(
  "/listings",
  isLoggedIn,
  upload.single("image"),
  async (req, res, next) => {

    try {
      const url = req.file.path;
      const filename = req.file.filename;
      const { title, description, image, price, state, country } = req.body;
      const newListing = new Listing({
        title,
        description,
        image,
        price,
        state,
        country,
      });

      newListing.owner = req.user._id;
      newListing.image = { url, filename };
      await newListing.save();
      res.redirect("/listings");
    } catch (error) {
      next(err);
    }
  }
);

//app.post("/listings", upload.single("image"), (req, res) => {
//  res.send(req.file);
//});

//edit route
app.get("/listings/:id/edit", isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing});
  } catch (err) {
    next(err)
  }
  
});

//update
app.put("/listings/:id", isLoggedIn,upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
  const url= req.file.path;
  const filename= req.file.filename;
  const { title, description, image, price, state, country } = req.body;
  const newListing=await Listing.findByIdAndUpdate(id, {
    title,
    description,
    image,
    price,
    state,
    country,
  });
  newListing.image = { url, filename };
  await newListing.save();

  res.redirect("/listings");
  } catch (err) {
    next(err);
  }
});

//delete
app.delete("/listings/:id", isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;
  const delItem = await Listing.findByIdAndDelete(id);
  console.log(delItem);
  res.redirect("/listings");
  } catch (err) {
    next(err);
  }
});
// listing route ended here
//----------------------------------------------------------------------------------

//review route started here

//review route

app.post("/listings/:id/reviews", isLoggedIn, async (req, res) => {
  //const author= req.user._id;
  try {
    let listing = await Listing.findById(req.params.id);
  const { rating, comment } = req.body;
  let newReview = new review({ rating, comment });
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    next(err);
  }
});

//review delete route
app.delete("/listings/:id/reviews/:reviewId", isLoggedIn, async (req, res) => {
  try {
    const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await review.findByIdAndDelete(reviewId);

  res.redirect(`/listings/${id}`);
  } catch (err) {
    next(err);
  }
});
// review route ended here
//--------------------------------------------------------------------------------------

//show error route always put below

app.use((err, req, res, next) => {
  res.render("error_page/err.ejs");
});

app.listen(port, (req, res) => {
  console.log(`server running on port: ${port} `);
});
