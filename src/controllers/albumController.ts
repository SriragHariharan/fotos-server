import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import fs from 'fs/promises';
import cloudinary from '../helpers/cloudinary';
import Album from '../models/Album';

export const createAlbumController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as Express.Multer.File[];
    const titles = req.body.title;
    const albumName = req.body.albumName;

    // Check if the number of files and titles match
    if (files.length !== (Array.isArray(titles) ? titles.length : 1)) {
      return next(createHttpError(400, 'Number of files and titles do not match'));
    }

    // Upload files to Cloudinary
    const imageLinks = await Promise.all(files.map(async (file, index) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: `fotos/${req.body.albumName}-${req.user?.userID}}`
      });

      // Delete the file from the local storage
      await fs.unlink(file.path);

      //generate custom imageID for each image
      const customImageId = uuidv4();

      return { url: result.secure_url, title: Array.isArray(titles) ? titles[index] : titles, imageID: customImageId };
    }));

    //Find or create album
    const existingAlbum = await Album.findOne({ user: req.user?.userID, name: albumName });
    if (!existingAlbum) {
      const album = new Album({ name: albumName, user: req.user?.userID, images: [] });
      await album.save();
    }

    // Update album with new images
    await Album.updateOne(
        { user: req.user?.userID, name: albumName },
        {
            $push: {
                images: { $each: imageLinks },
            },
        },
    );

    res.status(201).json({ success: true, message: 'Album created successfully' });
  } catch (error) {
    next(error);
  }
};

//get all albums of a specific user
export const getAlbumsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const albums = await Album.find({ user: req.user?.userID })
            .select({ name: 1, images: { $slice: 3 } });
        res.status(200).json({ success: true, message: 'Albums fetched successfully', data: { albums } });
    } catch (error) {
        next(error);
    }
}

//get album by albumID
export const getAlbumDetailsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const album = await Album.findOne({_id:req.params.albumID, user: req.user?.userID });
        res.status(200).json({ success: true, message: 'Album fetched successfully', data: { album } });
    } catch (error) {
        next(error);
    }
}

//update album by albumID
export const updateAlbumController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Album.updateOne({ _id: req.params.albumID, user: req.user?.userID }, { $set: { images: req.body.images } });
        res.status(200).json({ success: true, message: 'Album updated successfully' });
    } catch (error) {
        next(error);
    }
}