import React from 'react';
import { Dialog, DialogContent } from '@mui/material';

/**
 * @typeParam handleClickConfirm - confirmation option
 * @typeParam handleClickCancel - cancellation option
 * @typeParam message - string that displays dialog message
 * @typeParam open - boolean value that indicates whether dialog box is displayed or not
 */
interface ConfirmationModalProps<Type> {
  handleClickConfirm: Type;
  handleClickCancel: Type;
  message: string;
  open: boolean;
}

/**
 * function to open an interactive dialog box to either confirm or cancel an action
 * @param props - object containing {@link ConfirmationModalProps} methods
 * @returns JSX.Element
 */
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
