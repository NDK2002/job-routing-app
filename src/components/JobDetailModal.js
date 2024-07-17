import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../data/fetchData";
import { Box, Card, CardContent, Modal, Typography } from "@mui/material";
import SkillsChip from "./SkillsChip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 750 },
  bgcolor: "background.paper",
  borderRadius: 2,
  border: "none",
};

function JobDetailModal() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      const data = await api.getJob(jobId);
      setJob(data);
    };
    fetchJob();
  }, []);

  const handleClose = () => navigate(-1);

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {job?.title && job?.description && job?.skills && job?.city && (
            <Card
              sx={{
                border: "none",
                boxShadow: 0,
                backgroundColor: (theme) => theme.palette.primary.light,
                color: (theme) => theme.palette.common.white,
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" fontSize="34px">
                  {job?.title}
                </Typography>
                <Typography>{job?.description}</Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  pt="20px"
                >
                  <Typography textAlign="center">
                    Skills:
                    <SkillsChip skills={job?.skills} />
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  component="div"
                  textAlign="center"
                  pt="20px"
                >
                  City: {job?.city}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default JobDetailModal;
