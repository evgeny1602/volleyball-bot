import {
  getUsers as apiGetUsers,
  getUser as apiGetUser,
  createUser as apiCreateUser,
  approveUser as apiApproveUser,
  deleteUser as apiDeleteUser,
} from '@/api/user'
import { useState } from 'react'

export const useUser = () => {
  const [userIsLoading, setUserIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  const getUser = async (tgId) => {
    setUserIsLoading(true)
    const data = await apiGetUser(tgId)
    setUserIsLoading(false)
    setUser(data)
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
    deleteUser,
  }
}
