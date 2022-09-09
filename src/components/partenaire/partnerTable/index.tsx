// Made by Poukam Ngamaleu

import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { StyledLink } from '../../sideBar/sideBarEmploye'

const columns: {
  field: string
  headerName: string
  width: number
  renderCell?: any
}[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  {
    field: 'nom',
    headerName: 'Nom',
    width: 200,
    renderCell: (params: any) => {
      return (
        <Box display="flex" alignItems="center">
          <img
            src={params.row.avatar}
            alt=""
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginRight: '10px',
            }}
          />
          {params.row.nom}
        </Box>
      )
    },
  },
  { field: 'phone', headerName: 'Phone', width: 180 },
  { field: 'email', headerName: 'Email', width: 180 },
  {
    field: 'last_transaction',
    headerName: 'Dernière transaction',
    width: 230,
    renderCell: (params: any) => {
      return <Typography>{params.row.last_transaction} frs CFA</Typography>
    },
  },
]

const rows: {
  id: number
  nom: string
  phone: string
  email: string
  last_transaction: number
  avatar?: string
}[] = [
  {
    id: 1,
    nom: 'Poukam Ngamaleu',
    phone: '+237 696841451',
    avatar:
      'https://media.nationalgeographic.org/assets/photos/111/820/541fc44b-e230-4fab-a429-d26913025a4c_c144-0-1856-1355_r800x633.jpg?378ee45b5204bcd6b5ff63f2edfdee7cabdf3eb4',
    email: 'jk@gmail.com',
    last_transaction: 20000,
  },
  {
    id: 2,
    nom: 'Poukam Ngamaleu',
    phone: '+237 696841451',
    avatar:
      'https://media.nationalgeographic.org/assets/photos/111/820/541fc44b-e230-4fab-a429-d26913025a4c_c144-0-1856-1355_r800x633.jpg?378ee45b5204bcd6b5ff63f2edfdee7cabdf3eb4',
    email: 'jk@gmail.com',
    last_transaction: 20000,
  },
  {
    id: 3,
    nom: 'Poukam Ngamaleu',
    phone: '+237 696841451',
    avatar:
      'https://media.nationalgeographic.org/assets/photos/111/820/541fc44b-e230-4fab-a429-d26913025a4c_c144-0-1856-1355_r800x633.jpg?378ee45b5204bcd6b5ff63f2edfdee7cabdf3eb4',
    email: 'jk@gmail.com',
    last_transaction: 20000,
  },
  {
    id: 4,
    nom: 'Poukam Ngamaleu',
    phone: '+237 696841451',
    avatar:
      'https://media.nationalgeographic.org/assets/photos/111/820/541fc44b-e230-4fab-a429-d26913025a4c_c144-0-1856-1355_r800x633.jpg?378ee45b5204bcd6b5ff63f2edfdee7cabdf3eb4',
    email: 'jk@gmail.com',
    last_transaction: 20000,
  },
  {
    id: 5,
    nom: 'Poukam Ngamaleu',
    phone: '+237 696841451',
    avatar:
      'https://media.nationalgeographic.org/assets/photos/111/820/541fc44b-e230-4fab-a429-d26913025a4c_c144-0-1856-1355_r800x633.jpg?378ee45b5204bcd6b5ff63f2edfdee7cabdf3eb4',
    email: 'jk@gmail.com',
    last_transaction: 20000,
  },
  {
    id: 6,
    nom: 'Poukam Ngamaleu',
    phone: '+237 696841451',
    avatar:
      'https://media.nationalgeographic.org/assets/photos/111/820/541fc44b-e230-4fab-a429-d26913025a4c_c144-0-1856-1355_r800x633.jpg?378ee45b5204bcd6b5ff63f2edfdee7cabdf3eb4',
    email: 'jk@gmail.com',
    last_transaction: 20000,
  },
  {
    id: 7,
    nom: 'Poukam Ngamaleu',
    phone: '+237 696841451',
    avatar:
      'https://media.nationalgeographic.org/assets/photos/111/820/541fc44b-e230-4fab-a429-d26913025a4c_c144-0-1856-1355_r800x633.jpg?378ee45b5204bcd6b5ff63f2edfdee7cabdf3eb4',
    email: 'jk@gmail.com',
    last_transaction: 20000,
  },
  {
    id: 8,
    nom: 'Poukam Ngamaleu',
    phone: '+237 696841451',
    avatar:
      'https://media.nationalgeographic.org/assets/photos/111/820/541fc44b-e230-4fab-a429-d26913025a4c_c144-0-1856-1355_r800x633.jpg?378ee45b5204bcd6b5ff63f2edfdee7cabdf3eb4',
    email: 'jk@gmail.com',
    last_transaction: 20000,
  },
  {
    id: 9,
    nom: 'Poukam Ngamaleu',
    phone: '+237 696841451',
    avatar:
      'https://media.nationalgeographic.org/assets/photos/111/820/541fc44b-e230-4fab-a429-d26913025a4c_c144-0-1856-1355_r800x633.jpg?378ee45b5204bcd6b5ff63f2edfdee7cabdf3eb4',
    email: 'jk@gmail.com',
    last_transaction: 20000,
  },
]

function PartnerTable() {
  const actionColumns: {
    field: string
    headerName: string
    width: number
    renderCell: any
  }[] = [
    {
      field: 'action',
      headerName: 'Action',
      width: 230,
      renderCell: (params: any) => {
        return (
          <Box display="flex" gap="10px">
            <Box component={StyledLink} to={`/admin/partner/${params.row.id}`}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#CBCBCB',
                  color: '#1A9EA7',
                }}
              >
                Apperçu
              </Button>
            </Box>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#CBCBCB',
                color: '#FF0000',
              }}
            >
              Signaler
            </Button>
          </Box>
        )
      },
    },
  ]

  return (
    <DataGrid
      rows={rows}
      columns={columns.concat(actionColumns)}
      pageSize={9}
      rowsPerPageOptions={[9]}
      checkboxSelection
      sx={{ maxWidth: '74rem' }}
    />
  )
}

export default PartnerTable
