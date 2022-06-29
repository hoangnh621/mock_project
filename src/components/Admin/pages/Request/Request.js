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
import Badges from '../../../../common/Badges/Badges'
import CustomSpin from '../../../../common/CustomSpin/CustomSpin'
import {
  adminRequest,
  approvedAdmin,
  getAdminListRequest,
  getAdminLoading,
  getAdminPerPageConfig,
  getAdminRequest,
} from '../../../../store/reducer/adminRequest'
import { calculateComponentBottom } from '../../../../utils/helpers/handleSize'
import AdminDetailRequest from './AdminDetailRequest/AdminDetailRequest'
import './Request.scss'

const Request = () => {
  const dispatch = useDispatch()
  const adminListRequestLoading = useSelector(getAdminLoading)
  const adminListRequest = useSelector(getAdminListRequest)
  const adminPerPageConfig = useSelector(getAdminPerPageConfig)
  const requestResponse = useSelector(getAdminRequest)
  const [order, setOrder] = useState('desc')
  const [perPage, setPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [tableScrollHeight, setTableScrollHeight] = useState(0)
  const [toggleModal, setToggleModal] = useState(false)
  const adminRequestTable = useRef()
  const [currentRow, setCurrentRow] = useState()

  useEffect(() => {
    dispatch(
      adminRequest({ orderByCreatedAt: order, perPage, page: currentPage }),
    )
  }, [currentPage, dispatch, order, perPage])

  // Calculate scroll height
  useEffect(() => {
    const TABLE_MARGIN_BOTTOM = 28
    const TABLE_HEADER_HEIGHT = 40
    const PAGINATION_HEIGHT = 40
    const bottonHeaderTable = calculateComponentBottom('.header-admin-request')
    const windowHeight = window.innerHeight
    const calculateScrollHeight =
      windowHeight -
      bottonHeaderTable -
      PAGINATION_HEIGHT -
      TABLE_MARGIN_BOTTOM -
      TABLE_HEADER_HEIGHT
    const antTable = document.querySelector('.ant-table')
    antTable.style.height =
      windowHeight -
      bottonHeaderTable -
      PAGINATION_HEIGHT -
      TABLE_MARGIN_BOTTOM +
      'px'
    setTableScrollHeight(calculateScrollHeight)
  }, [])

  // Recalculate scroll height when resize
  useEffect(() => {
    const handleResize = () => {
      const TABLE_MARGIN_BOTTOM = 28
      const TABLE_HEADER_HEIGHT = 40
      const PAGINATION_HEIGHT = 40
      const bottonHeaderTable = calculateComponentBottom(
        '.header-admin-request',
      )
      const windowHeight = window.innerHeight
      const calculateScrollHeight =
        windowHeight -
        bottonHeaderTable -
        PAGINATION_HEIGHT -
        TABLE_MARGIN_BOTTOM -
        TABLE_HEADER_HEIGHT
      const antTable = document.querySelector('.ant-table')
      antTable.style.height =
        windowHeight -
        bottonHeaderTable -
        PAGINATION_HEIGHT -
        TABLE_MARGIN_BOTTOM +
        'px'
      setTableScrollHeight(calculateScrollHeight)
    }
    document.addEventListener('resize', handleResize)
  }, [])

  const handleSorter = () => {
    if (order === 'desc') {
      setOrder('asc')
    } else {
      setOrder('desc')
    }
  }

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page)
  }

  const onShowSizeChange = (current, size) => {
    setPerPage(size)
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
    if (key === 'approved') {
      dispatch(
        approvedAdmin({ id: currentRow.id, comment: 'Approved', status: 2 }),
      )
    }
    if (key === 'reject') {
      dispatch(
        approvedAdmin({ id: currentRow.id, comment: 'Reject', status: -1 }),
      )
    }
  }

  const menu = (
    <Menu
      onClick={handleClickDropDown}
      items={[
        {
          icon: <CheckCircleTwoTone twoToneColor="#2cc770" />,
          label: 'Approved',
          key: 'approved',
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
    <div ref={adminRequestTable} className="admin-request">
      <div className="container-admin-request">
        <div className="header-admin-request">
          <h3>List request</h3>
        </div>
        <div className="body-admin-request">
          <Table
            size="small"
            dataSource={[...adminListRequest]}
            onRow={onRow}
            columns={columns}
            onChange={handleSorter}
            bordered
            loading={{
              indicator: <CustomSpin />,
              spinning: adminListRequestLoading,
            }}
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
              pageSize: perPage,
              pageSizeOptions: adminPerPageConfig,
              total: requestResponse?.total,
              onChange: onPageChange,
              onShowSizeChange: onShowSizeChange,
              className: 'custom-pagination',
              showTitle: false,
              itemRender: (_, type, element) => {
                if (type === 'prev') {
                  return (
                    <>
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentPage(1)
                        }}
                        disabled={currentPage === 1}
                      >
                        <DoubleLeftOutlined />
                      </Button>
                      <Button size="small">
                        <LeftOutlined />
                      </Button>
                    </>
                  )
                }

                if (type === 'next') {
                  return (
                    <>
                      <Button size="small">
                        <RightOutlined />
                      </Button>
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentPage(requestResponse?.last_page)
                        }}
                        disabled={currentPage === requestResponse?.last_page}
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
        <AdminDetailRequest
          toggle={toggleModal}
          setToggle={setToggleModal}
          currentRow={currentRow}
        />
      )}
    </div>
  )
}

export default Request
