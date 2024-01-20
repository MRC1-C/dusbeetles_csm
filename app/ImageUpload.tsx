import React, { useState, useEffect } from 'react'
import { CldUploadWidget } from "next-cloudinary"
import { CloseOutlined, CloseSquareOutlined } from '@ant-design/icons'

type Props = {
    imageUrl: string
    setImageUrl: React.Dispatch<React.SetStateAction<string>>
}

const ImageUpload: React.FC<Props> = ({ imageUrl, setImageUrl }) => {
    const onupload = (result: any) => {
        const newImageUrl = result.info.secure_url
        setImageUrl(newImageUrl)
    }

    const handleDeleteImage = () => {
        setImageUrl('')
    }
    return (
        <div>
            {
                imageUrl == '' ?
                    <div>
                        <CldUploadWidget uploadPreset='new_preset' onUpload={onupload}>
                            {({ open }: any) => {
                                function handleOnclick() {
                                    open()
                                }
                                return (
                                    <div className='w-full flex justify-center items-center my-auto cursor-pointer aspect-video rounded-lg bg-gray-100 text-xl' onClick={handleOnclick}>
                                        Tải ảnh lên
                                    </div>
                                )
                            }}
                        </CldUploadWidget>
                    </div> :
                    <div>
                        <div className='relative w-full'>
                            <img src={imageUrl} className='w-full aspect-video object-cover object-top' />
                            <CloseOutlined  className='absolute text-sm p-1 rounded-lg right-3 top-3 bg-white' onClick={() => handleDeleteImage()}/>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ImageUpload