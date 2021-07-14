import React from 'react'
import { Route } from 'react-router-dom'

import { Login } from 'screens'

const UnauthenticatedApp: React.FC = () => {
  return (
    <Route path='/login'>
      <Login />
    </Route>
  )
}

export default UnauthenticatedApp
