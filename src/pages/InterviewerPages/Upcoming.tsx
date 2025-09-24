import { useEffect, useState } from "react";
import { getUpcomingInterviews } from "../../services/interviewService";
import InterviewCard from "../../components/interviewerComponents/InterviewCard";
import "../../assets/stlyes/interviewerStyles/Upcoming.css";

interface Interview {
  id: number;
  candidateName: string;
  jobTitle: string;
  date: string;
  time: string;
  type: string;
  hasFeedback?: boolean; 
}

const Upcoming = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getUpcomingInterviews();

        if (Array.isArray(data)) {
          setInterviews(data);
        } else {
          console.warn("API returned malformed data:", data);
          setInterviews([]);
        }
      } catch (err) {
        console.error("Failed to fetch interviews:", err);
        setError("Failed to load interviews. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterviews();
  }, []);

  if (isLoading) {
    return (
      <main className="dashboard-main">
        <div className="container">
          <p>Loading upcoming interviews...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard-main">
        <div className="container">
          <p className="error-message">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-main">
      <div className="container">
        <section className="tab-content active">
          <div className="section-header">
            <h2>Upcoming Interviews</h2>
            <p className="section-subtitle">Manage your scheduled interviews</p>
          </div>
          <div className="interview-grid">
            {interviews.length === 0 ? (
              <div className="empty-state">
                <h3>No upcoming interviews</h3>
                <p>All caught up!</p>
              </div>
            ) : (
              interviews.map((int) => (
                <InterviewCard key={int.id} interview={int} />
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Upcoming;