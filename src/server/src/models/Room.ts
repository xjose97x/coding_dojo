import mongoose from "mongoose";
import { UserModel } from "./User";

export type RoomModel = mongoose.Document & {
  creator: UserModel,
  name: string,
  members: UserModel[]
};

const roomSchema = new mongoose.Schema({
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  name: { type: String, unique: true },
  members: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);
export default Room;
