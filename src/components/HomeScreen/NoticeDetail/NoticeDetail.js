import { Col, Modal, Row } from 'antd'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import XIcon from '../../../common/XIcon/XIcon'
import { getNoticeDetailState } from '../../../store/reducer/homeSlice'

const NoticeDetail = ({ toggleModal, setToggleModal }) => {
  const handleCancel = () => {
    setToggleModal(false)
  }
  const noticeDetail = useSelector(getNoticeDetailState)
  const { detail, toDepartment, publishedDate } = noticeDetail
  const notice_detail = detail?.notice_detail

  return (
    <Modal
      title="Notice Detail"
      visible={toggleModal}
      closeIcon={<XIcon />}
      onCancel={handleCancel}
      footer={null}
    >
      <Row>
        <Col span={12}>
          <h3>Author</h3>
          <p>
            Name: <strong>{notice_detail?.author?.full_name}</strong>
          </p>
          <p>
            Email: <strong>{notice_detail?.author?.email}</strong>
          </p>
          <p>
            Other email: <strong>{notice_detail?.author?.other_email}</strong>
          </p>
          <p>
            Phone: <strong>{notice_detail?.author?.phone}</strong>
          </p>
        </Col>
        <Col span={12}>
          <h3>To Department</h3>
          <p>
            To department: <strong>{toDepartment}</strong>
          </p>
          <p>
            Published date: <strong>{publishedDate}</strong>
          </p>
        </Col>
      </Row>
      <hr />
      <h3>Detail</h3>
      <p>
        Subject: <strong>{notice_detail?.subject}</strong>
      </p>
      <p>Attachment: {notice_detail?.attachment}</p>
      <p>Message: {notice_detail?.message}</p>
    </Modal>
  )
}

NoticeDetail.propTypes = {
  toggleModal: PropTypes.bool,
  setToggleModal: PropTypes.func,
}

export default NoticeDetail
