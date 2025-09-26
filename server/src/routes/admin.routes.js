import express from "express";
import upload from "../lib/multer.js";
import {
  getContent,
  postContent,
  updateContent,
} from "../controllers/admin.controllers.js";

const router = express.Router();


router.get("/", getContent);


router.post(
  "/",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "heroImage", maxCount: 1 },
    { name: "aboutImage", maxCount: 1 },
  ]),
  postContent
);


router.put(
  "/:id",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "heroImage", maxCount: 1 },
    { name: "aboutImage", maxCount: 1 },
  ]),
  updateContent
);

export default router;
