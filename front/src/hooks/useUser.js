import {
  getUsers as apiGetUsers,
  getUser as apiGetUser,
  createUser as apiCreateUser,
  approveUser as apiApproveUser,
  rejectUser as apiRejectUser,
  deleteUser as apiDeleteUser,
} from '@/api/user'
import { useEffect, useState } from 'react'
import { useTelegramUser } from './useTelegramUser'

export const useUser = () => {
  const [userIsLoading, setUserIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const { tgUserData, tgIsLoading } = useTelegramUser()

  useEffect(() => {
    if (tgIsLoading) {
      setUserIsLoading(true)
    }
  }, [tgIsLoading])

  useEffect(() => {
    const initUser = async () => {
      if (tgUserData) {
        await getUser(tgUserData.id)
      }
    }

    initUser()
  }, [tgUserData])

  const getTgCurrentUser = async () => {
    await getUser(tgUserData.id)
  }

  const getUser = async (tgId) => {
    setUserIsLoading(true)
    const data = await apiGetUser(tgId)
    setUserIsLoading(false)
    setUser(data)
    setIsAdmin(data?.role == 'admin')
    return data
  }

  const getUsers = async () => {
    setUserIsLoading(true)
    const data = await apiGetUsers()
    setUserIsLoading(false)
    setUsers(data)
  }

  const createUser = async (data) => {
    setUserIsLoading(true)
    const response = await apiCreateUser(data)
    setUserIsLoading(false)
    return response
  }

  const approveUser = async (tgId) => {
    setUserIsLoading(true)
    const response = await apiApproveUser(tgId)
    setUserIsLoading(false)
    return response
  }

  const rejectUser = async (tgId) => {
    setUserIsLoading(true)
    const response = await apiRejectUser(tgId)
    setUserIsLoading(false)
    return response
  }

  const deleteUser = async (tgId) => {
    setUserIsLoading(true)
    const response = await apiDeleteUser(tgId)
    setUserIsLoading(false)
    return response
  }

  return {
    userIsLoading,
    user,
    users,
    getUser,
    getUsers,
    createUser,
    approveUser,
    rejectUser,
    deleteUser,
    isAdmin,
    getTgCurrentUser,
  }
}
