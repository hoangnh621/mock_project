import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import './Notice.scss'
const Notice = () => {
  return (
    <div className="notice">
      <Button className="outline-primary-button" onClick={() => {}}>
        <PlusOutlined className="icon" />
        Create a new notice
      </Button>
    </div>
  )
}

export default Notice
