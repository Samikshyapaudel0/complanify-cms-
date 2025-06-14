import React from 'react';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <div className={`
      card
      ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;