import React from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 right-0 m-4 p-4 bg-green-500 text-white rounded-lg shadow-md z-50">
      <p>{message}</p>
      <button onClick={onClose} className="text-white hover:text-gray-200">
        Close
      </button>
    </div>
  );
};

export default Notification;