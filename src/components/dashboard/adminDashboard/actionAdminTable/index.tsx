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
}[] = [
  { id: 2564182, transaction_type: 'Achat', date: '24 Mai 2022' },
  {
    id: 2849761,
    transaction_type: 'Création',
    date: '21 Juin 2020',
  },
  {
    id: 6597481,
    transaction_type: 'Création',
    date: '24 Janvier 2002',
  },
  {
    id: 5849613,
    transaction_type: 'Achat',
    date: '01 Mai 2012',
  },
  {
    id: 7985431,
    transaction_type: 'Modification',
    date: '18 Mars 2015',
  },
]

function ActionAdminTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: '50rem', bgcolor: '#F5F0F0', padding: '10px' }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type transaction</TableCell>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.transaction_type}
              </TableCell>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.date}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ActionAdminTable
