const e = require("express");
const express = require("express");
const Razorpay = require('razorpay')
const app = express();
const port = 4000;
app.use(express.static('./public'))
app.use(express.json());


// app.get("/", (req, res) => {
//   res.send("Hello World!");
  
// });

app.post("/order",async (req, res) => {
    const amount = req.body.amount

  var instance = new Razorpay({
    key_id: "Razorpay_KEY_ID",
    key_secret: "RAZORPAY_KEY_SECRET",
    // this keys will be removed from the razorpay once upload to github
  });

  var options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  //   instance.orders.create(options, function (err, order) {
  //     console.log(order);
  //   });

  const myOrder = await instance.orders.create(options);

  res.status(201).json({
      success:true,
      order: myOrder,
      amount
  })


});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
