'use client'
import { useEffect, useState } from 'react';
import { Layout, MenuProps, Modal, message } from 'antd';
import { Menu } from 'antd';
import { header } from './constant/pageHeader';
import axios from 'axios';
import CategoryItems from './CategoryItems';
import ModelCategory from './ModelCategory';
import ProductItems from './ProductItems';
import ModelProduct from './ModelProduct';
const { Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];




const Home = () => {
  const items = header.map(h => ({ label: h.label[0], key: h.path }))
  const [select, setSelect] = useState<any>('home')
  const [category, setCategory] = useState<any>([])
  const [selectCategory, setSelectCategory] = useState<any>()
  const [product, setProduct] = useState<any>([])
  const [selectProduct, setSelectProduct] = useState<any>()
  const [reload, setReload] = useState(false)
  const [reloadP, setReloadP] = useState(false)


  const [openCategory, setOpenCategory] = useState(false)
  const [openProduct, setOpenProduct] = useState(false)

  const onOpenCategory = () => {
    setOpenCategory(true)
  }
  const closeOpenCategory = () => {
    setOpenCategory(false)
  }
  const onOpenProduct = () => {
    setOpenProduct(true)
  }
  const closeOpenProduct = () => {
    setOpenProduct(false)
  }

  const onDeleteCategory = async (id: any) => {
    axios.post('/api/category/delete', { id })
      .then((data: any) => {
        setSelectCategory(undefined)
        message.success("Xoá thành công")
        setReload(prev => !prev)
      })
      .catch(err => message.error("Xoá không thành công"))
  }

  const onDeleteProduct = async (id: any) => {
    axios.post('/api/product/delete', { id })
      .then((data: any) => {
        setSelectProduct(undefined)
        message.success("Xoá thành công")
        setReloadP(prev => !prev)
      })
      .catch(err => message.error("Xoá không thành công"))
  }

  useEffect(() => {
    axios.post('/api/category', {
      page: select
    })
      .then((data: any) => {
        setCategory(data.data)
        setSelectCategory(data.data[0]?.id)
      })
  }, [select])
  useEffect(() => {
    axios.post('/api/category', {
      page: select
    })
      .then((data: any) => {
        setCategory(data.data)
        setSelectCategory(data.data[data.data.length - 1]?.id)
      })
  }, [reload])
  useEffect(() => {
    if (selectCategory) {
      axios.post('/api/product', {
        category_id: selectCategory
      })
        .then(dataP => {
          setProduct(dataP.data)
          setSelectProduct(dataP.data[0]?.id)
        })
    }
    else {
      setProduct([])
    }
  }, [selectCategory])

  useEffect(() => {
    if (selectCategory) {
      axios.post('/api/product', {
        category_id: selectCategory
      })
        .then(dataP => {
          setProduct(dataP.data)
          setSelectProduct(dataP.data[dataP.data.length - 1]?.id)
        })
    }
    else {
      setProduct([])
    }
  }, [reloadP])
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        className='p-3'
        theme='light'
      >
        <div className='p-3 font-bold text-lg text-blue-900'>Dusbeetles</div>
        {
          items.map(i => (
            <div className={`p-3 rounded-lg cursor-pointer font-semibold ${select == i.key ? "bg-blue-900 text-white" : "text-blue-900"}`} onClick={() => setSelect(i.key)} key={i.key}>{i.label}</div>
          ))
        }
      </Sider>
      <Layout className="site-layout p-3 flex flex-col gap-3 h-screen overflow-auto" style={{ marginLeft: 200 }}>
        <div className='font-bold text-blue-900 text-xl pb-3'>
          {header.filter(h => h.path == select)[0].label[0]}
        </div>
        <div className='flex gap-3 flex-wrap'>
          {category.map((c: any) => <CategoryItems onDeleteCategory={onDeleteCategory} onOk={onOpenCategory} setSelectCategory={setSelectCategory} target={c.id == selectCategory} key={c.id} {...c} />)}
          <div className='p-3 rounded-lg text-sm cursor-pointer bg-gray-200' onClick={() => { setSelectCategory(undefined), onOpenCategory() }}>+ Thêm trường</div>
        </div>
        <div className='flex' onClick={() => { setSelectProduct(''), onOpenProduct() }}>
          <div className='ring-1 text-blue-900 cursor-pointer bg-gray-200 font-bold ring-blue-900 p-2 rounded-lg'>+ Thêm bài</div>
        </div>
        <div className='gap-3 flex-wrap grid grid-cols-6'>
          {product.map((c: any) => <ProductItems onDeleteProduct={onDeleteProduct} onOk={onOpenProduct} setSelectCategory={setSelectProduct} target={c.id == selectProduct} key={c.id} {...c} />)}
        </div>
      </Layout>
      <ModelCategory setReload={setReload} page={select} category={category.filter((c: any) => c.id == selectCategory)} open={openCategory} onOk={onOpenCategory} onCancel={closeOpenCategory} />
      <ModelProduct setReload={setReloadP} page={select} category_id={selectCategory} product={product.filter((c: any) => c.id == selectProduct)} open={openProduct} onOk={onOpenProduct} onCancel={closeOpenProduct} />

    </Layout>
  )
}

export default Home