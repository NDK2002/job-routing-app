import { Container, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import jobs from "../data/jobs.json";
import JobCard from "../components/JobCard";
import styled from "styled-components";

const CenterPagination = styled(Pagination)(({ theme }) => ({
  ul: {
    justifyContent: "center",
    "& .Mui-selected": { backgroundColor: "#df4747" },
    "& .MuiButtonBase-root": { color: "#fff" },
  },
}));

function HomePage() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    setData(jobs);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (e, value) => {
    setCurrentPage(value);
  };
  return (
    <Container
      sx={{
        p: 3,
        backgroundColor: (theme) => theme.palette.primary.main,
        minHeight: "100vh",
      }}
      maxWidth="lg"
    >
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {currentItems.map((job) => (
          <Grid key={job.id} item xs={12} md={4} lg={3} sm={6}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
      <CenterPagination
        count={Math.ceil(data.length / itemsPerPage)}
        page={currentPage}
        sx={{
          mt: "15px",
          // color: (theme) => theme.palette.action.selected,
        }}
        color="primary"
        onChange={handleChange}
      />
    </Container>
  );
}

export default HomePage;
