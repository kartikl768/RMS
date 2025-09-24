import axios from "axios";

const API_BASE = "http://localhost:5000/api/interviews"; // update with your BE endpoint

export const getUpcomingInterviews = async () => {
  const res = await axios.get(`${API_BASE}/upcoming`);
  return res.data;
};

export const getCompletedInterviews = async () => {
  const res = await axios.get(`${API_BASE}/completed`);
  return res.data;
};

export const submitFeedback = async (
  interviewId: number,
  feedback: { comments: string; result: string; score: number }
) => {
  const res = await axios.post(`${API_BASE}/${interviewId}/feedback`, feedback);
  return res.data;
};
