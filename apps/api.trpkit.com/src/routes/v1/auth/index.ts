import { Router } from "express";
import login from "./login";
import logout from "./logout";
import mfa from "./mfa";
import register from "./register";

const router = Router();

router.use(login);
router.use(logout);
router.use(mfa);
router.use(register);

export default router;
