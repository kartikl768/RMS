import { useEffect, useState } from "react";
import { getCompletedInterviews } from "../../services/interviewService";
import InterviewCard from "../../components/interviewerComponents/InterviewCard";
import "../../assets/stlyes/interviewerStyles/layout.css";

const Completed = () => {
  const [interviews, setInterviews] = useState<any[]>([]);

  useEffect(() => {
    getCompletedInterviews().then(setInterviews);
  }, []);

  return (
    <main className="dashboard-main">
      <div className="container">
        <section className="tab-content active">
          <div className="section-header">
            <h2>Completed Interviews</h2>
            <p className="section-subtitle">Review feedback and results</p>
          </div>
          <div className="interview-grid">
            {interviews.length === 0 ? (
              <div className="empty-state">
                <h3>No completed interviews</h3>
                <p>Nothing to review yet.</p>
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

export default Completed;
