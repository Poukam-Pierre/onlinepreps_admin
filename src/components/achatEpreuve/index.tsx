//  Made by Poukam Ngamaleu

import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import SelleSheetTable from './sheetSelle'
import { useAuth } from '../../utils/context'

function TestSheetBuying() {
    const {
        userData: {
            userInfo: { poste, id },
        }
    } = useAuth()
    return (
        <Box p={3} display="grid" rowGap="70px">
            <Typography variant="h4" color="#555">
                Achat épreuves ({poste?.split('|')[1]} | CMR)
            </Typography>
            <Box
                height={600}
                display="flex"
                justifyContent="center"
                position="relative"
            >
                <SelleSheetTable poste={poste as string} id={id as number} />
            </Box>
        </Box>
    )
}

export default TestSheetBuying
