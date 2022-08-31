// Made by Poukam Ngamaleu

import { useRoutes } from 'react-router'

import { routes } from './route'

function App() {
  const routing = useRoutes(routes)
  return routing
}

export default App
