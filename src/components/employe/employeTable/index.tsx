// Made by Poukam Ngamaleu

import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import HouseboatOutlinedIcon from '@mui/icons-material/HouseboatOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Box, IconButton, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { theme } from '../../../utils/style/theme'
import { StyledLink } from '../../sideBar/sideBarEmploye'
import { alertMsgInterface } from '../createEmploy'

interface rowsInterface {
  id_user: number
  nom: string
  poste: string
  email: string
  user_country: string
  status: string
  profil_img?: string
}

const columns: {
  field: string
  headerName: string
  width: number
  renderCell?: any
}[] = [
  { field: 'id_user', headerName: 'ID', width: 80 },
  {
    field: 'nom',
    headerName: 'Nom',
    width: 220,
    renderCell: (params: any) => {
      return (
        <Box display="flex" alignItems="center">
          <img
            src={
              params.row.profil_img
                ? `${process.env.REACT_APP_URL_REMOTE_LINK}/uploads/${params.row.profil_img}`
                : undefined
            }
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
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'user_country', headerName: 'Pays', width: 100 },
  {
    field: 'status',
    headerName: 'Status',
    width: 140,
    renderCell: (params: any) => {
      return (
        <>
          {params.row.status === 'active' ? (
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
          ) : params.row.status === 'resigned' ? (
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

function EmployeTable({
  setCreatedMsg,
  createdMsg,
  setOpen,
}: {
  setCreatedMsg: ({ message, severity }: alertMsgInterface) => void
  createdMsg: alertMsgInterface | undefined
  setOpen: (bool: boolean) => void
}) {
  const [rows, setRows] = useState<rowsInterface[]>()
  useEffect(() => {
    // TODO fetch data from BDD
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getAllEmployeInfo`
    )
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setRows(res.data)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log(err.response.data.message)
        }
      })
  }, [createdMsg])

  const activateEmploye = (id: number) => {
    // TODO fetch data status to activate employe
    Axios.put(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/updateActiveStatus/${id}`
    )
      .then((res) => {
        if (res?.status === 200) {
          setCreatedMsg({
            message: res.data.message,
            severity: 'success',
          })
          setOpen(true)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setCreatedMsg({
            message: 'Erreur serveur, rééssayez plutard!',
            severity: 'error',
          })
          setOpen(true)
        }
      })
  }
  const dismissEmploye = (id: number) => {
    // TODO fetch data status to  dismiss employe
    Axios.put(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/updateDismissStatus/${id}`
    )
      .then((res) => {
        if (res?.status === 200) {
          setCreatedMsg({
            message: res.data.message,
            severity: 'warning',
          })
          setOpen(true)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setCreatedMsg({
            message: 'Erreur serveur, rééssayez plutard!',
            severity: 'error',
          })
          setOpen(true)
        }
      })
  }

  const resignedEmploye = (id: number) => {
    // TODO fetch data status to resigned employe
    Axios.put(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/updateResignStatus/${id}`
    )
      .then((res) => {
        if (res?.status === 200) {
          setCreatedMsg({
            message: res.data.message,
            severity: 'error',
          })
          setOpen(true)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setCreatedMsg({
            message: 'Erreur serveur, rééssayez plutard!',
            severity: 'error',
          })
          setOpen(true)
        }
      })
  }

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
                to={`/admin/employe/${params.row.id_user}`}
              >
                <VisibilityOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="En service">
              <span>
                <IconButton
                  sx={{ color: '#41B2BA' }}
                  onClick={() => activateEmploye(params.row.id_user)}
                  disabled={params.row.status === 'active' ? true : false}
                >
                  <DesignServicesOutlinedIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="En congés">
              <span>
                <IconButton
                  sx={{ color: '#626DA9' }}
                  onClick={() => dismissEmploye(params.row.id_user)}
                  disabled={params.row.status === 'holiday' ? true : false}
                >
                  <HouseboatOutlinedIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Démissionner">
              <span>
                <IconButton
                  sx={{ color: '#A95454' }}
                  onClick={() => resignedEmploye(params.row.id_user)}
                  disabled={params.row.status === 'resigned' ? true : false}
                >
                  <HighlightOffOutlinedIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        )
      },
    },
  ]

  return (
    <DataGrid
      getRowId={(row) => row.id_user}
      rows={rows ? rows : []}
      columns={columns.concat(actionColumns)}
      pageSize={9}
      rowsPerPageOptions={[9]}
      checkboxSelection
      sx={{ maxWidth: '71rem' }}
    />
  )
}

export default EmployeTable
