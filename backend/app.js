if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const Form = require("./models/form");
const User = require("./models/user");


const wrapAsync = require("./utils/wrapAsync");
const expressError = require("./utils/ExpressError");
const { isLoggedIn } = require("./middleware");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const flash = require("connect-flash");

const MongoStore = require("connect-mongo").default;

const dbUrl = process.env.ATLASDB_URL;
const SECRET = process.env.SECRET;

async function main() {
  await mongoose.connect(dbUrl, {
    tls: true,
    tlsAllowInvalidCertificates: true,
  });
}

main()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


app.use(
  cors({
    origin: [
      "http://localhost:5173",
     "https://she-can-foundation-2.onrender.com"
    ],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Mongo session error:", err);
});

app.set("trust proxy", 1);

app.use(
  session({
    store: store,
    secret: SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
   cookie: {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
}
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


app.post(
  "/formSubmit",
  wrapAsync(async (req, res,next) => {
    const { name, email, message } = req.body;

    const newForm = new Form({ name, email, message });
    await newForm.save();

    res.json({
      success: true,
      message: "Form Submitted Successfully",
      data: newForm,
    });
  })
);


/* Edit Form */
app.patch(
  "/edit/:id",
  wrapAsync(async (req, res,next) => {
    const { id } = req.params;
    const { name, email, message } = req.body;

    await Form.findByIdAndUpdate(id, { name, email, message });

    res.json({
      success: true,
      message: "Form Updated Successfully",
    });
  })
);

/* View Form */
app.get(
  "/view/:id",
  wrapAsync(async (req, res,next) => {
    const { id } = req.params;

    const formData = await Form.findById(id);

    res.json({
      success: true,
      data: formData,
    });
  })
);

/* Signup */
app.post(
  "/signup",
  wrapAsync(async (req, res,next) => {
    try {
      const { username, role, password } = req.body;

      const newUser = new User({ username, role });
      await User.register(newUser, password);

      res.json({
        success: true,
        message: "Signup Successful",
      });
    } catch (err) {
      console.log(err);
      res.json({
        success: false,
        message: "Signup Failed",
      });
    }
  })
);



app.post("/login", (req, res, next) => {

  passport.authenticate("local", (err, user, info) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username or Password"
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Login failed"
        });
      }

      req.session.save(() => {
        return res.json({
          success: true,
          message: "Successfully Logged In"
        });
      });
    });

  })(req, res, next);

});


app.get(
  "/allForms",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const forms = await Form.find({});

    res.json({
      success: true,
      forms,
    });
  })
);

app.use((req, res, next) => {
  next(new expressError(404, "Page not found!"));
});


app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;

  res.status(statusCode).json({
    success: false,
    message,
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

