import axios from "axios";
import moment from "moment";
import Noty from "noty";
import { initAdmin } from "./admin";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");

function updateCart(pizza) {
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      // console.log(res);
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        text: "Item added to cart",
        type: "success",
        timeout: 2000,
        progressBar: false,
        layout: "bottomRight",
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        text: "something went wrong",
        timeout: 1000,
        progressBar: false,
      }).show();
    });
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
    // console.log(pizza);
  });
});

// remove alert message after x seconds
const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 2000);
}



// change order status
let statuses = document.querySelectorAll(".status_line");
let hiddenInput = document.getElementById("hiddenInput");
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order);
let time = document.createElement("small");

function updateStatus(order) {
  
  let stepCompleted = true;
  
  // remove previous classes
  statuses.forEach((status)=>{
    status.classList.remove("step-completed")
    status.classList.remove("current")
  })

  // add new classes according to the status
  statuses.forEach((status) => {
    let dataProp = status.dataset.status;
    if (stepCompleted) {
      status.classList.add("step-completed");
    }
    if (dataProp === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt).format("hh:mm A");
      status.appendChild(time);
      status.nextElementSibling.classList.add("current");
    }
  });
}

updateStatus(order);

// socket
let socket = io();

// join the private room
if (order) {
  socket.emit("join", `order_${order._id}`);
}

// listen for any changes to the order status and update the status on customer side
socket.on('orderUpdated',(data)=>{
  const updatedOrder={...order}
  updatedOrder.updatedAt=moment().format()
  updatedOrder.status= data.status
  updateStatus(updatedOrder)
  new Noty({
    type:'success',
    timeout:1000,
    text: `status changed to ${updatedOrder.status}`,
    progressBar:false
  }).show()
})

// admin functionality
initAdmin(socket);

let adminAreaPath=window.location.pathname
if(adminAreaPath.includes('admin')){
  socket.emit('join','adminRoom')
}

