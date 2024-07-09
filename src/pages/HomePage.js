import { Container, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import jobs from "../data/jobs.json";
import JobCard from "../components/JobCard";
import styled from "styled-components";
import getJobs from "../data/fetchData";
import api from "../data/fetchData";

const CenterPagination = styled(Pagination)(({ theme }) => ({
  ul: {
    justifyContent: "center",
    "& .Mui-selected": { backgroundColor: "#df4747" },
    "& .MuiButtonBase-root": { color: "#fff" },
  },
}));

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs(page);
      setJobs(data.jobs);
      setTotalJobs(data.totalPage);
    };
    fetchJobs();
  }, [page]);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = jobs.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (e, value) => {
    setPage(value);
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
        {jobs.map((job) => (
          <Grid key={job.id} item xs={12} md={4} lg={3} sm={6}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
      <CenterPagination
        count={Math.ceil(jobs.length / 5)}
        page={page}
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
