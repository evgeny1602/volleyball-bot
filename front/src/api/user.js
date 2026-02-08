export async function getUser(tgId) {
  const response = await fetch(`/api/users/${tgId}`)

  if (response.status === 200) {
    const data = await response.json()
    return data
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
    return data
  }

  return null
}
