// import express
const express = require('express')

// import middleware
const middleware = require('../middleWare/routerSpecific')

// to create route using express
const router = new express.Router()

// import controller
const carsController = require('../controllers/carsController')

// user controller
const userController = require('../controllers/usersController')

// admin controller
const adminController = require('../controllers/adminsController')

// register rqst
router.post('/register',userController.register)

// router for login
router.post('/login',userController.login)

// route for getAllCars
router.get('/cars/all-cars',carsController.getAllCars)

// route for view product
router.get('/view-product/:id',middleware.logMiddleWare,carsController.viewProduct)

// add to wishlist
router.post('/add_wishlist',middleware.logMiddleWare,userController.addWishlist)

// router to get view_wishlist
router.get('/view_wishlist',middleware.logMiddleWare,userController.getWishlists)

// delete wishlist item
router.post('/remove-wishlist/:id',middleware.logMiddleWare,userController.removeWishItem)

// rent now
router.get('/rent-now/:id',middleware.logMiddleWare,carsController.cartView)

// add to cart
router.post('/add_to_cart',middleware.logMiddleWare,userController.addCart)

// -----------admin--------------
router.post('/admin_login',adminController.login)

// get users
router.get('/get-users',middleware.logMiddleWare,adminController.getUsers)

// admin-delete-the-user
router.delete('/admin-delete-the-user/:mobile',middleware.logMiddleWare,adminController.deleteUser)

// add new car
router.post('/add-new-car',middleware.logMiddleWare,adminController.addNewCar)

router.delete('/admin-delete-product/:id',middleware.logMiddleWare,adminController.deleteProduct)

// update car details
router.post('/update-car-details/:id',middleware.logMiddleWare,adminController.updateCarDetails)

// /message-to-admin
router.post('/message-to-admin',middleware.logMiddleWare,adminController.messageToAdmin)

// get message to admin
router.get('/get-message-admin',middleware.logMiddleWare,adminController.getAdminMessages)

// export router
module.exports = router 