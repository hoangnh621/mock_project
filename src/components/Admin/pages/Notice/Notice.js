import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useState } from 'react'
import CreateNoticePopUp from './CreateNoticePopUp/CreateNoticePopUp'
import './Notice.scss'
const Notice = () => {
  const [visibleCreateRequest, setVisibleCreateRequest] = useState(false)
  return (
    <div className="notice">
      <Button
        className="outline-primary-button"
        onClick={() => {
          setVisibleCreateRequest(true)
        }}
      >
        <PlusOutlined className="icon" />
        Create a new notice
      </Button>
      <CreateNoticePopUp
        visibleCreateRequest={visibleCreateRequest}
        setVisibleCreateRequest={setVisibleCreateRequest}
      />
    </div>
  )
}

export default Notice
