const Order = require("../../../models/order");
const moment = require("moment");

function orderController() {
  return {
    store: function (req, res) {
      // console.log(req.body)
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash("error", "all fields are required");
        return res.redirect("/cart");
      }

      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone: phone,
        address: address,
      });

      order
        .save()
        .then((result) => {
          Order.populate(result, { path: "customerId" }, (err, placedOrder) => {
            // Emit event that new order is created, real time communication with admin
            const eventEmitter = req.app.get("eventEmitter");
            eventEmitter.emit("orderPlaced", result);
          });
          req.flash("success", "order placed successfully");
          delete req.session.cart;

          return res.redirect("/customer/orders");
        })
        .catch((err) => {
          req.flash("error", "something went wrong");
          return res.redirect("/cart");
        });
    },
    index: async function (req, res) {
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });

      res.header(
        "cache-Control",
        "no-cache,private,no-store,must-revalidate, max-stale=0 , post-check=0, pre-check=0"
      );

      res.render("customers/orders", { orders: orders, moment: moment });
    },
    show: async function (req, res) {
      const order = await Order.findById(req.params.id);
      // authorize user
      if (req.user._id.toString() === order.customerId.toString()) {
        return res.render("customers/singleOrder", { order: order });
      }
      return res.redirect("/");
    },
  };
}

module.exports = orderController;
