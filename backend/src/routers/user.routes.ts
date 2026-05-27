import express from "express";

import { verifyJWT }
from "../middleware/auth.middleware";

import { getCurrentUser }
from "../controllers/user.controller";

const router = express.Router();

router.get(
  "/me",
  verifyJWT,
  getCurrentUser
);

export default router;