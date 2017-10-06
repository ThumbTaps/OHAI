const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) => {

	if (req.user) {
		res.render("dashboard")
	} else {
		res.render("login")
	}
})

module.exports = router
