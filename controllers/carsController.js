// import cars collection/model
const products = require('../models/carSchema')

// logic to get all products
exports.getAllCars = async (req,res)=>{
    try {
        const getCars = await products.find()
        res.status(200).json(getCars)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.viewProduct = async (req,res)=>{
    const {id} = req.params
    const v_id= id
    try {
        const getProduct = await products.findOne({v_id})
        res.status(200).json(getProduct)
    } catch (error) {
        res.status(401).json(error)
    }
}



exports.cartView = async(req,res)=>{
    const { loginMobile } = req;
    const { id } = req.params;

    try {
        const car = await products.findOne({v_id:id})
        res.status(200).json(car)
    }  catch (error) {
        res.status(401).json(error);
    }

}
