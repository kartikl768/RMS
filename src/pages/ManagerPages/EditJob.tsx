import React, { useEffect, useState } from "react";
import '../assets/stlyes/managerStyles/Navbar.css';
import Navbar from "../../components/managerComponents/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import type { JobFormData } from '../../services/types';
import { ManagerService } from "../../services/ManagerService";


const departments = [
  "Engineering",
  "Business Development",
  "Human Resources",
  "Marketing",
  "Information Technology",
  "Operation Management",
  "Sales",
  "Design",
  "Finance",
];

function EditJob() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<JobFormData>({
    department: "",
    jobTitle: "",
    jobDescription: "",
    yearsExperience: "",
    requiredSkills: "",
    numberOfOpenings: "",
    numberOfRounds: "3",
    date: "",
    managerId: 17,
  });

  const [errors, setErrors] = useState<Partial<JobFormData>>({});

  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (jobId) {
    ManagerService.getJobbyId(Number(jobId))
      .then((res) => {
        const job = res.data;
        setFormData({
          department: job.department || "",
          jobTitle: job.jobTitle || "",
          jobDescription: job.jobDescription || "",
          yearsExperience: job.yearsExperience?.toString() || "",
          requiredSkills: job.requiredSkills || "",
          numberOfOpenings: job.numberOfOpenings?.toString() || "",
          numberOfRounds: job.numberOfRounds?.toString() || "3",
          date: job.date || "",
          managerId: job.managerId || 17,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch job:", err);
        alert("Failed to load job details.");
        setLoading(false);
      });
  }
}, [jobId]);


  const validateForm = () => {
    const newErrors: Partial<JobFormData> = {};
    if (!formData.department) newErrors.department = "Please select a department.";
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job Title is required.";
    if (!formData.jobDescription.trim()) newErrors.jobDescription = "Job Description is required.";
    if (Number(formData.numberOfOpenings) < 1) newErrors.numberOfOpenings = "Openings must be at least 1.";
    if (!formData.date) newErrors.date = "Date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && jobId) {
      const payload = {
        ...formData,
        yearsExperience: Number(formData.yearsExperience),
        numberOfOpenings: Number(formData.numberOfOpenings),
        numberOfRounds: Number(formData.numberOfRounds),
      };

      ManagerService.updateJobById(Number(jobId), formData)
        .then(() => {
          alert("Job updated successfully!");
          navigate("/"); // or redirect to job list
        })
        .catch((err) => {
          console.error("Error updating job:", err);
          alert("Error updating job.");
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="header">
          <h1 className="title">Edit Job</h1>
          <p className="subtitle">Update the job details below</p>
        </div>

        <form onSubmit={handleSave} className="form-grid">
          <div className="column">
            <div className="field">
              <label htmlFor="department" className="label">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="select"
              >
                <option value="" disabled>Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && <p className="error">{errors.department}</p>}
            </div>

            <div className="field">
              <label htmlFor="jobDescription" className="label">Job Description</label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                className="textarea"
                rows={4}
              />
              {errors.jobDescription && <p className="error">{errors.jobDescription}</p>}
            </div>

            <div className="field">
              <label htmlFor="requiredSkills" className="label">Required Skills</label>
              <textarea
                name="requiredSkills"
                value={formData.requiredSkills}
                onChange={handleChange}
                className="textarea"
                rows={2}
              />
            </div>
          </div>

          <div className="column">
            <div className="field">
              <label htmlFor="jobTitle" className="label">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="input"
              />
              {errors.jobTitle && <p className="error">{errors.jobTitle}</p>}
            </div>

            <div className="field">
              <label htmlFor="numberOfOpenings" className="label">Openings</label>
              <input
                type="number"
                name="numberOfOpenings"
                value={formData.numberOfOpenings}
                onChange={handleChange}
                className="input"
              />
              {errors.numberOfOpenings && <p className="error">{errors.numberOfOpenings}</p>}
            </div>

            <div className="field">
              <label htmlFor="date" className="label">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input"
              />
              {errors.date && <p className="error">{errors.date}</p>}
            </div>

            <button type="submit" className="button">Save Changes</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditJob;
