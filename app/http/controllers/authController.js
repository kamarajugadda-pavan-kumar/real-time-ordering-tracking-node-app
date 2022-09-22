const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
function authController() {
  const _getRedirect=(req)=>{
    return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders';
  }

  return {
    login: function (req, res) {
      res.render("auth/login");
    },
    postLogin: function (req, res, next) {
      const { email, password } = req.body;
      // print the cart info from session before login
      console.log(req.session.cart);
      let cart = req.session.cart;

      // validation of input fields
      if (!email || !password) {
        req.flash("error", "All fields are required");
        return res.redirect("/login");
      }

      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }

        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          req.session.cart=cart

          return res.redirect(_getRedirect(req));
        });
      })(req, res, next);
    },
    register: function (req, res) {
      res.render("auth/register");
    },
    postRegister: async function (req, res) {
      const { name, email, password } = req.body;

      // validate request
      if (!name || !email || !password) {
        req.flash("error", "all fields must be present");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }

      // check if the email exists
      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "email already exists");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create a user
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });

      user
        .save()
        .then((user) => {
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "something went wrong");
          return res.redirect("/register");
        });
    },
    logout: function (req, res) {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/login");
      });
      // return res.redirect("/login");
    },
  };
}

module.exports = authController;
