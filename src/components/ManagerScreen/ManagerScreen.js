/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  MoreOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Dropdown, Menu, Table } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Badges from '../../common/Badges/Badges'
import CustomSpin from '../../common/CustomSpin/CustomSpin'
import {
  confirmManager,
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
  const [currentRow, setCurrentRow] = useState()
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
        setCurrentRow(record)
      },
      onMouseEnter: () => {
        setCurrentRow(record)
      },
    }
  }

  const handleClickDropDown = ({ key, keyPath, domEvent }) => {
    domEvent.stopPropagation()
    if (key === 'confirm') {
      dispatch(
        confirmManager({ id: currentRow.id, comment: 'Confirm', status: 1 }),
      )
    }
    if (key === 'reject') {
      dispatch(
        confirmManager({ id: currentRow.id, comment: 'Reject', status: -1 }),
      )
    }
  }

  const menu = (
    <Menu
      onClick={handleClickDropDown}
      items={[
        {
          icon: <CheckCircleTwoTone twoToneColor="#2cc770" />,
          label: 'Confirm',
          key: 'confirm',
        },
        {
          icon: <CloseCircleTwoTone twoToneColor="#ea5455" />,
          label: 'Reject',
          key: 'reject',
        },
      ]}
    />
  )

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: '5%',
    },
    {
      title: 'AVATAR',
      dataIndex: 'avatar',
      key: 'avatar',
      width: '8%',
      align: 'center',
      render: (avatar) => {
        if (!avatar) {
          return (
            <Avatar
              size={38}
              icon={<UserOutlined />}
              style={{
                color: '#7367f0',
                backgroundColor: '#eeedfd',
              }}
            />
          )
        } else {
          const avatarPath = JSON.parse(avatar)
          return <Avatar src={avatarPath} />
        }
      },
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: '18%',
      ellipsis: true,
    },
    {
      title: 'DIVISION',
      dataIndex: 'division',
      key: 'division',
      align: 'center',
      width: '8%',
    },
    {
      title: 'REQUEST TYPE',
      dataIndex: 'requestType',
      key: 'requestType',
      align: 'center',
      width: '12%',
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
      width: '19%',
      ellipsis: true,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: '8%',
      align: 'center',
      render: (record) => {
        return <Badges status={record} />
      },
    },
    {
      title: 'ACTION',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: '7%',
      render: () => {
        return (
          <Dropdown overlay={menu} onClick={(e) => e.preventDefault()}>
            <MoreOutlined style={{ fontSize: 18 }} />
          </Dropdown>
        )
      },
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
        <ManagerDetailRequest
          toggle={toggleModal}
          setToggle={setToggleModal}
          currentRow={currentRow}
        />
      )}
    </div>
  )
}

export default ManagerScreen
