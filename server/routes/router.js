const express = require("express");
const router = express.Router();
const controllerLogin = require("../controllers/login");
const controllerEmergencyRequests = require("../controllers/emergencyRequests");

router.get("/callback", controllerLogin.callbackCheck);
router.get("/login", controllerLogin.handleLoginRequest);
router.get(
  "/emergency-requests/all",
  controllerEmergencyRequests.getAllEmergencyRequests
);
router.get("/logout", controllerLogin.logoutUser);

router.post(
  "/delete-emergency-request",
  controllerEmergencyRequests.deleteEmergencyRequest
);
router.post("/anyuser", controllerLogin.getUserWithAccessToken);
router.post("/register-user", controllerLogin.registerUser);
router.post(
  "/post-emergency-request",
  controllerEmergencyRequests.postEmergencyRequest
);

module.exports = router;
