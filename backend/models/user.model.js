import mongoose from "mongoose";
import bcrypt from "bcryptjs";
 const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
cardItems: [
    {
        quality:{type:Number,default:1},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }
}],
role: {
    type: String,enum:["customer","admin"],default:"customer"}},{timestamps: true})




userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    // Check if the password is already hashed
    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt);
    } catch (error) {
    return next(error);
  }

});

userSchema.methods.comparePassword = async function (Password) {
  try {
    return await bcrypt.compare(Password, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
}
const User = mongoose.model("User", userSchema);
export default User;