const admins = require("../models/adminSchema");
const users = require("../models/usersSchema");
const products = require("../models/carSchema");

const jwt = require("jsonwebtoken");

// login
exports.login = async (req, res) => {
  const { admin_name, password } = req.body;
  try {
    const preUser = await admins.findOne({ admin_name, password });
    if (preUser) {
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
    console.log(error);
    res.status(401).json(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const getUser = await users.find();
    res.status(200).json(getUser);
  } catch (error) {
    res.status(401).json(error);
  }
};
// deleteUser
exports.deleteUser = async (req, res) => {
  const { mobile } = req.params;
  console.log(mobile);
  try {
    await users.deleteOne({ mobile });
    const getUser = await users.find();
    res.status(200).json(getUser);
  } catch (error) {
    res.status(401).json(error);
  }
};

// add new car
exports.addNewCar = async (req, res) => {
  const {
    carName,
    carId,
    accessibility,
    seats,
    image,
    mileage,
    suitcaseBig,
    suitcaseSmall,
    group,
    door,
    price,
  } = req.body;
  // console.log(carName,carId,accessibility,seats,image,mileage,suitcaseBig,suitcaseSmall,group,door,price)

  try {
    const preUser = await products.findOne({ v_id: carId });

    if (preUser) {
      res.status(406).json("Already exist!!!");
    } else {
      const newCar = new products({
        v_id: carId,
        accessibility: {
          transmission: accessibility,
        },
        vehicle_info: {
          seats: seats,
          image_url: image,
          v_name: carName,
          mileage: mileage,
          suitcases: {
            big: suitcaseBig,
            small: suitcaseSmall,
          },
          group: group,
          transmission: accessibility,
          doors: door,
        },
        pricing_info: {
          price: price,
        },
      });
      await newCar.save();
      console.log(newCar);
      res.status(200).json(newCar);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await products.deleteOne({ v_id: id });
    const getCars = await products.find();
    res.status(200).json(getCars);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.updateCarDetails = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  console.log(id);
  console.log(product);

  try {
    const prodct = await products.updateOne(
      { v_id: id },
      {
        $set: {
          v_id: product.v_id,
          accessibility: {
            transmission: product.accessibility.transmission,
          },
          vehicle_info: {
            seats: product.vehicle_info.seats,
            image_url: product.vehicle_info.image_url,
            v_name: product.vehicle_info.v_name,
            mileage: product.vehicle_info.mileage,
            suitcases: {
              big: product.vehicle_info.suitcases.big,
              small: product.vehicle_info.suitcases.small,
            },
            group: product.vehicle_info.group,
            transmission: product.accessibility.transmission,
            doors: product.vehicle_info.door,
          },
          pricing_info: {
            price: product.pricing_info.price,
          },
        },
      }
    );
    // console.log(prodct)
    res.status(200).json("successfully updated");
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

exports.messageToAdmin = async (req, res) => {
  const body = req.body;
  try {
    const preUser = await admins.updateOne(
      { mobile: 123456 },
      {
        $push: {
          comments: {
            email: body.email,
            username: body.userName,
            message: body.comment,
          },
        },
      }
    );
    console.log(preUser);
    res.status(200).json('message successfully sent')
  } catch (error) {
    res.status(200).json(error);
  }
};

exports.getAdminMessages = async (req,res)=>{
  try {
    const message = await admins.findOne({ mobile: 123456 })
    res.status(200).json(message)
  } catch (error) {
    console.log(error)
    res.status(401).json(error);
  }
}
