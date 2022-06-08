import { Modal } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import XIcon from '../../../common/XIcon/XIcon'

const NoticeDetail = ({ toggleModal, setToggleModal }) => {
  const handleCancel = () => {
    setToggleModal(false)
  }

  return (
    <Modal
      title="Notice Detail"
      visible={toggleModal}
      closeIcon={<XIcon />}
      onCancel={handleCancel}
      footer={null}
    >
      <p>hello</p>
    </Modal>
  )
}

NoticeDetail.propTypes = {
  toggleModal: PropTypes.bool,
  setToggleModal: PropTypes.func,
}

export default NoticeDetail
