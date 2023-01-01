// Made by Poukam Ngamaleu

import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useAuth } from '../../../../utils/context'

const columns: {
  field: string
  headerName: string
  width: number
  renderCell?: any
}[] = [
  { field: 'test_selling_id', headerName: 'ID', width: 180 },
  { field: 'category', headerName: 'Catégorie', width: 130 },
  {
    field: 'session',
    headerName: 'Session',
    width: 180,
    renderCell: (params: any) => {
      return new Date(params.row.session).toLocaleDateString()
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 180,
    renderCell: (params: any) => {
      return (
        <>
          {params.row.status === 'waiting' ? (
            <span
              style={{
                backgroundColor: '#F89E9E',
                color: '#A95454',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              En vente
            </span>
          ) : params.row.status === 'buy' ? (
            <span
              style={{
                backgroundColor: '#D2F0F2',
                color: '#41B2BA',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              Acheter
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
              Contacter
            </span>
          )}
        </>
      )
    },
  },
]

interface rowsInterface {
  test_selling_id: string
  category: string
  session: string
  status: string
}

function SheetBuy() {
  const {
    userInfo: { poste },
  } = useAuth()
  const [rows, setRows] = useState<rowsInterface[]>()

  useEffect(() => {
    // TODO fetch data from BDD
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getEpreuveByDepartment/${
        poste?.split('|')[1]
      }`
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
  }, [])

  return (
    <DataGrid
      getRowId={(row) => row.test_selling_id}
      rows={rows ? rows : []}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      sx={{ maxWidth: '50rem' }}
    />
  )
}

export default SheetBuy
