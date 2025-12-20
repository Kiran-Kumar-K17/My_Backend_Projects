import mongoose from "mongoose";
import { Schema } from "mongoose";
const FileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

export const File = mongoose.model("File", FileSchema);
