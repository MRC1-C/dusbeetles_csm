import React from 'react'
import { Dropdown, MenuProps, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


const CategoryItems = (props: any) => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div onClick={()=> props.onOk()} className='flex gap-3 cursor-pointer text-blue-900 font-medium'>
                    <EditOutlined />
                    Đổi tên
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div onClick={async() => await props.onDeleteCategory(props.id)} className='flex gap-3 cursor-pointer text-red-600 font-medium'>
                    <DeleteOutlined />
                    Xoá
                </div>
            ),
        }
    ];
    return (
        <Dropdown menu={{ items }} trigger={['contextMenu']}>
            <div onClick={() => props.setSelectCategory(props.id)} className={`p-3 rounded-lg text-sm cursor-pointer ${props.target ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}>
                {props.name[0].name}
            </div>
        </Dropdown>
    )
}

export default CategoryItems