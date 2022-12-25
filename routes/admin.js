const { Router } = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  createAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin");

const router = Router();

router.route("/users").get(getAllUsers).post(createUser);
router.route("/users/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/admins").get(getAllAdmins).post(createAdmin);
router
  .route("/admins/:id")
  .get(getAdmin)
  .patch(updateAdmin)
  .delete(deleteAdmin);

module.exports = router;
