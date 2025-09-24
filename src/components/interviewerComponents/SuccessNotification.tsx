import { useEffect, useState } from "react";
import "../../assets/stlyes/interviewerStyles/notification.css";

type Props = {
  message: string;
  show: boolean;
  onClose: () => void;
};

const SuccessNotification: React.FC<Props> = ({ message, show, onClose }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div className={`success-notification ${visible ? "show" : ""}`}>
      <div className="success-content">
        <span className="success-icon">✓</span>
        <span className="success-text">{message}</span>
      </div>
    </div>
  );
};

export default SuccessNotification;
