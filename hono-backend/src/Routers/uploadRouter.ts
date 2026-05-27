import { Hono } from "hono";

import {
  updateImageController,
  uploadImageController,
} from "../controllers/upload.controller.js";

const uploadRouter = new Hono();

uploadRouter.post("/",  uploadImageController);
uploadRouter.post("/:id",  updateImageController);


export default uploadRouter;