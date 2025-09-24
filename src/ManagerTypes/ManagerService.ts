import axios from 'axios';
import type { JobFormData } from './types'; 

export class ManagerService {
    static baseUrl = "http://localhost:5140/api/JobRequirement";
    

    static getAllJobs = () => axios.get(this.baseUrl);
    
    static getJobbyId = (id: number) => axios.get(`${this.baseUrl}/${id}`);

    static addJob = (jobData: JobFormData) => axios.post(this.baseUrl, jobData);

    static deleteJobbyId = (id: number) => {
        const url = `${this.baseUrl}/${id}`;
        return axios.delete(url);
    };

    static updateJobById = (id: number, J: JobFormData) => {
        const url = `${this.baseUrl}/${id}`;
        return axios.put(url, J);
    };
}
