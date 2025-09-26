import mongoose, { Schema } from 'mongoose'

const imageSchema = new Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true }
});

const webContentSchema = new Schema({
  logo: imageSchema,
  heroImage: imageSchema,
  aboutImage: imageSchema,
  tagline: { type: String, required: true },
  subTagline: { type: String, required: true },
  supportEmail: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  phoneNo: {
    type: String,
    required: true,
    match: [/^\+?[0-9]{7,15}$/, 'Invalid phone number']
  },
  address: { type: String, required: true },
  facebook: { type: String, default: '' },
  twitter: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  instagram: { type: String, default: '' }
}, { timestamps: true });

const WebContent =
  mongoose.models.WebContent || mongoose.model('WebContent', webContentSchema);

export default WebContent;
