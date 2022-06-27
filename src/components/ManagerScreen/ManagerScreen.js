import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Table } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CustomSpin from '../../common/CustomSpin/CustomSpin'
import {
  getManagerList,
  getManagerListRequest,
  getManagerLoading,
  getManagerPerPageConfig,
  getManagerRequestSent,
} from '../../store/reducer/managerSlice'
import { getLocalStorageItem } from '../../utils/helpers/handleLocalStorageItems'
import calculateComponentHeight from '../../utils/helpers/handleSize/calculateComponentHeight'
import ManagerDetailRequest from './ManagerDetailRequest/ManagerDetailRequest'
import './ManagerScreen.scss'

const ManagerScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const managerScreen = useRef()
  const managerLoading = useSelector(getManagerLoading)
  const requestSent = useSelector(getManagerRequestSent)
  const perPageConfig = useSelector(getManagerPerPageConfig)
  const dataSource = useSelector(getManagerList)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [tableScrollHeight, setTableScrollHeight] = useState(0)
  const [toggleModal, setToggleModal] = useState(false)
  const [oder, setOder] = useState('desc')
  // Check role
  useEffect(() => {
    const role = getLocalStorageItem('role')
    if (role !== '2') {
      navigate('error-page')
    }
  })

  // Get list request
  useEffect(() => {
    const role = getLocalStorageItem('role')
    if (role === '2') {
      dispatch(
        getManagerListRequest({
          orderRequestForDate: oder,
          perPage: pageSize,
          page: currentPage,
        }),
      )
    }
  }, [dispatch, currentPage, oder, pageSize])

  useEffect(() => {
    // Calculate home screen height
    const headerHeight = calculateComponentHeight('.navbar')
    const windowHeight = window.innerHeight
    if (managerScreen.current) {
      managerScreen.current.style.paddingTop = headerHeight + 'px'
      managerScreen.current.style.height = windowHeight + 'px'
    }
    // Calculate table scroll height
    const PAGINATION_MARGIN_TOP = 16
    const MANAGER_SCREEN_PADDING_BOTTOM = 32
    const customPaginationHeight = 32
    const MANAGER_SCREEN_HEADER = 55

    const tableTileHeight = calculateComponentHeight('.header-manager-screen')
    const tableHeaderHeight = calculateComponentHeight('.ant-table-header')
    const managerTableContainer = document.querySelector(
      '.body-manager-screen .ant-table-container',
    )
    const calculateHeight =
      windowHeight -
      headerHeight -
      tableTileHeight -
      tableHeaderHeight -
      customPaginationHeight -
      2 * MANAGER_SCREEN_PADDING_BOTTOM -
      PAGINATION_MARGIN_TOP
    managerTableContainer.style.height =
      calculateHeight + MANAGER_SCREEN_HEADER + 'px'
    setTableScrollHeight(calculateHeight)
  }, [])

  //Recalculate when resize
  useEffect(() => {
    const handleResize = () => {
      // Calculate home screen height
      const headerHeight = calculateComponentHeight('.navbar')
      const windowHeight = window.innerHeight
      if (managerScreen.current) {
        managerScreen.current.style.paddingTop = headerHeight + 'px'
        managerScreen.current.style.height = windowHeight + 'px'
      }
      // Calculate table scroll height
      const PAGINATION_MARGIN_TOP = 16
      const MANAGER_SCREEN_PADDING_BOTTOM = 32
      const customPaginationHeight = 32
      const MANAGER_SCREEN_HEADER = 55

      const tableTileHeight = calculateComponentHeight('.header-manager-screen')
      const tableHeaderHeight = calculateComponentHeight('.ant-table-header')
      const managerTableContainer = document.querySelector(
        '.body-manager-screen .ant-table-container',
      )
      const calculateHeight =
        windowHeight -
        headerHeight -
        tableTileHeight -
        tableHeaderHeight -
        customPaginationHeight -
        2 * MANAGER_SCREEN_PADDING_BOTTOM -
        PAGINATION_MARGIN_TOP
      managerTableContainer.style.height =
        calculateHeight + MANAGER_SCREEN_HEADER + 'px'
      setTableScrollHeight(calculateHeight)
    }
    document.addEventListener('resize', handleResize)
  })

  const handleSorter = () => {
    if (oder === 'desc') {
      setOder('asc')
    } else {
      setOder('desc')
    }
  }

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page)
  }

  const onShowSizeChange = (current, size) => {
    setPageSize(size)
  }

  const onRow = (record, index) => {
    return {
      onClick: () => {
        setToggleModal(true)
      },
    }
  }

  const columns = [
    {
      title: 'AVATAR',
      dataIndex: 'avatar',
      key: 'avatar',
      width: '8%',
      align: 'center',
      render: () => (
        <Avatar
          size={38}
          icon={<UserOutlined />}
          style={{
            color: '#7367f0',
            backgroundColor: '#eeedfd',
          }}
        />
      ),
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'DIVISION',
      dataIndex: 'division',
      key: 'division',
      align: 'center',
      width: '10%',
    },
    {
      title: 'REQUEST TYPE',
      dataIndex: 'requestType',
      key: 'requestType',
      align: 'center',
      width: '15%',
    },
    {
      title: 'CREATED AT',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: '15%',
      showSorterTooltip: false,
      sorter: true,
    },
    {
      title: 'REASON',
      dataIndex: 'reason',
      key: 'reason',
      width: '22%',
      ellipsis: true,
    },
    {
      title: 'ACTION',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: '10%',
    },
  ]

  return (
    <div ref={managerScreen} className="manager-screen">
      <div className="container-manager-screen">
        <div className="header-manager-screen">
          <h3>List request</h3>
        </div>
        <div className="body-manager-screen">
          <Table
            dataSource={[...dataSource]}
            onRow={onRow}
            columns={columns}
            onChange={handleSorter}
            bordered
            loading={{ indicator: <CustomSpin />, spinning: managerLoading }}
            rowClassName={(record, index) => {
              if (index % 2 === 0) {
                return 'evenRow'
              } else {
                return 'oddRow'
              }
            }}
            scroll={{
              y: tableScrollHeight,
            }}
            pagination={{
              position: ['bottomCenter'],
              showTotal: (total) => `Total number of records: ${total}`,
              locale: { items_per_page: '' },
              showSizeChanger: true,
              current: currentPage,
              pageSize: pageSize,
              pageSizeOptions: perPageConfig,
              total: requestSent?.total,
              onChange: onPageChange,
              onShowSizeChange: onShowSizeChange,
              className: 'custom-pagination',
              showTitle: false,
              itemRender: (_, type, element) => {
                if (type === 'prev') {
                  return (
                    <>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentPage(1)
                        }}
                        disabled={currentPage === 1}
                      >
                        <DoubleLeftOutlined />
                      </Button>
                      <Button>
                        <LeftOutlined />
                      </Button>
                    </>
                  )
                }

                if (type === 'next') {
                  return (
                    <>
                      <Button>
                        <RightOutlined />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentPage(requestSent?.last_page)
                        }}
                        disabled={currentPage === requestSent?.last_page}
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
      {toggleModal && (
        <ManagerDetailRequest toggle={toggleModal} setToggle={setToggleModal} />
      )}
    </div>
  )
}

export default ManagerScreen
