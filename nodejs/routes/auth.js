const express = require("express");
const router = express.Router();

const {
    adduser,
    display,
    remove,
    update,
    displaybyid,
    displayimg
} = require("../controllers/auth");

router.post("/adduser",  adduser);
router.get("/display", display);
router.delete("/remove/:_id", remove);
router.put("/update/:id",update);
router.get("/displaybyid/:id", displaybyid);
router.get("/displayimg/:id", displayimg);


module.exports = router;
