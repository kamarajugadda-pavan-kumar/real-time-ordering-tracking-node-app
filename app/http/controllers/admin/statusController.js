const Order = require("../../../models/order");

function statusController() {
  return {
    update: function (req, res) {
      Order.updateOne(
        { _id: req.body.orderId },
        { status: req.body.status },
        (err, data) => {
          if (err) {
            return res.redirect("/admin/orders");
          }
          // Emit event that order status is updated
          const eventEmitter= req.app.get('eventEmitter')
          eventEmitter.emit('orderUpdated',{id:req.body.orderId, status:req.body.status})
          return res.redirect("/admin/orders");
        }
      );
    },
  };
}

module.exports = statusController;
