import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Popup.css';

const Popup = ({ isVisible, position, width, height, onClose, children }) => {
  const [popUpVisible, setPopUpVisible] = useState(isVisible);

  useEffect(() => {
    setPopUpVisible(isVisible);
  }, [isVisible]);

  const handleClickOutside = (event) => {
    if (popUpVisible && event.target.classList.contains('popup-overlay')) {
      setPopUpVisible(false);
      onClose();
    }
  };

  return (
    <div className={`popup popup-${position} ${popUpVisible ? 'popup-visible' : 'popup-hidden'}`}>
      <div className="popup-content" style={{ width: `${width}%`, height: `${height}%` }}>
        {children}
      </div>
      <div className="popup-overlay" onClick={handleClickOutside}></div>
    </div>
  );
};

Popup.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Popup;
