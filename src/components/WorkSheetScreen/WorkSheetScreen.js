import { Button, Form, Modal } from 'antd'
import 'antd/dist/antd.min.css'
import React, { useState } from 'react'
import OverTime from '../../common/popup/OverTime/OverTime'
import './WorkSheetScreen.scss'

const WorkSheet = () => {
  const [isModalVisible, setIsModalVisible] = useState(true)
  const showModal = () => {
    setIsModalVisible(true)
  }
  const onFinish = (values) => {
    console.log(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
  }
  return (
    <>
      <div> WorkSheet </div>
      <Button style={{ marginTop: 20 }} type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Register OT"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(true)}
        onCancel={() => setIsModalVisible(false)}
        width="80%"
        okText="Register"
        okButtonProps={{ style: { marginRight: '20px' } }}
        className="modal_ot"
        cancelText="Cancel"
      >
        <OverTime />
        <>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={
              {
                // required: true,
                // reason: '',
              }
            }
            scrollToFirstError
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          ></Form>
        </>
      </Modal>
    </>
  )
}

export default WorkSheet
