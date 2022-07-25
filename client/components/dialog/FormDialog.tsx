import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { UseFormReturn } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type FormDialogProps = React.ComponentProps<typeof Dialog> & {
  open: boolean;
  onClose?: () => void;
  onDelete?: () => void;
  title: string;
  children?: React.ReactNode;
  submit: (data: any) => void;
  isLoading?: boolean;
  forms: UseFormReturn<any, object>;
  submitButtonTitle?: string;
};

export const FormDialog: React.FC<FormDialogProps> = ({
  title,
  open,
  children,
  submit,
  onClose,
  onDelete,
  forms,
  isLoading,
  submitButtonTitle = "Save changes",
  ...other
}) => {
  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = forms;

  return (
    <BootstrapDialog onClose={onClose} open={open} fullWidth {...other}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {title}
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          {onDelete && (
            <Button
              onClick={onDelete}
              disabled={isLoading}
              variant="outlined"
              color="secondary"
            >
              Delete
            </Button>
          )}
          <LoadingButton
            autoFocus
            type="submit"
            loading={isLoading}
            ///disabled={!isDirty || !isValid}
            variant="contained"
          >
            {submitButtonTitle}
          </LoadingButton>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
};
