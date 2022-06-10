import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { Button, Table } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getHomeTable,
  getNotice,
  getNoticeDetail,
  getNoticeState,
} from '../../store/reducer/homeSlice'
import calculateComponentHeight from '../../utils/helpers/handleSize/calculateComponentHeight'
import './HomeScreen.scss'
import NoticeDetail from './NoticeDetail/NoticeDetail'

const HomeScreen = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [oderPublishedDate, setOderPublishedDate] = useState('desc')
  const [pageSize, setPageSize] = useState(10)
  const [toggleModal, setToggleModal] = useState(false)
  const homeScreen = useRef(null)
  const dispatch = useDispatch()
  const notice = useSelector(getNoticeState)
  const dataSource = useSelector(getHomeTable)
  useEffect(() => {
    document.title = 'Home'
  }, [])
  // Get notices
  useEffect(() => {
    dispatch(
      getNotice({
        page: 1,
        per_page: pageSize,
        order_published_date: oderPublishedDate,
      }),
    )
  }, [dispatch, oderPublishedDate, pageSize])

  const handleShowNoticeDetail = (rowId, toDepartment, publishedDate) => {
    setToggleModal(true)
    dispatch(getNoticeDetail({ noticeId: rowId, toDepartment, publishedDate }))
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

  const onPageChange = (page, pageSize) => {
    dispatch(
      getNotice({
        page,
        per_page: pageSize,
        order_published_date: oderPublishedDate,
      }),
    )
    setCurrentPage(page)
  }

  const onShowSizeChange = (current, size) => {
    setPageSize(size)
  }

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
      showSorterTooltip: false,
      sorter: () => {
        if (oderPublishedDate === 'desc') {
          setOderPublishedDate('asc')
        } else {
          setOderPublishedDate('desc')
        }
      },
      // sortOrder: ['ascend', 'descend'],
      // sorter: (a, b) => {
      //   if()
      // const calculatePublishedDateValue = (date) => {
      //   const year = parseInt(date.slice(-4))
      //   const month = parseInt(date.slice(3, date.length - 5))
      //   const day = parseInt(date.slice(0, 2))
      //   return year * 1000 + month * 100 + day
      // }
      // return (
      //   calculatePublishedDateValue(a.publishedDate) -
      //   calculatePublishedDateValue(b.publishedDate)
      // )
      // },
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
      render: ({ content, rowId, toDepartment, publishedDate }) => (
        <Link
          to="./"
          onClick={() =>
            handleShowNoticeDetail(rowId, toDepartment, publishedDate)
          }
        >
          {content}
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
            dataSource={[...dataSource]}
            columns={columns}
            pagination={{
              position: ['bottomCenter'],
              showTotal: (total) => `Total number of records: ${total}`,
              hideOnSinglePage: true,
              current: currentPage,
              pageSize: pageSize,
              pageSizeOptions: notice?.per_page_config,
              total: notice?.official_notice.total || 1,
              onChange: onPageChange,
              onShowSizeChange: onShowSizeChange,
              className: 'custom-pagination',
              itemRender: (page, type, element) => {
                if (type === 'prev') {
                  return (
                    <>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          dispatch(
                            getNotice({
                              page: 1,
                              per_page: pageSize,
                              order_published_date: oderPublishedDate,
                            }),
                          )
                          setCurrentPage(1)
                        }}
                      >
                        <DoubleLeftOutlined />
                      </Button>
                      <Button style={{ marginLeft: 10 }}>
                        <LeftOutlined />
                      </Button>
                    </>
                  )
                }

                if (type === 'next') {
                  return (
                    <>
                      <Button style={{ marginRight: 10 }}>
                        <RightOutlined />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          dispatch(
                            getNotice({
                              page: notice?.official_notice.last_page || 1,
                              per_page: pageSize,
                              order_published_date: oderPublishedDate,
                            }),
                          )
                          setCurrentPage(notice?.official_notice.last_page || 1)
                        }}
                      >
                        <DoubleRightOutlined />
                      </Button>
                    </>
                  )
                }

                return element
              },
            }}
          />
        </div>
      </div>
      <NoticeDetail toggleModal={toggleModal} setToggleModal={setToggleModal} />
    </div>
  )
}

export default HomeScreen
