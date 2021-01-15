import React from 'react'
import {useEffect, useState} from 'react'
import Head from 'next/head'
import DefaultLayout from '../components/Layouts/DefaultLayout'
import { Layout } from 'antd';
import { Table, Space, Row, Col, Button, Modal, Form, Input } from 'antd';
const { Header, Content} = Layout;

import ProductService from '../services/ProductService'

const Product = () => {

  const [form] = Form.useForm()

  // ตัวแปรไว้ร้บค่าจากฟอร์ม
  const productFormData = {
    product_name: "",
    product_barcode: "",
    product_price: "",
    product_qty: "",
    product_image: "",
    product_detail: ""
  }

  const [product, setProduct] = useState(productFormData)

  const handleInputChange = (event) => {
    const {name, value} = event.target
    setProduct({...product, [name]:value})
  }

  const onSubmitProduct = () => {
    let data = {
      product_name: product.product_name,
      product_barcode: product.product_barcode,
      product_price: product.product_price,
      product_qty: product.product_qty,
      product_image: product.product_image,
      product_detail: product.product_detail
    }
    console.log(data)
    // ส่งข้อมูลเข้า API
    ProductService.addNewProduct(data).then(response => {
      console.log(response.data)
      setIsModalVisible(false) // close modal
      // Fetch product again
      ProductService.getAllProduct().then(res => {
        setProductData(res)
        form.setFieldsValue(productFormData)
      })
    }).catch(e=>{
      console.log(e)
    })
  }

  // Method การลบข้อมูล
  const deleteProduct = (obj) => {
    console.log(obj.id)
    const status = confirm("Confirmed Delete ?")
    if(status){
      ProductService.deleteProduct(obj.id).then(res=>{
        console.log(res)
        // Fetch product again
        ProductService.getAllProduct().then(res => {
          setProductData(res)
        })
      })
    }
  }
  

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // setIsModalVisible(false);
    onSubmitProduct()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [productData, setProductData] = useState([])

  useEffect(() => {
    ProductService.getAllProduct().then(res => {
      setProductData(res)
    })
  },[])

  // console.log(productData.data)


  const columns = [
    {
      title: 'Image',
      dataIndex: 'product_image',
      key: 'Image',
      render: text => <img src={text} height="20" />
    },
    {
      title: 'Name',
      dataIndex: 'product_name',
      key: 'Name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Barcode',
      dataIndex: 'product_barcode',
      key: 'Barcode',
    },
    {
      title: 'Price',
      dataIndex: 'product_price',
      key: 'Price',
    },
    {
      title: 'Qty',
      dataIndex: 'product_qty',
      key: 'Qty'
    },
    {
      title: 'Action',
      key: 'action',
      render: (obj) => (
        <Space size="middle">
          <a>Edit</a>
          <a onClick={()=>deleteProduct(obj)}>Delete</a>
        </Space>
      ),
    },
  ]


  return (
    
    <DefaultLayout>
      <Head>
        <title>Product</title>
      </Head>

      <Header className="site-layout-background">
        <Row>
          <Col span={12}>Produt List</Col>
          <Col span={12} style={{textAlign:"right"}}><Button type="primary" onClick={showModal}>Add</Button></Col>
        </Row>
      </Header>

      <Content className="site-layout-background layout-content">
        <Table columns={columns} dataSource={productData.data} rowKey={(data)=>data.id} />
        <Modal title="Add new product" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>
        ]}
        >
        <Form
          form={form}
          {...layout}
          name="addproduct"
          initialValues={product}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >

          <Form.Item
            label="Product name"
            name="product_name"
            rules={[
              {
                required: true,
                message: 'Please input product name!',
              },
            ]}
          >
            <Input onChange={handleInputChange} name="product_name" />
          </Form.Item>

          <Form.Item
            label="Product barcode"
            name="product_barcode"
            rules={[
              {
                required: true,
                message: 'Please input product barcode!',
              },
            ]}
          >
            <Input onChange={handleInputChange} name="product_barcode" />
          </Form.Item>

          <Form.Item
            label="Product price"
            name="product_price"
            rules={[
              {
                required: true,
                message: 'Please input product price!',
              },
            ]}
          >
            <Input onChange={handleInputChange} name="product_price" />
          </Form.Item>

          <Form.Item
            label="Product qty"
            name="product_qty"
            rules={[
              {
                required: true,
                message: 'Please input product qty!',
              },
            ]}
          >
            <Input onChange={handleInputChange} name="product_qty" />
          </Form.Item>

          <Form.Item
            label="Product detail"
            name="product_detail"
            rules={[
              {
                required: true,
                message: 'Please input product detail!',
              },
            ]}
          >
            <Input.TextArea onChange={handleInputChange} name="product_detail" />
          </Form.Item>

          <Form.Item
            label="Product image"
            name="product_image"
            rules={[
              {
                required: true,
                message: 'Please input product image!',
              },
            ]}
          >
            <Input onChange={handleInputChange} name="product_image" />
          </Form.Item>

        </Form>
      </Modal>
      </Content>

    </DefaultLayout>
  )
}

export default Product
