import { createContext, useContext, useState, useEffect } from 'react'

import { getMe, loginUser } from 'services/auth'
import { getToken, setToken, clearToken } from 'utils/auth'
interface UserData {
  name: string
  email: string
}

interface UserContextData {
  user: UserData | null
  isFetchingUser: boolean
  login(credentials: Credentials): Promise<void>
  logout(): void
}

const UserContext = createContext<UserContextData>({} as UserContextData)

const useUser: () => UserContextData = () => useContext(UserContext)

const UserProvider: React.FC = props => {
  const [isFetchingUser, setIsFetchingUser] = useState(true)
  const [user, setUser] = useState<UserData | null>(null)

  const fetchUser = async () => {
    const token = await getToken()
    try {
      if (token) {
        const userResponse = await getMe()
        return setUser(userResponse)
      }
      if (['/login'].includes(window.location.pathname)) {
        return
      }
      window.location.href = '/login'
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsFetchingUser(false)
    }
  }

  const login = async (credentials: Credentials) => {
    try {
      const loginResponse = await loginUser(credentials)
      setToken(loginResponse.token)
      setUser(loginResponse)
    } catch (error) {
      console.log('error', error)
    }
  }

  const logout = () => {
    clearToken()
    setUser(null)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return <UserContext.Provider value={{ user, isFetchingUser, login, logout }} {...props} />
}

export { UserProvider, useUser }
