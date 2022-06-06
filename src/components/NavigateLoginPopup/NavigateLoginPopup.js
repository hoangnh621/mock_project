import { Button, Modal } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import XIcon from '../../common/XIcon/XIcon'

const NavigateLoginPopup = () => {
  const navigate = useNavigate()
  return (
    <Modal
      title="Login session expired. Please log in again."
      closeIcon={<XIcon />}
      footer={null}
    >
      <div>
        <Button className="primaryInput" onClick={() => navigate('/login')}>
          Ok
        </Button>
      </div>
    </Modal>
  )
}

export default NavigateLoginPopup
