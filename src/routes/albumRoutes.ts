import { createAlbumController } from "../controllers/albumController";
import authMiddleware from "../helpers/authMiddleware";
import { uploadMultipleFiles } from "../helpers/multer";

const albumRouter = require('express').Router();

//insert photos to album
albumRouter.post('/create', authMiddleware, uploadMultipleFiles, createAlbumController);

export default albumRouter;