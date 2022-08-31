//  Made by Poukam Ngamaleu

import EmployeDashboard from './components/dashboard/EmployeDashboard'
import EmployeSkeleton from './pages/employeHomeSkeleton'

export const routes = [
  {
    path: '/',
    element: <EmployeSkeleton />,
    children: [{ path: '', element: <EmployeDashboard /> }],
  },
]
