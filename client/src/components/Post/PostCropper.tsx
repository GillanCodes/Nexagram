import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop';

export default function PostCropper({img, imageDisplay}: {img:any, imageDisplay:any}) {

  const userImage = img;

  const picHandle = async (file:any) => {
    imageDisplay("next", file);
  }

  const createImage = (url:string) =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', (error) => reject(error))
      image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
      image.src = url
    })

  const getRadianAngle = (degreeValue: any) => {
    return (degreeValue * Math.PI) / 180
  }

  const rotateSize = (width:number, height:number, rotation:number) => {
    const rotRad = getRadianAngle(rotation)
    return {
      width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
      height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    }
  }
      

  const getCroppedImg = async(
    imageSrc:string,
    pixelCrop:any,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ) => {
    const image:any = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
      
    if (!ctx) {
      return null
    }
    
      
        // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation
    )
      
        // set canvas size to match the bounding box
    canvas.width = bBoxWidth
    canvas.height = bBoxHeight
      
        // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
    ctx.translate(-image.width / 2, -image.height / 2)
      
        // draw rotated image
    ctx.drawImage(image, 0, 0)
      
        // croppedAreaPixels values are bounding box relative
        // extract the cropped image using these values
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    )
      
        // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
      
        // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0)

      
        // As a blob

    return new Promise((resolve, reject) => {
      canvas.toBlob((file:any) => {
        var final = new File([file], "pp.png", {type: 'image/png'});
        picHandle(file);
      }, 'image/jpeg')
    })
  }

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea:any, croppedAreaPixels:any) => {
      setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
        const croppedImage = await getCroppedImg(
            userImage,
            croppedAreaPixels,
            rotation
        )
    } catch (e) {
    console.error(e)
    }
  }, [croppedAreaPixels, rotation])
  
  
  return (
    <div className='post-creator-content'>
        <div className="buttons">
            {/* <p onClick={() => imageDisplay("prev")}>Prev</p> */}
            <p className='button next-button' onClick={() => showCroppedImage()}>Next</p>
        </div>
        <div className="cropping">
            <div className="crop-container">
                <div className="crop">
                    <Cropper
                        image={userImage}
                        crop={crop}
                        rotation={rotation}
                        zoom={zoom}
                        aspect={1/1}
                        onCropChange={setCrop}
                        onRotationChange={setRotation}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
            </div>
        </div>
    
    </div>
  )
}
