import './Badges.scss'

const Badges = ({ status }) => {
  switch (status) {
    case -1:
      return <span className="badge-reject">Reject</span>
    case 0:
      return <span className="badge-pending">Pending</span>
    case 1:
      return <span className="badge-confirm">Confirm</span>
    default:
      return <span className="badge-success">Success</span>
  }
}

export default Badges
