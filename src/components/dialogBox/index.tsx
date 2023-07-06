//  Made by Poukam Pierre

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material'

interface DialogBoxProps {
  showDialog: boolean
  cancelNavigation: any
  confirmNavigation: any
}

function DialogBox({
  showDialog,
  cancelNavigation,
  confirmNavigation,
}: DialogBoxProps) {
  return (
    <Dialog open={showDialog} keepMounted>
      <DialogTitle>
        <Typography>Attention!!!</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Êtes vous sûr de vouloir quitter?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelNavigation}>Pas si sûr</Button>
        <Button onClick={confirmNavigation}>Oui</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogBox
