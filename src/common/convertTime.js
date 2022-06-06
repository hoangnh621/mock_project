import moment from 'moment'

export const convertTimeToIso = (stringTime) => {
  return new Date(stringTime).toISOString()
}

export const convertMomentToString = (objMoment) => {
  return moment(objMoment).format('YYYY-MM-DD')
}
