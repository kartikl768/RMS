import React, { useState } from "react";
import "../../assets/stlyes/interviewerStyles/modal.css";

type FeedbackModalProps = {
  open: boolean;
  interviewId: number | null;
  candidateName: string;
  onClose: () => void;
  onSubmit: (feedback: {
    interviewId: number;
    comments: string;
    result: string;
  }) => void;
};

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  open,
  interviewId,
  candidateName,
  onClose,
  onSubmit,
}) => {
  const [comments, setComments] = useState("");
  const [decision, setDecision] = useState("");

  if (!open || interviewId === null) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decision || !comments.trim()) return;
    onSubmit({ interviewId, comments, result: decision });
    setComments("");
    setDecision("");
  };

  return (
    <div className={`modal ${open ? "active" : ""}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Provide Interview Feedback</h3>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Candidate Name</label>
            <input
              type="text"
              className="form-control"
              value={candidateName}
              readOnly
            />
          </div>

          <div className="form-group">
            <label className="form-label">Interview Feedback</label>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Write feedback here..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Hiring Decision</label>
            <div className="radio-group">
              {["Strong Hire", "Hire", "No Hire"].map((opt) => (
                <label key={opt} className="radio-option">
                  <input
                    type="radio"
                    name="decision"
                    value={opt}
                    checked={decision === opt}
                    onChange={(e) => setDecision(e.target.value)}
                    required
                  />
                  <span
                    className={`radio-label ${opt
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
