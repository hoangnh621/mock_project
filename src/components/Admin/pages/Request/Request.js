import { DatePicker } from 'antd'

import './Request.scss'
const Request = () => {
  const handleChange = (value) => {
    console.log(value)
  }
  const { RangePicker } = DatePicker
  return (
    <div className="request">
      <RangePicker size="small" onChange={handleChange} />
      <div className="list-request"></div>
    </div>
  )
}

export default Request
