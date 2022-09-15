// Made by Poukam Ngamaleu

import { Box, Button, IconButton, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { StyledLink } from '../../sideBar/sideBarEmploye'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined'
import HouseboatOutlinedIcon from '@mui/icons-material/HouseboatOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { theme } from '../../../utils/style/theme'

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
    width: 180,
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
  { field: 'poste', headerName: 'Poste', width: 100 },
  { field: 'email', headerName: 'Email', width: 230 },
  { field: 'pays', headerName: 'Pays', width: 70 },
  {
    field: 'status',
    headerName: 'Status',
    width: 180,
    renderCell: (params: any) => {
      return (
        <>
          {params.row.status === 'service' ? (
            <span
              style={{
                backgroundColor: '#D2F0F2',
                color: '#41B2BA',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              En service
            </span>
          ) : params.row.status === 'demissionner' ? (
            <span
              style={{
                backgroundColor: '#F89E9E',
                color: '#A95454',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              Demissionner
            </span>
          ) : (
            <span
              style={{
                backgroundColor: '#CAD2FF',
                color: '#626DA9',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              Congés
            </span>
          )}
        </>
      )
    },
  },
]

const rows: {
  id: number
  nom: string
  poste: string
  email: string
  pays: string
  status: string
  avatar?: string
}[] = [
  {
    id: 1,
    nom: 'Poukam Ngamaleu',
    poste: 'NDE|CMR',
    avatar:
      'https://media.nationalgeographic.org/assets/photos/111/820/541fc44b-e230-4fab-a429-d26913025a4c_c144-0-1856-1355_r800x633.jpg?378ee45b5204bcd6b5ff63f2edfdee7cabdf3eb4',
    email: 'ngamaleu2011@gmail.com',
    pays: 'CMR',
    status: 'service',
  },
  {
    id: 2,
    nom: 'Poukam Ngamaleu',
    poste: 'NDE|CMR',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS71qs8UY6Mkdn8e6o5cW0jUJFq2MLqQT3pgQ&usqp=CAU',
    email: 'ngamaleu2011@gmail.com',
    pays: 'CMR',
    status: 'conges',
  },
  {
    id: 3,
    nom: 'Poukam Ngamaleu',
    poste: 'NDE|CMR',
    email: 'ngamaleu2011@gmail.com',
    pays: 'GBA',
    status: 'service',
  },
  {
    id: 4,
    nom: 'Poukam Ngamaleu',
    poste: 'NDE|CMR',
    avatar:
      'https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/assets/2019/02/01-02-2019-UNDP-Peru-Amarakaeri+18.jpg/image770x420cropped.jpg',
    email: 'ngamaleu2011@gmail.com',
    pays: 'CMR',
    status: 'demissionner',
  },
  {
    id: 5,
    nom: 'Poukam Ngamaleu',
    poste: 'NDE|CMR',
    email: 'ngamaleu2011@gmail.com',
    pays: 'CMR',
    status: 'service',
  },
  {
    id: 6,
    nom: 'Poukam Ngamaleu',
    poste: 'NDE|CMR',
    email: 'ngamaleu2011@gmail.com',
    pays: 'CMR',
    status: 'conges',
  },
  {
    id: 7,
    nom: 'Poukam Ngamaleu',
    poste: 'NDE|CMR',
    email: 'ngamaleu2011@gmail.com',
    pays: 'GBA',
    status: 'service',
  },
  {
    id: 8,
    nom: 'Poukam Ngamaleu',
    poste: 'NDE|CMR',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_CcP11FT5ZA4gFXEk9Yv3jMbBab_qsZnG6Q&usqp=CAU',
    email: 'ngamaleu2011@gmail.com',
    pays: 'CMR',
    status: 'service',
  },
  {
    id: 9,
    nom: 'Poukam Ngamaleu',
    poste: 'NDE|CMR',
    email: 'ngamaleu2011@gmail.com',
    pays: 'GBA',
    status: 'service',
  },
  {
    id: 10,
    nom: 'Poukam Ngamaleu',
    poste: 'NDE|CMR',
    email: 'ngamaleu2011@gmail.com',
    pays: 'CMR',
    status: 'service',
  },
  {
    id: 11,
    nom: 'Poukam Ngamaleu',
    poste: 'NDE|CMR',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbvuLruADwP85XloHkjzEoqu0ZJfShMWhlcA&usqp=CAU',
    email: 'ngamaleu2011@gmail.com',
    pays: 'GBA',
    status: 'demissionner',
  },
  {
    id: 12,
    nom: 'Poukam Ngamaleu',
    poste: 'NDE|CMR',
    email: 'ngamaleu2011@gmail.com',
    pays: 'CMR',
    status: 'conges',
  },
]

function EmployeTable() {
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
            <Tooltip title="Apperçu">
              <IconButton
                sx={{ color: theme.palette.primary.light }}
                component={StyledLink}
                to={`/admin/employe/${params.row.id}`}
              >
                <VisibilityOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="En service">
              <IconButton sx={{ color: '#41B2BA' }}>
                <DesignServicesOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="En congés">
              <IconButton sx={{ color: '#626DA9' }}>
                <HouseboatOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Démissionner">
              <IconButton sx={{ color: '#A95454' }}>
                <HighlightOffOutlinedIcon />
              </IconButton>
            </Tooltip>
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
      sx={{ maxWidth: '71rem' }}
    />
  )
}

export default EmployeTable
