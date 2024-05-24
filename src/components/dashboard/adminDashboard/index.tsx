// Made by Poukam Ngamaleu

import { Box } from '@mui/material'
import Axios from 'axios'
import { useEffect } from 'react'
import { theme } from '../../../utils/style/theme'
import SouscriptionDetails from './AdminSouscriptionDetails/SouscriptionDetails'
import Counter from './Counter'
import PartnerDetails from './PartnersDetails'
import EmployesDetails from './EmployesDetails'

function AdminDashboard() {

  useEffect(() => {
    // TODO change local link to remote link
    Axios.get(`${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getStatAdmin`)
      .then((res) => {
        if (res?.status === 200) {
          return
        }
      })
      .catch((err) => {
        return
      })
  }, [])

  return (
    <Box sx={{
      backgroundColor: theme.common.background,
      padding: 2,
      display: 'grid',
      rowGap: '10px'

    }}>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        columnGap: '40px'
      }}>
        <SouscriptionDetails />
        <Counter />
      </Box>
      <PartnerDetails />
      <EmployesDetails />
    </Box>
  )
}

export default AdminDashboard
