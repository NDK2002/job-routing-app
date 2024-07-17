import { Container, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import styled from "styled-components";
import api from "../data/fetchData";
import { useSearchParams } from "react-router-dom";

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
  const [totalPage, setTotalPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await api.getJobs(page, q);
      setJobs(data.jobs);
      setTotalPage(data.totalPages);
    };
    fetchJobs();
  }, [page, q]);

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
        count={totalPage}
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
