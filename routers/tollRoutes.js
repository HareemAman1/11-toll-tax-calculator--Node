const express = require ('express')
const {tollEntry, tollExit, getEntries, getExits} = require ('../controllers/tollController')

const router = express.Router();

router.post('/entry', tollEntry)
router.post('/exit', tollExit)

module.exports = router;











// router.get('/entries', getEntries);  
// router.get('/exits', getExits);