import {
  getGames as apiGetGames,
  getGame as apiGetGame,
  createGame as apiCreateGame,
  updateGame as apiUpdateGame,
  deleteGame as apiDeleteGame,
} from '@/api/game'
import { useState } from 'react'

export const useGame = () => {
  const [gameIsLoading, setGameIsLoading] = useState(true)
  const [games, setGames] = useState([])
  const [currentGame, setCurrentGame] = useState(null)

  const getGames = async () => {
    setGameIsLoading(true)
    try {
      const data = await apiGetGames()
      setGames(data || [])
      return data
    } finally {
      setGameIsLoading(false)
    }
  }

  const getGame = async (id) => {
    setGameIsLoading(true)
    try {
      const data = await apiGetGame(id)
      setCurrentGame(data)
      return data
    } finally {
      setGameIsLoading(false)
    }
  }

  const createGame = async (gameData) => {
    setGameIsLoading(true)
    try {
      const response = await apiCreateGame(gameData)
      return response
    } finally {
      setGameIsLoading(false)
    }
  }

  const updateGame = async (id, gameData) => {
    setGameIsLoading(true)
    try {
      const response = await apiUpdateGame(id, gameData)
      return response
    } finally {
      setGameIsLoading(false)
    }
  }

  const deleteGame = async (id) => {
    setGameIsLoading(true)
    try {
      const response = await apiDeleteGame(id)
      if (response?.success) {
        setGames((prev) => prev.filter((game) => game.id !== id))
      }
      return response
    } finally {
      setGameIsLoading(false)
    }
  }

  return {
    gameIsLoading,
    games,
    currentGame,
    getGames,
    getGame,
    createGame,
    updateGame,
    deleteGame,
  }
}
