//  Made by Poukam Ngamaleu

import TestSheetBuying from './components/achatEpreuve'
import EmployeDashboard from './components/dashboard/EmployeDashboard'
import TestSheet from './components/epreuves'
import EmployeProfil from './components/profil'
import EmployeSkeleton from './pages/employeHomeSkeleton'

export const routes = [
  {
    path: '/',
    element: <EmployeSkeleton />,
    children: [
      { path: '', element: <EmployeDashboard /> },
      { path: '/epreuves', element: <TestSheet /> },
      { path: '/achat', element: <TestSheetBuying /> },
      { path: '/profil', element: <EmployeProfil /> },
    ],
  },
]
