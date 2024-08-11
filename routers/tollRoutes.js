const express = require ('express')
const {tollEntry, tollExit} = require ('../controllers/tollController')

const router = express.Router();

router.post('/entry', tollEntry)
router.post('/exit', tollExit)

module.exports = router;