import React, { useState } from "react";
import "../../assets/stlyes/managerStyles/Jobform.css";
import { ManagerService } from '../../services/ManagerService';
import type { JobFormData } from '../../services/types';
import { skills } from '../../services/Skills';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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

// Helper to filter and create new options

function JobForm() {
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

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.department) newErrors.department = "Please select a department.";
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job Title is required.";
    if (!formData.jobDescription.trim()) newErrors.jobDescription = "Job Description is required.";
    if (
      formData.yearsExperience === "" ||
      isNaN(Number(formData.yearsExperience)) ||
      Number(formData.yearsExperience) < 0
    )
      newErrors.yearsExperience = "Years of experience must be 0 or more.";
    if (selectedSkills.length === 0) newErrors.requiredSkills = "Required skills are required.";
    if (
      formData.numberOfOpenings === "" ||
      isNaN(Number(formData.numberOfOpenings)) ||
      Number(formData.numberOfOpenings) < 1
    )
      newErrors.numberOfOpenings = "Number of openings must be at least 1.";
    if (!formData.date) newErrors.date = "Please select a date.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Custom handler for Autocomplete value changes
  const handleSkillsChange = (
    _event: React.SyntheticEvent,
    newValue: (string | { label: string })[]
  ) => {
    const newSkills = newValue.map((item) => (typeof item === 'string' ? item : item.label));
    setSelectedSkills(newSkills);
  };

  // Custom key handler for adding skills on space or comma
  const handleSkillsKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === ' ' || event.key === ',') {
      event.preventDefault(); // Prevent default behavior
      const trimmedInput = inputValue.trim();
      if (trimmedInput && !selectedSkills.some(skill => skill.toLowerCase() === trimmedInput.toLowerCase())) {
        setSelectedSkills([...selectedSkills, trimmedInput]);
      }
      setInputValue(''); // Clear the input field
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Join skills into a comma-separated string for the formData
      const formDataWithSkills = {
        ...formData,
        requiredSkills: selectedSkills.join(', '),
      };

      ManagerService.addJob(formDataWithSkills)
        .then(() => {
          alert("Job posted successfully!");
          // Reset form state after successful submission
          setFormData({
            department: "",
            jobTitle: "",
            jobDescription: "",
            yearsExperience: "",
            requiredSkills: "",
            numberOfOpenings: "",
            numberOfRounds: "3",
            date: "",
            managerId: 1,
          });
          setSelectedSkills([]);
          setErrors({});
        })
        .catch((err) => {
          console.error("Error posting job:", err);
          alert("Failed to post job. Please try again.");
        });
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Create New Job</h1>
        <p className="subtitle">Fill out the form below to post a new job opening</p>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="column">
          <div className="field">
            <label htmlFor="department" className="label">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="select"
            >
              <option value="" disabled>Department</option>
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
              placeholder="Provide a detailed description of the role..."
              value={formData.jobDescription}
              onChange={handleChange}
              className="textarea"
              rows={4}
            />
            {errors.jobDescription && <p className="error">{errors.jobDescription}</p>}
          </div>

          <div className="field">
            <Autocomplete
              multiple
              freeSolo
              disablePortal
              value={selectedSkills}
              onChange={handleSkillsChange}
              inputValue={inputValue}
              onInputChange={(_event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              onKeyDown={handleSkillsKeyDown}
              options={skills.map(option => option.label)}
              sx={{ width: 500 }}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Required Skills" 
                  placeholder="e.g., .NET, Communication, Teamwork"
                />
              )}
              renderOption={(props, option) => {
                // Prevent empty strings from being rendered as options
                if (option.trim() === '') return null;
                const { key, ...rest } = props;
                return <li key={key} {...rest}>{option}</li>;
              }}
            />
            {errors.requiredSkills && <p className="error">{errors.requiredSkills}</p>}
          </div>
        </div>

        <div className="column">
          <div className="field">
            <label htmlFor="jobTitle" className="label">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              placeholder="e.g., Senior Software Engineer"
              value={formData.jobTitle}
              onChange={handleChange}
              className="input"
            />
            {errors.jobTitle && <p className="error">{errors.jobTitle}</p>}
          </div>

          <div className="field">
            <label htmlFor="yearsExperience" className="label">Years of Experience</label>
            {/* <QuantityInput /> */}
            <input
              type="number"
              name="yearsExperience"
              placeholder="e.g., 5"
              value={formData.yearsExperience}
              onChange={handleChange}
              className="input"
            />
            {errors.yearsExperience && <p className="error">{errors.yearsExperience}</p>}
          </div>

          <div className="field">
            <label htmlFor="numberOfOpenings" className="label">No. of Openings</label>
            <input
              type="number"
              name="numberOfOpenings"
              placeholder="e.g., 3"
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

          <button type="submit" className="button">Post Job</button>
        </div>
      </form>
    </div>
  );
}

export default JobForm;
