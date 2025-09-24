import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ManagerService } from '../../ManagerTypes/ManagerService';
import Alert from '@mui/material/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

export type Job = {
  requirementId: number;
  jobTitle: string;
  status: number;
  createdAt: string;
  numberOfOpenings?: number;
};

const getStatusString = (status: number): string => {
  switch (status) {
    case 0:
      return 'Pending';
    case 1:
      return 'Approved';
    case 2:
      return 'Rejected';
    default:
      return 'Unknown';
  }
};

const getStatusBadgeClass = (status: number): string => {
  switch (status) {
    case 0:
      return 'bg-warning text-dark';
    case 1:
      return 'bg-success';
    case 2:
      return 'bg-danger';
    default:
      return 'bg-secondary';
  }
};

const Table: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    ManagerService.getAllJobs()
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        setError('Failed to fetch Jobs');
        console.error(err);
      });
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    ManagerService.deleteJobbyId(id);
    console.log('Deleted successfully!');
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-2">All My Created Jobs</h2>
          <p className="text-muted mb-4">
            View the status and details of all jobs you have created.
          </p>

          {error && <Alert severity="error">{error}</Alert>}

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Requirement ID</th>
                  <th>Job Title</th>
                  <th>Date Created</th>
                  <th>Status</th>
                  <th>No Of Openings</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.requirementId}>
                    <td>{job.requirementId}</td>
                    <td>{job.jobTitle}</td>
                    <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(job.status)}`}>
                        {getStatusString(job.status)}
                      </span>
                    </td>
                    <td>{job.numberOfOpenings ?? 0}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEdit(job.requirementId)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(job.requirementId)}
                      >
                        Close
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
