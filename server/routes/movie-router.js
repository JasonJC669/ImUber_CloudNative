const express = require('express')

const PassengerCtrl = require('../controllers/passenger-ctrl')
const DriverCtrl = require('../controllers/driver-ctrl')
const router = express.Router()

router.post('/login/passenger', PassengerCtrl.addPassenger)
router.post('/login/driver', DriverCtrl.addDriver)
// router.put('/movie/:id', MovieCtrl.updateMovie)
// router.delete('/movie/:id', MovieCtrl.deleteMovie)
// router.get('/movie/:id', MovieCtrl.getMovieById)
// router.get('/movies', MovieCtrl.getMovies)

module.exports = router