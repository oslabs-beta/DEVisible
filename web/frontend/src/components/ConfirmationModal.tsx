import React from 'react';
import { Dialog, DialogContent } from '@mui/material';

interface ConfirmationModalProps<Type> {
  handleClickConfirm: Type;
  handleClickCancel: Type;
  message: string;
  open: boolean;
}
export default function ConfirmationModal<Type>({
  handleClickConfirm,
  handleClickCancel,
  message,
  open,
}: ConfirmationModalProps<Type>) {
  return (
    <div>
      <Dialog open={open}>
        <DialogContent>Hey There</DialogContent>
      </Dialog>
    </div>
  );
}
