import { model, models, Schema } from "mongoose";

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},{ timestamps: true });

const Admin = models.Admin || model("Admin", adminSchema);

export default Admin;