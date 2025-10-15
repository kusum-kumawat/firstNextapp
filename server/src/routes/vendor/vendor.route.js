import { VendorSignup } from "../../controller/vendor/auth.js";
import router from "../router.js";

router.post("/signup", VendorSignup);

export default router;
