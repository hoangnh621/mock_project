import { Button, Col, Form, Input, Modal, Row } from 'antd'
import PropTypes from 'prop-types'
import XIcon from '../../../common/XIcon/XIcon'
import './ChangePassPopup.scss'

const ChangePassPopup = ({ toggleModal, setToggleModal }) => {
  const handleOk = () => {
    setToggleModal(false)
  }
  const handleCancel = () => {
    setToggleModal(false)
  }

  return (
    <Modal
      className="modalChangePass"
      title="Change Pass"
      visible={toggleModal}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={<XIcon />}
      footer={null}
    >
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        labelAlign="left"
        className="formChangePass"
      >
        <Form.Item
          label="Old password"
          name="oldPassword"
          rules={[
            {
              warningOnly: true,
            },
            {
              required: true,
              message: 'Please input your old password!',
            },
            {
              min: 8,
              message: 'Password must have at least 8 characters',
            },
            {
              max: 32,
              message: 'Password has at most 32 characters',
            },
            {
              pattern: /(^\S*$)/g,
              message: 'Passwords do not contain spaces',
            },
          ]}
        >
          <Input.Password className="input-primary" />
        </Form.Item>
        <Form.Item
          label="New password"
          name="newPassword"
          rules={[
            {
              warningOnly: true,
            },
            {
              required: true,
              message: 'Please input your old password!',
            },
            {
              min: 8,
              message: 'Password must have at least 8 characters',
            },
            {
              max: 32,
              message: 'Password has at most 32 characters',
            },
            {
              pattern: /(^\S*$)/g,
              message: 'Passwords do not contain spaces',
            },
          ]}
        >
          <Input.Password className="input-primary" />
        </Form.Item>
        <Form.Item
          label="Confirm new password"
          name="confirmPassword"
          rules={[
            {
              warningOnly: true,
            },
            {
              required: true,
              message: 'Please input your old password!',
            },
            {
              min: 8,
              message: 'Password must have at least 8 characters',
            },
            {
              max: 32,
              message: 'Password has at most 32 characters',
            },
            {
              pattern: /(^\S*$)/g,
              message: 'Passwords do not contain spaces',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                )
              },
            }),
          ]}
        >
          <Input.Password className="input-primary" />
        </Form.Item>
        <Row>
          <Col lg={{ span: 3, offset: 13 }} xs={{ span: 3, offset: 6 }}>
            <Form.Item>
              <Button className="primary-button" htmlType="submit">
                OK
              </Button>
            </Form.Item>
          </Col>
          <Col lg={{ span: 4, offset: 0 }} xs={{ span: 4, offset: 2 }}>
            <Form.Item>
              <Button className="outline-primary-button">Reset</Button>
            </Form.Item>
          </Col>
          <Col lg={{ span: 4, offset: 0 }} xs={{ span: 4, offset: 2 }}>
            <Form.Item>
              <Button className="outline-secondary-button">Cancel</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

ChangePassPopup.propTypes = {
  toggleModal: PropTypes.bool.isRequired,
  setToggleModal: PropTypes.func.isRequired,
}

export default ChangePassPopup
