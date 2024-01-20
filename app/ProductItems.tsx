import React from 'react'
import { Dropdown, Image, MenuProps, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


const ProductItems = (props: any) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={() => props.onOk()} className='flex gap-3 text-blue-900 font-medium'>
          <EditOutlined />
          Đổi tên
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={async() => await props.onDeleteProduct(props.id)} className='flex gap-3 cursor-pointer text-red-600 font-medium'>
          <DeleteOutlined />
          Xoá
        </div>
      ),
    }
  ];
  return (
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      <div onClick={() => props.setSelectCategory(props.id)} className={`p-3 w-full flex flex-col gap-3 aspect-video rounded-lg text-sm cursor-pointer ${props.target ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}>
        <div className='font-semibold'>
          {props.name[0].name}
        </div> 
        <Image className='rounded-lg' src={props.url}/>
        <div>
          {props.description[0].des}
        </div>
      </div>
    </Dropdown>
  )
}

export default ProductItems