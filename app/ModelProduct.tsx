import { Button, Input, InputNumber, Modal, message } from 'antd'
import React, { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'
import axios from 'axios'
import ImageUploadProduct from './ImageUploadProduct'

const ModelProduct = (props: any) => {
    const [imageUrl, setImageUrl] = useState('')
    const [language, setLanguage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState<Array<any>>([])
    const [price, setPrice] = useState(0)
    const [name, setName] = useState([{
        name: '',
        language: 'vn'
    },
    {
        name: '',
        language: 'en'
    }
    ])

    const [description, setDescription] = useState([{
        des: '',
        language: 'vn'
    },
    {
        des: '',
        language: 'en'
    }
    ])

    const addImageName = (index: number) => {
        let n_ = [...images]
        n_[index].name = [{
            name: '',
            language: 'vn'
        },
        {
            name: '',
            language: 'en'
        }
        ]
        setImages(n_)
    }
    const addImageDes = (index: number) => {
        let n_ = [...images]
        n_[index].description = [{
            des: '',
            language: 'vn'
        },
        {
            des: '',
            language: 'en'
        }
        ]
        setImages(n_)
    }
    const addImageUrl = (index: number) => {
        let n_ = [...images]
        n_[index].url = ''
        setImages(n_)
    }
    const setImageName = (index: number, value: any) => {
        let n_ = [...images]
        n_[index].name[language].name = value
        setImages(n_)
    }
    const setImageDes = (index: number, value: any) => {
        let n_ = [...images]
        n_[index].description[language].des = value
        setImages(n_)
    }
    const _setImageUrl = (index: number, value: any) => {
        let n_ = [...images]
        n_[index].url = value
        setImages(n_)
    }

    useEffect(() => {
        if (props.product.length > 0) {
            setName(props.product[0].name)
            setDescription(props.product[0].description)
            setImageUrl(props.product[0].url)
            setImages(props.product[0].images)
        }
        else {
            setName([{
                name: '',
                language: 'vn'
            },
            {
                name: '',
                language: 'en'
            }
            ])
            setDescription([{
                des: '',
                language: 'vn'
            },
            {
                des: '',
                language: 'en'
            }
            ])
            setImageUrl('')
            setImages([])
            setPrice(0)
        }

    }, [props])
    const onChangeName = (e: any) => {
        let n_ = [...name]
        n_[language].name = e.target.value
        setName(n_)
    }

    const onChangeDes = (e: any) => {
        let n_ = [...description]
        n_[language].des = e.target.value
        setDescription(n_)
    }

    const onOk = () => {
        setLoading(true)
        if (props.product.length == 0) {
            axios.post('/api/product/admin', {
                name,
                description,
                url: imageUrl,
                images,
                category_id: props.category_id,
                price
            })
                .then(data => {
                    message.success("Tạo bài viết thành công")
                    props.onCancel()
                    props.setReload((prev:any) => !prev)
                })
                .catch(err => message.error("Tạo bài viết không thành công"))
                .finally(() => setLoading(false))
        }
        else {
            axios.patch('/api/product/admin', {
                ...props.product[0],
                name,
                description,
                url: imageUrl,
                images
            })
                .then(data => {
                    message.success("Sửa bài viết thành công")
                    props.onCancel()
                    props.setReload((prev: any) => !prev)
                })
                .catch(err => message.error("Sửa bài viết không thành công"))
                .finally(() => setLoading(false))
        }
    }

    return (
        <Modal width={'60%'} title={props.product.length == 0 ? "Thêm bài viết" : "Sửa bài viết"} open={props.open} onOk={onOk} footer={[<Button key="back">Huỷ</Button>, <Button loading={loading} onClick={onOk} type='primary' key="submit">Lưu</Button>]} onCancel={props.onCancel}>
            <div className='h-[70vh] overflow-auto flex-col gap-3 flex'>
                <div className='flex w-full gap-3 py-3'>
                    <div onClick={() => setLanguage(0)} className={`w-full rounded-lg flex justify-center ${language == 0 ? 'bg-blue-900 text-white' : 'bg-gray-100'} p-2 cursor-pointer`}>Tiếng việt</div>
                    <div onClick={() => setLanguage(1)} className={`w-full rounded-lg flex justify-center ${language == 1 ? 'bg-blue-900 text-white' : 'bg-gray-100'} p-2 cursor-pointer`}>Tiếng anh</div>
                </div>
                <div className='flex flex-col gap-3'>
                    <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
                    <div>Tiêu đề</div>
                    <Input value={name[language].name} onChange={onChangeName} placeholder='Nội dung' />
                    <div>Nội dung</div>
                    <Input.TextArea value={description[language].des} onChange={onChangeDes} placeholder='Nội dung' />
                    {
                        props.page == 'products' && <div>
                            <div>Giá</div>
                            <InputNumber value={price} onChange={(e: any) => setPrice(e)} placeholder='Nhập giá' />
                        </div>
                    }
                </div>
                <div className='flex flex-col gap-3'>
                    {
                        images.map((value: any, index: any) => {
                            return (
                                <div key={index} className='w-full flex flex-col gap-3'>
                                    {
                                        value.url != undefined && <ImageUploadProduct index={index} imageUrl={value.url} setImageUrl={_setImageUrl} />
                                    }
                                    {
                                        value.name && <div>
                                            <div>Tiêu đề</div>
                                            <Input value={value?.name[language]?.name} onChange={e => setImageName(index, e.target.value)} placeholder='Nội dung' /></div>}
                                    {value.description && <div>
                                        <div>Nội dung</div>
                                        <Input.TextArea value={value?.description[language]?.des} onChange={(e) => setImageDes(index, e.target.value)} placeholder='Nội dung' /></div>}
                                    <div className='flex gap-3'>
                                        {
                                            value.url == undefined && <div onClick={() => addImageUrl(index)} className='p-3 rounded-lg text-sm cursor-pointer bg-gray-200'>+ Thêm ảnh</div>
                                        }
                                        {
                                            !value.name && <div onClick={() => addImageName(index)} className='p-3 rounded-lg text-sm cursor-pointer bg-gray-200'>+ Thêm tiêu đề</div>
                                        }
                                        {
                                            !value.description && <div onClick={() => addImageDes(index)} className='p-3 rounded-lg text-sm cursor-pointer bg-gray-200'>+ Thêm nội dung</div>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className='flex' onClick={() => setImages((prev: any) => [...prev, {}])}>
                    <div className='p-3 rounded-lg text-sm cursor-pointer bg-gray-200'>+ Thêm</div>
                </div>
            </div>
        </Modal>
    )
}

export default ModelProduct