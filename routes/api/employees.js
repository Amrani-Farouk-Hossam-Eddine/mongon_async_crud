const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Adim, ROLES_LIST.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Adim, ROLES_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Adim), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
