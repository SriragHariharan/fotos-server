import { createAlbumController, getAlbumDetailsController, getAlbumsController, updateAlbumController } from "../controllers/albumController";
import authMiddleware from "../helpers/authMiddleware";
import { uploadMultipleFiles } from "../helpers/multer";

const albumRouter = require('express').Router();

//insert photos to album
albumRouter.post('/create', authMiddleware, uploadMultipleFiles, createAlbumController);

//get all albums of a specific user
albumRouter.get('/', authMiddleware, getAlbumsController);

//get album by albumID
albumRouter.get('/:albumID', authMiddleware, getAlbumDetailsController);

//update album by albumID
albumRouter.put('/:albumID', authMiddleware, updateAlbumController );

export default albumRouter;