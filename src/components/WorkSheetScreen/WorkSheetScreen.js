import { Button, Form, Modal } from 'antd'
import 'antd/dist/antd.min.css'
import React, { useState } from 'react'
import RegisterOverTime from './RegisterOverTime/RegisterOverTime'
import './WorkSheetScreen.scss'

const WorkSheetScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(true)
  const showModal = () => {
    setIsModalVisible(true)
  }
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
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
        // onOk={() => setIsModalVisible(false)}
        // onCancel={() => setIsModalVisible(false)}
        width="80%"
        className="modal_ot"
        footer={null}
      >
        <RegisterOverTime />
        <>
          <Form
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="btn-register">
              <Form.Item wrapperCol={{ offset: 9, span: 12 }}>
                <Button className="primary-button" htmlType="submit">
                  Update
                </Button>
                <Button
                  onClick={() => setIsModalVisible(false)}
                  className="outline-primary-button "
                >
                  {/* {' '} */}
                  Cancel
                </Button>
              </Form.Item>
            </div>
          </Form>
        </>
      </Modal>
    </>
  )
}

export default WorkSheetScreen
