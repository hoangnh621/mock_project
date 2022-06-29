import moment from 'moment'

const handleManagerTable = (listRequest) => {
  const handleData = listRequest.map((request, index) => {
    let requestType = ''
    switch (request.request_type) {
      case 1:
        requestType = 'Forget'
        break
      case 2:
        requestType = 'Leave paid'
        break
      case 3:
        requestType = 'Leave unpaid'
        break
      case 4:
        requestType = 'Late/Early'
        break
      default:
        requestType = 'Over Time'
        break
    }
    return {
      key: index,
      id: request.id,
      name: request.member.full_name,
      division: request.member.division[0].division_name,
      requestType,
      createdAt: moment(request.created_at).format('DD/MM/YYYY'),
      status: request.status,
      reason: request.reason,
      avatar: request.member.avatar,
    }
  })
  return handleData
}

export default handleManagerTable
