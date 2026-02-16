export const getDateFromStr = (s, timeOffset) => {
  const [datePart, timePart] = s.split(' ')
  const [d, m, y] = datePart.split('.')
  const [hh, mm] = timePart.split(':')
  const dt = new Date(y, m - 1, d, hh, mm)
  dt.setHours(dt.getHours() + timeOffset)
  const _y = dt.getFullYear()
  const _m = (dt.getMonth() + 1).toString().padStart(2, '0')
  const _d = dt.getDate().toString().padStart(2, '0')
  const _hh = dt.getHours().toString().padStart(2, '0')
  const _mm = dt.getMinutes().toString().padStart(2, '0')
  return `${_y}-${_m}-${_d} ${_hh}:${_mm}`
}
