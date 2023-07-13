// import cars collection/model
const users = require("../models/usersSchema");

// json web token
const jwt = require("jsonwebtoken");

// register
exports.register = async (req, res) => {
  const { username, password, mobile } = req.body;

  if (!username || !password || !mobile) {
    res.status(403).json("All inputs are require");
  }
  try {
    const preUser = await users.findOne({ username, mobile });

    if (preUser) {
      res.status(406).json("user Already exist!!!");
    } else {
      // add user to bd
      const newUser = new users({
        username,
        password,
        mobile,
        wishlist: [],
        cart: [],
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

// login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const preUser = await users.findOne({ username, password });
    if (preUser) {
      // const{mobile}=preUser
      // console.log(mobile)
      // generate jwt token
      const token = jwt.sign(
        { loginUsername: preUser.mobile },
        "supersecretKey"
      );
      // send to client
      res.status(200).json({ preUser, token });
    } else {
      res.status(406).json("Invalid Username or password");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.addWishlist = async (req, res) => {
  const { loginMobile } = req;
  const { id, rate, title, image } = req.body;

  try {
    const preUser = await users.findOne({ mobile: loginMobile });
    const result = await preUser.wishlist.find((o) => o.p_id == id);
    console.log(result);
    if (result) {
      res.status(406).json("already added");
    } else {
      preUser.wishlist.push({
        p_id: id,
        p_rate: rate,
        p_title: title,
        p_image: image,
      });
      await preUser.save();
      res.status(200).json("added");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.getWishlists = async (req, res) => {
  const { loginMobile } = req;
  try {
    const preUser = await users.findOne({ mobile: loginMobile });
    res.status(200).json(preUser.wishlist);
  } catch (error) {
    res.status(401).json(error);
  }
};

// remove wishlist item
exports.removeWishItem = async (req, res) => {
  const { id } = req.body;
  const { loginMobile } = req;
  console.log(id, loginMobile);
  try {
    const preUser = await users.updateOne(
      { mobile: loginMobile },
      { $pull: { wishlist: { p_id: id } } }
    );
    res.status(200).json(`removed`);
  } catch (error) {
    res.status(401).json(error);
  }
};

// cart add
exports.addCart = async (req, res) => {
  const { loginMobile } = req;
  const { id, rate, title, image, price,pickUp_date,return_date } = req.body;

  try {
    const preUser = await users.findOne({ mobile: loginMobile });
    // const result = await preUser.cart.find((o) => o.p_id == id);
    // console.log(result);
    // if (result) {
    //   await users.updateOne({mobile: loginMobile, "cart.p_id":id} , {$inc:{"cart.$.no_of_times":1}})
    //   result.no_of_times+=1
    //   await preUser.save()
    //   res.status(200).json('added')
    // } else {
      preUser.cart.push({
        p_id: id,
        p_rate: rate,
        p_title: title,
        p_image: image,
        p_price:price,
        pickUp_date:pickUp_date,
        return_date:return_date
      });
      await preUser.save();
      res.status(200).json("add");
    // }
  } catch (error) {
    console.log(error)
    res.status(401).json(error);
  }
};

