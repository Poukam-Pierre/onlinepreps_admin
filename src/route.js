//  Made by Poukam Ngamaleu

import TestSheetBuying from './components/achatEpreuve'
import AdminDashboard from './components/dashboard/adminDashboard'
import EmployeDashboard from './components/dashboard/EmployeDashboard'
import Employes from './components/employe'
import CreationEmploye from './components/employe/createEmploy'
import ViewEmploye from './components/employe/viewEmploye'
import TestSheet from './components/epreuves'
import ModifyTestSheet from './components/epreuves/modifytestSheet'
import ViewTestSheet from './components/epreuves/viewTestSheet'
import FormSheet from './components/formSheet'
import Partner from './components/partenaire'
import ViewPartner from './components/partenaire/viewPartner'
import EmployeProfil from './components/profil'
import StatEpreuve from './components/statistique/epreuves'
import AdminSkeleton from './pages/adminHomeSkeleton'
import EmployeSkeleton from './pages/employeHomeSkeleton'
import Feedback from './components/feedback'
import Messages from './components/messages'
import Settings from './components/setting'
import Manager from './components/managing'
import Finances from './components/statistique/finance'
import ModifyEmploye from './components/employe/modifyEmploye'

export const routes = [
  {
    path: '/',
    element: <EmployeSkeleton />,
    children: [
      { path: '', element: <EmployeDashboard /> },
      {
        path: 'epreuves',
        element: <TestSheet />,
      },
      { path: 'achat', element: <TestSheetBuying /> },
      { path: 'profil', element: <EmployeProfil /> },
      { path: 'settings', element: <Settings /> },
      { path: 'form/:formId', element: <FormSheet /> },
      { path: 'epreuve/modify/:testId', element: <ModifyTestSheet /> },
      { path: 'epreuve/view/:testId', element: <ViewTestSheet /> },
      { path: 'feedback', element: <Feedback /> },
      { path: 'messages', element: <Messages /> },
      // { path: '*', element: <Error /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminSkeleton />,
    children: [
      { path: '', element: <AdminDashboard /> },
      { path: 'employes', element: <Employes /> },
      { path: 'employe/new', element: <CreationEmploye /> },
      { path: 'employe/:employeId', element: <ViewEmploye /> },
      { path: 'employe/modify/:employeId', element: <ModifyEmploye /> },
      { path: 'partner', element: <Partner /> },
      { path: 'partner/:partnerId', element: <ViewPartner /> },
      { path: 'epreuves', element: <StatEpreuve /> },
      { path: 'epreuve/view/:testId', element: <ViewTestSheet /> },
      { path: 'epreuve/modify/:testId', element: <ModifyTestSheet /> },
      { path: 'profil', element: <EmployeProfil /> },
      { path: 'settings', element: <Settings /> },
      { path: 'messages', element: <Messages /> },
      { path: 'manager', element: <Manager /> },
      { path: 'statistics', element: <Finances /> },
      // { path: '*', element: <Error /> },
    ],
  },
]
