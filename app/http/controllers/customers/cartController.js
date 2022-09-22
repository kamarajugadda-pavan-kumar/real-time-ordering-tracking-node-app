function cartController() {
  return {
    index: function (req, res) {
      res.render("customers/cart");
    },
    update: function (req, res) {
      // let cart ={
      //   items:{
      //     pizzaId:{item:pizzaObject, qty:0},
      //   },
      //   totalQty:0,
      //   totalPice:0
      // }

      // for the first time creating cart and addibng basic Object structure
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }
      let cart = req.session.cart;
      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1
        };
        cart.totalQty=cart.totalQty+1;
        cart.totalPrice= cart.totalPrice+ req.body.price
      }else{
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
        cart.totalQty =cart.totalQty+1;
        cart.totalPrice = cart.totalPrice + req.body.price
      }
      return res.json({ totalQty:req.session.cart.totalQty , totalPrice: req.session.cart.totalPrice});
    },
  };
}

module.exports = cartController;
