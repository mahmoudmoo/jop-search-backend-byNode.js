import cloudinary from 'cloudinary';
import { config } from 'dotenv'
import path from 'path'
config({ path: path.resolve('config/.env') })

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

export default cloudinary.v2