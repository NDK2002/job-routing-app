import { Box, Button, Dialog, Fade, Modal } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import LoginForm from "./LoginForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 4,
};

function LoginModal() {
  const navigate = useNavigate();
  const handleClose = () => navigate(-1);
  let from = navigate.state?.from?.pathname || "/";

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={true}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={true}>
          <Box sx={style}>
            <LoginForm
              callback={() => {
                navigate(from, { replace: true });
              }}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default LoginModal;
