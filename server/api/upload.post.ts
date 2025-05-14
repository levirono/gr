import { v2 as cloudinary } from 'cloudinary'
import { readMultipartFormData, createError } from 'h3'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw createError({
        statusCode: 400,
        message: 'No file uploaded'
      })
    }

    const file = formData.find(item => item.name === 'file')
    if (!file || !file.data || !file.type) {
      throw createError({
        statusCode: 400,
        message: 'No valid file found in form data'
      })
    }

    // Convert buffer to base64 string
    const base64String = `data:${file.type};base64,${file.data.toString('base64')}`

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64String, {
      folder: 'dnbo8icrp',
    })

    return {
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id
    }

  } catch (error: any) {
    console.error('Upload error:', error)
    throw createError({
      statusCode: 500,
      message: 'Upload failed'
    })
  }
})
