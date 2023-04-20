import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


export default function AlertDialog (props)
 {
  const {isOpen,onClose,children}=props;



  return (
    <div>

      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            width: '100%',
            borderRadius:'10px'
            
          },
          '& >.MuiDialogContent-root':{
            padding:0,
          }
        }}
        open={isOpen}
        onClose={onClose}
      >
        <DialogContent>
          {children}
        </DialogContent>
        
      </Dialog>
    </div>
  );
}
