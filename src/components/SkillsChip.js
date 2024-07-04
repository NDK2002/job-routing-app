import { Chip, Paper } from "@mui/material";
import React from "react";
import styled from "styled-components";

const ListItem = styled("li")(({ theme }) => ({
  margin: "1px",
}));

function SkillsChip({ skills }) {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "start",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        boxShadow: 0,
        backgroundColor: (theme) => theme.palette.primary.light,
      }}
    >
      {skills.map((skill) => (
        <ListItem key={skill}>
          <Chip
            size="small"
            color="primary"
            label={skill}
            sx={{ paddingBottom: "2px", backgroundColor: "#df4747" }}
          />
        </ListItem>
      ))}
    </Paper>
  );
}

export default SkillsChip;
