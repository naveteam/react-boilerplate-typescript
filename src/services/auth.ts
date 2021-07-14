import api from 'providers/api'

export const getMe = () => api.get('/v1/me')

export const loginUser = (credentials: Credentials) => api.post('/v1/users/login', credentials)
