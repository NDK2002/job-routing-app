import apiService from "../app/apiService";

async function getJobs(page, q = null) {
  try {
    const response = await apiService.get(`/jobs?_page=${page}&_per_page=8`);

    if (q) {
      let filtedJobs = response.data.data.filter(
        (job) =>
          job.title.includes(q) ||
          job.description.includes(q) ||
          job.city.includes(q) ||
          job.skills.some((skill) => skill.includes(q))
      );
      return { jobs: filtedJobs, totalPage: 1 };
    } else {
      return {
        jobs: response.data.data,
        totalPage: response.data.pages,
      };
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function getJob(id) {
  try {
    const response = await apiService.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

const api = {
  getJobs,
  getJob,
};

export default api;
