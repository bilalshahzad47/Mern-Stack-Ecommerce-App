import express from "express";
import {registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from './../middlewares/authMiddleware.js';
const router = express.Router()


router.post("/register", registerController)

router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController)

router.get("/test",requireSignIn, isAdmin ,testController)


//protected user routes auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ok: true});
})

//protected admin routes auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok: true});
})

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);
export default router;