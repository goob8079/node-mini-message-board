const { Router } = require("express");
const messagesController = require("../controller/messagesController");

const router = Router();

router.get('/', messagesController.messageHomepageGet);
router.get('/new', messagesController.newMessageGet);
router.post('/new', messagesController.newMessagePost);
router.get('/message', messagesController.messagesByUsernameGet);

module.exports = router;