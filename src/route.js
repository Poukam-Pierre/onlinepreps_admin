//  Made by Poukam Ngamaleu

import TestSheetBuying from './components/achatEpreuve'
import AdminDashboard from './components/dashboard/adminDashboard'
import EmployeDashboard from './components/dashboard/EmployeDashboard'
import Employes from './components/employe'
import CreationEmploye from './components/employe/createEmploy'
import ViewEmploye from './components/employe/viewEmploye'
import TestSheet from './components/epreuves'
import FormSheet from './components/formSheet'
import Partner from './components/partenaire'
import ViewPartner from './components/partenaire/viewPartner'
import EmployeProfil from './components/profil'
import StatEpreuve from './components/statistique/epreuves'
import AdminSkeleton from './pages/adminHomeSkeleton'
import EmployeSkeleton from './pages/employeHomeSkeleton'

export const routes = [
  {
    path: '/',
    element: <EmployeSkeleton />,
    children: [
      { path: '', element: <EmployeDashboard /> },
      {
        path: 'epreuves',
        element: <TestSheet />,
        // children: [
        //    { path: 'create/:id', element: <FormSheet /> },
        //    {path:':view/:id', element:<TestSheetView/>}
        //    {path:':modify/:id', element:<TestSheetModif/>}
        // ],
      },
      { path: 'achat', element: <TestSheetBuying /> },
      { path: 'profil', element: <EmployeProfil /> },
      { path: 'form/:id', element: <FormSheet /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminSkeleton />,
    children: [
      { path: '', element: <AdminDashboard /> },
      { path: 'employes', element: <Employes /> },
      { path: 'employe/new', element: <CreationEmploye /> },
      { path: 'employe/:id', element: <ViewEmploye /> },
      // { path: 'profil/:id', element: <EmployeProfil /> },
      { path: 'partner', element: <Partner /> },
      { path: 'partner/:id', element: <ViewPartner /> },
      { path: 'statistics', element: <StatEpreuve /> },
      // { path: '/form/:id', element: <FormSheet /> },
    ],
  },
]
