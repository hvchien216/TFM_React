import React, { useEffect, useState } from "react";
import "./style.scss";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
function AlertDialog(props) {
  console.log("props====>", props);
  const handleClose = () => {
    props.close(false);
  };
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Thông báo</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <span>
            {`Bạn đã thêm `}
            <span
              style={{ color: "red" }}
            >{`[${props.data.quantity} ${props.data.name}, size: ${props.data.size}]`}</span>
            {` vào giỏ hàng`}
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
