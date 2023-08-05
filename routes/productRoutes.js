import express from "express";
import formidable from "express-formidable";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController, productFiltersController, productCountController, productListController, productSearchController, relatedProductController, productCategoryController, braintreeTokenController, brainTreePaymentController} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router()

router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);

//routes
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//get filters
router.post("/product-filters", productFiltersController)

//total products count
router.get("/product-count", productCountController)

//product list per page
router.get("/product-list/:page", productListController)

router.get("/search/:keyword", productSearchController)

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);


export default router;