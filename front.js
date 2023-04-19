require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()

// app.use("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Content-Type", "application/json");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });

const shrinkRay = require('shrink-ray-current')
app.use(shrinkRay())
app.use('/static', express.static(path.join(__dirname, 'build', 'static'), { maxAge: 31536000 }))
app.use(express.static(path.join(__dirname, 'build')))
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.listen(process.env.SERVER_PORT, async () => {
	console.log(`Server started on port ${process.env.SERVER_PORT}`)
})
