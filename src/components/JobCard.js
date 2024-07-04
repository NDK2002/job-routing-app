import * as React from "react";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Stack, styled } from "@mui/material";
import SkillsChip from "./SkillsChip";

const CardStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  border: "1px solid black",
  width: "100%",
  maxWidth: "370px",
  minWidth: "270px",
  height: "320px",
  margin: "auto",
  backgroundColor: theme.palette.primary.light,
}));

export default function JobCard({ job }) {
  return (
    <CardStyle ariant="outlined">
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
        padding="5px"
      >
        <CardContent>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              color: (theme) => theme.palette.common.white,
            }}
          >
            {job.title}
          </Typography>
          <Divider />
          <SkillsChip skills={job.skills} />
          <Typography
            sx={{ fontSize: 12, color: (theme) => theme.palette.common.white }}
          >
            {job.description}
          </Typography>
        </CardContent>

        <Button
          variant="contained"
          size="small"
          sx={{ width: "130px", backgroundColor: "#df9e0b" }}
        >
          Learn More
        </Button>
      </Stack>
    </CardStyle>
  );
}
