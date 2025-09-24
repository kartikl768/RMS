import React from "react";
import "../../assets/stlyes/interviewerStyles/interviewCard.css";

type Interview = {
  id: number;
  candidateName: string;
  jobTitle: string;
  date: string;
  time: string;
  type: string;
  hasFeedback?: boolean;
};

type Props = {
  interview: Interview;
  onReschedule?: (id: number) => void;
  onFeedback?: (interview: Interview) => void;
};

const InterviewCard: React.FC<Props> = ({
  interview,
  onReschedule,
  onFeedback,
}) => {
  return (
    <div
      className={`interview-card ${interview.hasFeedback ? "has-feedback" : ""}`}
    >
      <h3 className="candidate-name">{interview.candidateName}</h3>
      <p className="job-title">{interview.jobTitle}</p>

      <div className="interview-details">
        <div className="detail-row">
          <span className="detail-label">Date</span>
          <span className="detail-value">{interview.date}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Time</span>
          <span className="detail-value">{interview.time}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Type</span>
          <span className={`interview-type ${interview.type.toLowerCase()}`}>
            {interview.type}
          </span>
        </div>
      </div>

      <div className="card-actions">
        {onReschedule && (
          <button
            className="btn-reschedule"
            onClick={() => onReschedule(interview.id)}
          >
            Reschedule
          </button>
        )}
        {onFeedback && (
          <button
            className="btn-feedback"
            onClick={() => onFeedback(interview)}
            disabled={interview.hasFeedback}
          >
            {interview.hasFeedback ? "Feedback Submitted" : "Provide Feedback"}
          </button>
        )}
      </div>
    </div>
  );
};

export default InterviewCard;
