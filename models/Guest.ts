import { model, models, Schema } from "mongoose";

const guestSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  emailSent: { type: Boolean, default: false },
}, { timestamps: true });

const Guest = models.Guest || model("Guest", guestSchema);

export default Guest;