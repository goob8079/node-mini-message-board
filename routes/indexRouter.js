const { Router } = require("express");
const messagesController = require("../controller/messagesController");

const router = express.Router();

router.get('/', messagesController.messageHomepageGet);
router.get('/new', messagesController.newMessageGet);
router.post('/new', messagesController.newMessagePost);
router.get('/message/:username', messagesController.messagesByUsernameGet);

module.exports = router;