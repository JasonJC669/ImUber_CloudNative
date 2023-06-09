const express = require('express')

const PassengerCtrl = require('../controllers/passenger-ctrl')
const DriverCtrl = require('../controllers/driver-ctrl')
const GroupCtrl = require('../controllers/group-ctrl')
const router = express.Router()

router.post('/login/passenger', PassengerCtrl.addPassenger)
router.post('/login/driver', DriverCtrl.addDriver)
// router.post('/login/driver', GroupCtrl.createGroup)
// router.post('/login/driver', GroupCtrl.joinGroup)
// router.post('/login/driver', GroupCtrl.getNearGroups)
// router.post('/login/driver', GroupCtrl.passengerGetGroup)

router.post('/group/getNear', GroupCtrl.getNearGroups)
router.post('/group/creat', GroupCtrl.createGroup)
router.post('/group/get', GroupCtrl.getGroup)
router.post('/group/join', GroupCtrl.joinGroup)
router.post('/group/passengerGet', GroupCtrl.passengerGetGroup)


module.exports = router