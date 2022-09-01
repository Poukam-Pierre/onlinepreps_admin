//  Made by Poukam Ngamaleu

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const rows: {
  id: number
  transaction_type: string
  date: string
  status: boolean | undefined
}[] = [
  { id: 2564182, transaction_type: 'Achat', date: '24 Mai 2022', status: true },
  {
    id: 2849761,
    transaction_type: 'Création',
    date: '21 Juin 2020',
    status: true,
  },
  {
    id: 6597481,
    transaction_type: 'Création',
    date: '24 Janvier 2002',
    status: false,
  },
  {
    id: 5849613,
    transaction_type: 'Achat',
    date: '01 Mai 2012',
    status: undefined,
  },
  {
    id: 7985431,
    transaction_type: 'Modification',
    date: '18 Mars 2015',
    status: true,
  },
]

function ActionTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: '60rem', bgcolor: '#F5F0F0' }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type transaction</TableCell>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.transaction_type}
              </TableCell>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">
                {row.status === undefined ? (
                  <span
                    style={{
                      backgroundColor: '#CAD2FF',
                      color: '#626DA9',
                      padding: '10px',
                      borderRadius: '15px',
                    }}
                  >
                    En attente
                  </span>
                ) : row.status ? (
                  <span
                    style={{
                      backgroundColor: '#D2F0F2',
                      color: '#41B2BA',
                      padding: '10px',
                      borderRadius: '15px',
                    }}
                  >
                    Approuvé
                  </span>
                ) : (
                  <span
                    style={{
                      backgroundColor: '#F89E9E',
                      color: '#A95454',
                      padding: '10px',
                      borderRadius: '15px',
                    }}
                  >
                    Réjeté
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ActionTable
