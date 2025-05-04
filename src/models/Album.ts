import mongoose from "mongoose";
import ImageModel from "./Image";

const AlbumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    images: [ImageModel],
}, { timestamps: true });

export default mongoose.model("Album", AlbumSchema);