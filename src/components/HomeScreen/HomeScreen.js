import { Col, Pagination, Row, Select, Table } from 'antd'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getNotice, getNoticeState } from '../../store/reducer/homeSlice'
import calculateComponentHeight from '../../utils/helpers/handleSize/calculateComponentHeight'
import './HomeScreen.scss'
import NoticeDetail from './NoticeDetail/NoticeDetail'

const HomeScreen = () => {
  const [toggleModal, setToggleModal] = useState(false)
  const { Option } = Select
  const homeScreen = useRef(null)
  const dispatch = useDispatch()
  const notice = useSelector(getNoticeState)
  const dataNotice = notice?.official_notice.data
  useEffect(() => {
    document.title = 'Home'
  }, [])
  // Get notices
  useEffect(() => {
    dispatch(getNotice())
  }, [dispatch])
  useEffect(() => {
    console.log('dataNotice', dataNotice)
    console.log('notice', notice)
  })
  const dataSource = dataNotice?.map((notice, index) => {
    const publishedTo = notice?.published_to
    let toDepartment = ''
    const publishedDate = moment(notice.published_date).format('DD/MM/YYYY')
    if (typeof publishedTo === 'string') {
      toDepartment = 'All'
    } else {
      toDepartment = notice?.published_to[0].division_name
    }
    return {
      key: +index,
      no: index + 1,
      subject: notice.subject,
      author: notice.author.full_name,
      toDepartment: toDepartment,
      publishedDate: publishedDate,
      attachment: notice.attachment,
      detail: 'view',
    }
  })

  const handleShowNoticeDetail = () => {
    setToggleModal(true)
  }

  // Calculate home screen height
  useEffect(() => {
    const headerHeight = calculateComponentHeight('header')
    const windowHeight = window.innerHeight
    homeScreen.current.style.paddingTop = headerHeight + 'px'
    homeScreen.current.style.height = windowHeight + 'px'
  }, [])
  // Recalculate home screen height when resize
  useEffect(() => {
    const handleResize = () => {
      const headerHeight = calculateComponentHeight('header')
      const windowHeight = window.innerHeight
      homeScreen.current.style.paddingTop = headerHeight + 'px'
      homeScreen.current.style.height = windowHeight + 'px'
    }
    window.addEventListener('resize', handleResize)
    return () => window.addEventListener('resize', handleResize)
  }, [])

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'To Department',
      dataIndex: 'toDepartment',
      key: 'toDepartment',
    },
    {
      title: 'Published Date',
      dataIndex: 'publishedDate',
      key: 'publishedDate',
      sorter: (a, b) => {
        const calculatePublishedDateValue = (date) => {
          const year = parseInt(date.slice(-4))
          const month = parseInt(date.slice(3, date.length - 5))
          const day = parseInt(date.slice(0, 2))
          return year * 1000 + month * 100 + day
        }
        return (
          calculatePublishedDateValue(a.publishedDate) -
          calculatePublishedDateValue(b.publishedDate)
        )
      },
    },
    {
      title: 'Attachment',
      dataIndex: 'attachment',
      key: 'attachment',
      render: (text) => <Link to="./">{text}</Link>,
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
      render: (text) => (
        <Link to="./" onClick={handleShowNoticeDetail}>
          {text}
        </Link>
      ),
    },
  ]

  return (
    <div ref={homeScreen} className="home-screen">
      <div className="container-home-screen">
        <div className="header-home-screen">
          <h3>Official Notice</h3>
        </div>
        <div className="body-home-screen">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{
              position: ['none'],
            }}
          />
        </div>
        <Row className="footer-home-screen" justify="center">
          <Col span={4}>
            <p>
              Total number of records:{' '}
              <b style={{ fontSize: 16 }}>{notice?.official_notice.total}</b>
            </p>
          </Col>
          <Col span={16}>
            <div className="pagination-notice">
              <Pagination defaultCurrent={1} total={50} />
            </div>
          </Col>
          <Col span={4}>
            <div className="select-item-per-page">
              <p>Items per page</p>
              <Select defaultValue={10}>
                {notice?.per_page_config?.map((item) => {
                  return (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  )
                })}
              </Select>
            </div>
          </Col>
        </Row>
      </div>
      <NoticeDetail toggleModal={toggleModal} setToggleModal={setToggleModal} />
    </div>
  )
}

export default HomeScreen
