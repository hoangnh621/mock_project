import { Button } from 'antd'
import 'antd/dist/antd.min.css'
import { useState } from 'react'
import RegisterOverTime from './RegisterOverTime/RegisterOverTime'
const WorkSheetScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }
  return (
    <>
      <div> WorkSheet </div>
      <Button style={{ marginTop: 20 }} type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <RegisterOverTime
        setIsModalVisible={setIsModalVisible}
        visible={isModalVisible}
      />
    </>
  )
}

export default WorkSheetScreen
