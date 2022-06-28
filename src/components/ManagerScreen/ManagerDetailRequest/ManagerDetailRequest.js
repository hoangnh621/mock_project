import {
  ClockCircleTwoTone,
  InfoCircleTwoTone,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Col, Input, message, Modal, Row, Tooltip } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import XIcon from '../../../common/XIcon/XIcon'
import {
  getManagerDetail,
  getManagerDetailState,
} from '../../../store/reducer/managerDetailSlice'
import { confirmManager } from '../../../store/reducer/managerSlice'
import './ManagerDetailRequest.scss'

const ManagerDetailRequest = ({ currentRow, toggle, setToggle }) => {
  const dispatch = useDispatch()
  const requestDetail = useSelector(getManagerDetailState)
  const [textAreaValue, setTextAreaValue] = useState('')

  useEffect(() => {
    dispatch(getManagerDetail(currentRow.id))
  }, [currentRow.id, dispatch])

  const onCancel = () => {
    setToggle(false)
  }

  const handleSubmit = (type) => {
    if (!textAreaValue) {
      message.warning('Please input your comment!')
    } else if (type === 'confirm') {
      dispatch(
        confirmManager({
          id: currentRow.id,
          comment: textAreaValue,
          status: 1,
        }),
      )
      onCancel()
    } else {
      dispatch(
        confirmManager({
          id: currentRow.id,
          comment: textAreaValue,
          status: -1,
        }),
      )
      onCancel()
    }
  }

  return (
    <Modal
      visible={toggle}
      onCancel={onCancel}
      title="Request Details"
      width="60%"
      closeIcon={<XIcon />}
      className="modal-request-details"
      footer={false}
    >
      <Row>
        <Col span="4">
          <p>
            <UserOutlined style={{ color: '#7367f0', marginRight: 5 }} />
            Name:
          </p>
        </Col>
        <Col span="6" className="name-detail">
          <Tooltip title={currentRow.name}>
            <strong>{currentRow.name}</strong>
          </Tooltip>
        </Col>
        <Col span="4">
          <p>
            <InfoCircleTwoTone
              twoToneColor="#7367f0"
              style={{ marginRight: 5 }}
            />
            Request type:
          </p>
        </Col>
        <Col span="6">
          <strong>{currentRow.requestType}</strong>
        </Col>
      </Row>
      <Row>
        <Col span="4">
          <p>
            <UsergroupAddOutlined
              style={{ color: '#7367f0', marginRight: 5 }}
            />
            Division:
          </p>
        </Col>
        <Col span="6">
          <strong>{currentRow.division}</strong>
        </Col>
        <Col span="4">
          <p>
            <ClockCircleTwoTone
              twoToneColor="#7367f0"
              style={{ marginRight: 5 }}
            />
            Created at:
          </p>
        </Col>
        <Col span="6">
          <strong>{currentRow.createdAt}</strong>
        </Col>
      </Row>
      <Row>
        <Col span="4">
          <p>
            {' '}
            <ClockCircleTwoTone
              twoToneColor="#7367f0"
              style={{ marginRight: 5 }}
            />
            For date:
          </p>
        </Col>
        <Col span="6">
          <strong>
            {moment(requestDetail.request_for_date).format('DD-MM-YYYY')}
          </strong>
        </Col>
        <Col span="4">
          <p>
            {' '}
            <InfoCircleTwoTone
              twoToneColor="#7367f0"
              style={{ marginRight: 5 }}
            />
            Reason:
          </p>
        </Col>
        <Col span="6" className="reason-detail">
          <Tooltip title={currentRow.reason}>
            <strong>{currentRow.reason}</strong>
          </Tooltip>
        </Col>
      </Row>
      <Row>
        <Col span="4">
          <p>
            {' '}
            <ClockCircleTwoTone
              twoToneColor="#7367f0"
              style={{ marginRight: 5 }}
            />
            Check-in:
          </p>
        </Col>
        <Col span="6">
          <strong>{moment(requestDetail.checkin).format('HH:mm')}</strong>
        </Col>
        <Col span="4">
          <p>
            {' '}
            <ClockCircleTwoTone
              twoToneColor="#7367f0"
              style={{ marginRight: 5 }}
            />
            Check-out:
          </p>
        </Col>
        <Col span="6">
          <strong>{moment(requestDetail.checkout).format('HH:mm')}</strong>
        </Col>
      </Row>
      {requestDetail.request_type === 5 && (
        <Row>
          <Col span="4">
            {' '}
            <ClockCircleTwoTone
              twoToneColor="#7367f0"
              style={{ marginRight: 5 }}
            />
            Over Time:
          </Col>
          <Col span="6">
            <strong>{requestDetail.request_ot_time}</strong>
          </Col>
          <Col span="4">
            {' '}
            <ClockCircleTwoTone
              twoToneColor="#7367f0"
              style={{ marginRight: 5 }}
            />
            Actual time:
          </Col>
          <Col span="6">
            <strong>{requestDetail.actual_over_time}</strong>
          </Col>
        </Row>
      )}
      <Row>
        <Col span="4">
          Comment:<span style={{ color: 'red' }}>*</span>
        </Col>
        <Col span="20">
          <Input.TextArea
            autoSize={{ minRows: 4, maxRows: 7 }}
            rows={4}
            maxLength={100}
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />
        </Col>
      </Row>

      <div className="footer-manager-detail">
        <div className="container">
          <Button
            className="primary-button"
            onClick={() => handleSubmit('confirm')}
          >
            Confirm
          </Button>
          <Button className="outline-secondary-button" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            className="outline-primary-button"
            onClick={() => handleSubmit('reject')}
          >
            Reject
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ManagerDetailRequest
