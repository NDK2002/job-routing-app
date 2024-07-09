import apiService from "../app/apiService";

async function getJobs(page, q = null) {
  try {
    const response = await apiService.get(`/jobs?_page=${page}&_per_page=8`);
    return {
      jobs: response.data.data,
      totalPage: response.pages,
    };
  } catch (error) {
    console.log(error.message);
  }
}

export default getJobs;
