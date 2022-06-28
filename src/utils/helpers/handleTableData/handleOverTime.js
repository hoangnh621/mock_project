import moment from 'moment'
import { convertDateTimeToTime } from '../convertTime'

const handleOverTime = (payload) => {
  const DATE_FORMAT_FE = 'DD-MM-YYYY'
  const HOUR_FORMAT = 'HH:mm'
  const WORK_TIME_MASTER = '08:00'
  const DATE_HOUR_FORMAT_FE = 'DD-MM-YYYY HH:mm'

  const createdAt = payload?.request?.created_at
    ? moment(payload.request.created_at).format(DATE_HOUR_FORMAT_FE)
    : ''
  const registerForDate = payload?.request?.request_for_date
    ? moment(payload?.request.request_for_date).format(DATE_FORMAT_FE)
    : moment(payload.work_date).format(DATE_FORMAT_FE)
  let checkIn = '--:--'
  if (payload?.request?.checkin) {
    checkIn = convertDateTimeToTime(payload.request.checkin)
  } else if (payload?.checkin) {
    checkIn = convertDateTimeToTime(payload.checkin)
  } else {
    checkIn = convertDateTimeToTime(payload.checkin_original)
  }
  let checkOut = '--:--'
  if (payload?.request?.checkout) {
    checkOut = convertDateTimeToTime(payload.request.checkout)
  } else if (payload?.checkin) {
    checkOut = convertDateTimeToTime(payload.checkout)
  } else {
    checkOut = convertDateTimeToTime(payload.checkout_original)
  }
  const requestOT = payload?.request?.request_ot_time || '00:00'
  let actualOverTime = '00:00'
  if (payload?.work_time) {
    const diffTime = moment(payload.work_time, HOUR_FORMAT).diff(
      moment(WORK_TIME_MASTER, HOUR_FORMAT),
    )
    if (diffTime >= 0) {
      actualOverTime = moment.utc(diffTime).format(HOUR_FORMAT)
    }
  }
  if (payload?.actual_over_time) {
    actualOverTime = moment(payload.actual_over_time).format(HOUR_FORMAT)
  }
  const reason = payload?.request?.reason || ''
  return {
    registrationDate: createdAt,
    registerForDate,
    checkIn,
    checkOut,
    requestOT,
    actualOverTime,
    reason,
  }
}

export default handleOverTime
