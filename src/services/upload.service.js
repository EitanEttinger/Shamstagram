export const uploadService = {
  uploadImg
}
async function uploadImg(ev) {
<<<<<<< HEAD
  const CLOUD_NAME = "djmodbzda"
  const UPLOAD_PRESET = "uk2pdxib"
=======
  const CLOUD_NAME = "da4jbot3j"
  const UPLOAD_PRESET = "j465zww4"
>>>>>>> f75fb6adae90f5b255506aa2e4529054a06bb894
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    const imgUrl = await res.json()
    return imgUrl
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}

