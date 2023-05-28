import React, { useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Slider } from "@mui/material"
import { IUser } from '../../../interfaces/user.interface';
import { useDispatch } from 'react-redux';
import { updateAvatar } from '../../../actions/user.action';

export default function UploadAvatar({userData, setState, state}: {userData:IUser, setState:any, state:any}) {

  const dispatch:any = useDispatch();

  const [img, setImg] = useState("");
  const userImage = img;

  const picHandle = async (file:any) => {
    const data = new FormData();
    data.append('file', file);
    await dispatch(updateAvatar(data, userData._id));
    setState((state:any) => ({...state, avatarMode:false}));
    
    const win:Window = window;
    win.location = `/u/${userData.username}`;
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
    <div className='avatar-modal'>
      <div className="avatar-modal-container">
        <p className='close-icon' onClick={() => setState((state:any) => ({...state, avatarMode:false}))}>CLOSE</p>
        <div className="avatar-modal-content">
          <input type="file" onChange={(e:any) => setImg(URL.createObjectURL(e.target.files[0]))}/>
          <div className='cropping'>
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
                <div className="zoom">
                  <Slider 
                    value={zoom}
                    onChange={(e, newValue:any) => setZoom(newValue)}
                    min={1}
                    max={3}
                    step={0.00001}
                    valueLabelDisplay="on"
                  />
                </div>
              </div>
              <p onClick={() => showCroppedImage()} className="save-button">Save</p>
          </div>
        </div>
      </div>
    </div>    
  )
}
