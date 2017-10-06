require("dotenv").config()

const path = require("path")
const handlebars = require("express-handlebars")
const helmet = require("helmet")
const express = require("express")
const session = require("express-session")
const app = express()

app.use(helmet())

// initialize session
app.use(session({
	name: "ohaiSession",
	secret: process.env.EXPRESS_SECRET,
	resave: true,
	saveUninitialized: false,
	cookie: {
		secure: true,
		httpOnly: true,
		expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
	}
}))

// set access control
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "POST", "GET")
	res.header("Access-Control-Allow-Headers", "Content-Type")

	next()
})

// open public path to browser
app.use(express.static(path.join(__dirname, "public")))

// set view engine
app.set("view engine", path.join(__dirname, "views"))
app.engine("handlebars", handlebars())
app.set("view engine", "handlebars")


// -- ROUTES
const authentication = require(path.join(__dirname, "routes/authentication.js"))
app.use(["/authentication", "/"], authentication)
// -- END OF ROUTES


// start server
app.listen(process.env.PORT, (err) => {
	if (err) throw err

	console.log("Express server listening for http on port " + process.env.PORT)
})
