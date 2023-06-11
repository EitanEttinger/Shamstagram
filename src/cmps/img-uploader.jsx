import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null }) {

  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url)
    // onUploaded && createCanvas(secure_url)
  }

//   function createCanvas(imgUrl) {
//     gElCanvas = document.querySelector('canvas')
//     gCtx = gElCanvas.getContext('2d')
//     gElCanvas.width = 400
//     gElCanvas.height = 400
//     onImgInput(imgUrl)
//   }

//   function onImgInput(ev) {
//     loadImageFromInput(ev, renderImg)
// }

// // CallBack func will run on success load of the img
// function loadImageFromInput(ev, onImageReady) {
//     // After we read the file
//         let img = new Image() // Create a new html img element
//         img.src = ev // Set the img src to the img file we read
//         // Run the callBack func, To render the img on the canvas
//         img.onload = onImageReady.bind(null, img)
//         // Can also do it this way:
//         // img.onload = () => onImageReady(img)
//     }
//     // reader.readAsDataURL(ev.target.files[0]) // Read the file we picked

// function renderImg(img) {
//     // Draw the img on the canvas
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
// }

  return (
    // <div className='create-post'>
      <div className="upload-preview">
        <label className='story-edit-label' htmlFor="imgUpload">Select from computer</label>
        <input type="file" onClick={event => event.target.value = null} onChange={uploadImg} accept="img/*" id="imgUpload" style={{ display: 'none' }} />
      </div>
      /* <div className='edit-post'>
        <div className="canvas-container">
          <canvas width="400" height="400"></canvas>
        </div>
      </div> */
    // </div>
  )
}
