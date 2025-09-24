
export type JobFormData = {
  department: string;
  jobTitle: string;
  jobDescription: string;
  yearsExperience: number | ''; // Change to number
  requiredSkills: string;
  numberOfOpenings: string; // This remains a string for form state
  numberOfRounds: string; // This remains a string for form state
  date: string;
  managerId: number; // New field to capture the manager
};
