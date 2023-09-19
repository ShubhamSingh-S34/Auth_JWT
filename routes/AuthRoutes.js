const { Router } = require("express")
const router = Router();
const authControllers = require('../controllers/authControllers')


router.get("/signup", authControllers.sign_up_get)
router.post("/signup", authControllers.sign_up_post)
router.get("/login", authControllers.login_get)
router.post("/login", authControllers.login_post)
router.get("/logout", authControllers.logout_get)



module.exports = router;