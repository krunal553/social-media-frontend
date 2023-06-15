import React from 'react';
import './Message.css'

const Message = ({ variant, children }) => {
  const styles = {
    backgroundColor: variant === 'success' ? '#d4edda' : variant === 'danger' ? '#f8d7da' : '#fff3cd',
    color: variant === 'success' ? '#155724' : variant === 'danger' ? '#721c24' : '#856404',
    padding: '1rem',
    border: `1px solid ${variant === 'success' ? '#c3e6cb' : variant === 'danger' ? '#f5c6cb' : '#ffeeba'}`,
    borderRadius: '0.25rem'
  };

  return (
    <div style={styles}>
        {children}
    </div>
  )
}

export default Message
