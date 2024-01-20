import { Button, Input, Modal, message } from 'antd'
import React, { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'
import axios from 'axios'

const ModelCategory = (props: any) => {
    const [imageUrl, setImageUrl] = useState('')
    const [language, setLanguage] = useState(0)
    const [loading, setLoading] = useState(false)

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
    useEffect(()=>{
        if(props.category.length >0){
            setName(props.category[0].name)
            setDescription(props.category[0].description)
            setImageUrl(props.category[0].url)
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
        }

    },[props])
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
        console.log(name, description)
        setLoading(true)
        if (props.category.length == 0) {
            axios.post('/api/category/admin', {
                name,
                description,
                url: imageUrl,
                page: props.page
            })
                .then(data => {
                    message.success("Tạo bài viết thành công")
                    props.onCancel()
                    props.setReload((prev: any) => !prev)
                })
                .catch(err => message.error("Tạo bài viết không thành công"))
                .finally(() => setLoading(false))
        }
        else{
            axios.patch('/api/category/admin', {
                ...props.category[0],
                name,
                description,
                url: imageUrl,
                page: props.page
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
        <Modal title={props.category.length == 0 ? "Thêm bài viết" : "Sửa bài viết"} open={props.open} onOk={onOk} footer={[<Button key="back">Huỷ</Button>, <Button loading={loading} onClick={onOk} type='primary' key="submit">Lưu</Button>]} onCancel={props.onCancel}>
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
            </div>
        </Modal>
    )
}

export default ModelCategory