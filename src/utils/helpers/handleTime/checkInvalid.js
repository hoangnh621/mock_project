import { convertDateTimeToTime } from '../convertTime'

export const checkInvalidDateTime = (value) => {
  return value ? convertDateTimeToTime(value) : '--:--'
}

export const checkInvalidTime = (value) => {
  return value ? value : '--:--'
}
