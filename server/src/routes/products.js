import {
  getAll,
  AddProduct,
  AddCategory,
  GetCategory,
} from "../controller/products.js";
import { upload } from "../middlewares/multer.js";
import roleGuard from "../middlewares/role.middlware.js";
import router from "./router.js";

router.get("/", getAll);
router.post("/", roleGuard("admin"), upload.single("imageUrl"), AddProduct);
router.post("/categories", AddCategory);
router.get("/categories", GetCategory);

export default router;
