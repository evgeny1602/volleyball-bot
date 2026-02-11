export const getGames = async () => {
  const response = await fetch(`/api/games`)

  if (response.status === 200) {
    const data = await response.json()

    if (data.success) {
      return data.data
    }
  }

  return null
}

export async function getGame(id) {
  const response = await fetch(`/api/games/${id}`)

  if (response.status === 200) {
    const data = await response.json()

    if (data.success) {
      return data.game
    }
  }

  return null
}

export async function createGame(gameData) {
  const response = await fetch(`/api/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gameData),
  })

  return response
}

export async function updateGame(id, gameData) {
  const response = await fetch(`/api/games/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gameData),
  })

  if (response.status === 200) {
    return await response.json()
  }

  return null
}

export const deleteGame = async (id) => {
  const response = await fetch(`/api/games/${id}`, {
    method: 'DELETE',
  })

  if (response.status === 200) {
    return { success: true }
  }

  return null
}
