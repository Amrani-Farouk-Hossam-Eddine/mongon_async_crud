const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Adim), usersController.getAllUsers);

router
  .route("/:id")
  .delete(verifyRoles(ROLES_LIST.Adim), usersController.deletUser);

module.exports = router;
