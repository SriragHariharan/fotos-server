import mongoose from "mongoose";

const ImageModel = new mongoose.Schema({
  imageId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
});

// export default mongoose.model("Image", ImageModel);
export default ImageModel;