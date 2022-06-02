import { Button, Modal } from 'antd'
import 'antd/dist/antd.min.css'
import React, { useState } from 'react'
import OverTime from '../../common/popup/OverTime/OverTime'
import './WorkSheetScreen.scss'

const WorkSheet = () => {
  const [isModalVisible, setIsModalVisible] = useState(true)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <div> WorkSheet </div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Register OT"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="80%"
        okText="Register"
        okButtonProps={{ style: { marginRight: '20px' } }}
        className="modal_ot"
        cancelText="Cancel"
      >
        <OverTime />
      </Modal>
    </div>
  )
}

export default WorkSheet
