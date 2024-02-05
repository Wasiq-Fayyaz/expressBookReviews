const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", async function auth(req,res,next){
    const { fullname, emailaddress, password } = req.body;
    try {
      let oldUser = await User.findOne({ emailaddress });
      const encryptedPassword = await bcrypt.hash(password, 10);
      if (oldUser) {
        return res.send({ status: "User Exists!" }); // To send a single response
      } else
        await User.create("userRegistration", {
          fullname,
          emailaddress,
          password: encryptedPassword,
        });
      res.send({ status: "OK" });
    } catch (error) {
      res.send({ status: "404" + error });
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
