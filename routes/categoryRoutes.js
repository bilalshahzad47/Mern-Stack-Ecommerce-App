import express from "express";
import { categoryControlller, createCategoryController, updateCategoryController, singleCategoryController, deleteCategoryCOntroller } from "../controllers/categoryController.js";
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryCOntroller
);
  
export default router;