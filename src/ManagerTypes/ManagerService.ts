import axios from 'axios';
import type { JobFormData } from './types';


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export class ManagerService {
  static baseUrl = "http://localhost:5109/api/manager/jobrequirements";

  static getAllJobs = () => axios.get(this.baseUrl);

  static getJobById = (id: number) => axios.get(`${this.baseUrl}/${id}`);

  static addJob = (jobData: JobFormData) => axios.post(this.baseUrl, jobData);

  static deleteJobById = (id: number) => axios.delete(`${this.baseUrl}/${id}`);

  static updateJobById = (id: number, jobData: JobFormData) =>
    axios.put(`${this.baseUrl}/${id}`, jobData);
}
