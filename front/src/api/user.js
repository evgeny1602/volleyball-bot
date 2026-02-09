export async function getUser(tgId) {
  const response = await fetch(`/api/users/${tgId}`)

  if (response.status === 200) {
    const data = await response.json()

    if (data.exists) {
      return data.user
    }
  }

  return null
}

export async function createUser(userData) {
  const response = await fetch(`/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })

  return response
}

export const getUsers = async () => {
  const response = await fetch(`/api/users`)

  if (response.status === 200) {
    const data = await response.json()

    if (data.success) {
      return data.data
    }
  }

  return null
}

export const approveUser = async (tgId) => {
  const response = await fetch(`/api/users/approve/${tgId}`, {
    method: 'PATCH',
  })

  if (response.status === 200) {
    const data = await response.json()
    return data
  }

  return null
}

export const rejectUser = async (tgId) => {
  const response = await fetch(`/api/users/reject/${tgId}`, {
    method: 'PATCH',
  })

  if (response.status === 200) {
    const data = await response.json()
    return data
  }

  return null
}

export const deleteUser = async (tgId) => {
  const response = await fetch(`/api/users/${tgId}`, {
    method: 'DELETE',
  })

  if (response.status === 200) {
    const data = await response.json()
    return { success: true }
  }

  return null
}
