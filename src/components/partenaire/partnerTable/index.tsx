// Made by Poukam Ngamaleu

import {
  Alert,
  Box,
  IconButton,
  Slide,
  SlideProps,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { theme } from '../../../utils/style/theme'
import { StyledLink } from '../../sideBar/sideBarEmploye'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { alertMsgInterface } from '../../employe/createEmploy'

interface rowsInsterface {
  id_user: number
  nom: string
  phone: string
  email: string
  montant?: number
  profil_img?: string
  signaled: boolean | null
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
    width: 200,
    renderCell: (params: any) => {
      return (
        <Box display="flex" alignItems="center">
          <img
            src={
              params.row.profil_img
                ? `${process.env.REACT_APP_URL_SOCKET_LINK}/uploads/${params.row.profil_img}`
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
  { field: 'phone', headerName: 'Phone', width: 180 },
  { field: 'email', headerName: 'Email', width: 210 },
  {
    field: 'montant',
    headerName: 'Dernière transaction',
    width: 200,
    renderCell: (params: any) => {
      return (
        <Typography>
          {params.row.montant ? params.row.montant : 0} frs CFA
        </Typography>
      )
    },
  },
]

type TransitionProps = Omit<SlideProps, 'direction'>

function PartnerTable() {
  const [rows, setRows] = useState<rowsInsterface[]>()
  const [open, setOpen] = useState(false)
  const [createdMsg, setCreatedMsg] = useState<alertMsgInterface>()

  useEffect(() => {
    // TODO change local link to remote link
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getAllPartnerInfo`
    )
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setRows(res.data)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          return
        }
      })
  }, [])

  const signaledPartner = (id: string) => {
    // TODO change local link into remote link
    Axios.post(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/signaledPartner/${id}`
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
          return
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
      width: 120,
      renderCell: (params: any) => {
        return (
          <Box display="flex" gap="10px">
            <Tooltip title="Apperçu">
              <IconButton
                sx={{ color: theme.palette.primary.light }}
                component={StyledLink}
                to={`/admin/partner/${params.row.id_user}`}
              >
                <VisibilityOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Signaler">
              <span>
                <IconButton
                  sx={{ color: '#A95454' }}
                  onClick={() => signaledPartner(params.row.id_user)}
                  disabled={params.row.signaled !== null ? true : false}
                >
                  <ReportProblemOutlinedIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        )
      },
    },
  ]

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />
  }
  return (
    <>
      <DataGrid
        getRowId={(row) => row.id_user}
        rows={rows ? rows : []}
        columns={columns.concat(actionColumns)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        sx={{ maxWidth: '66rem' }}
      />
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={TransitionUp}
        autoHideDuration={6000}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={createdMsg?.severity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {createdMsg?.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default PartnerTable
