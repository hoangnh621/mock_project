import { Modal } from 'antd'
import './ManagerDetailRequest.scss'

const ManagerDetailRequest = ({ toggle, setToggle }) => {
  const onCancel = () => {
    setToggle(false)
  }
  return (
    <Modal visible={toggle} onCancel={onCancel}>
      ManagerDetailRequest
    </Modal>
  )
}

export default ManagerDetailRequest
