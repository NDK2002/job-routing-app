import apiService from "../app/apiService";

async function getJobs(page, q = null) {
  try {
    const response = await apiService.get(
      `/jobs?_page=${page}&_limit=8&q=${q}`
    );
    if (response.status === 200) {
      const totalItems = response.headers.get("x-total-count");
      if (totalItems) {
        const totalPages = Math.ceil(parseInt(totalItems) / 8);
        return {
          jobs: response.data,
          totalPages: totalPages,
        };
      }
      console.log();
      return response.data;
    } else {
      console.log(`Failed to retrieve data: ${response.status}`);
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
