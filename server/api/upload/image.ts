import { uploadImage } from '../../utils/cloudinary'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw createError({
        statusCode: 400,
        message: 'No file uploaded'
      })
    }

    const file = formData[0]
    if (!file || !file.data) {
      throw createError({
        statusCode: 400,
        message: 'Invalid file data'
      })
    }

    // Convert buffer to base64
    const base64Data = file.data.toString('base64')
    const dataURI = `data:${file.type};base64,${base64Data}`

    // Upload to Cloudinary
    const result = await uploadImage(dataURI)

    return {
      url: result.secure_url,
      public_id: result.public_id
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message
    })
  }
}) 