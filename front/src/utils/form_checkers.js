export const isFioValid = (fio) => {
  if (fio.length < 3) return false

  return true
}

export const isBirthdayValid = (birthday) => {
  if (birthday.length < 10) return false

  return true
}

export const isPhoneValid = (phone) => {
  if (phone.length < 11) return false

  return true
}
