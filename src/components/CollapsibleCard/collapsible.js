import React, { useState } from 'react';
import './style.css';

const Collapsible = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleCollapsible = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className={`collapsible ${isOpen ? 'open' : ''}`}>
        <div className="collapsible-header" onClick={toggleCollapsible}>
          <h3>{title}</h3>
        {isOpen ? '-':'+'} 
        </div>
        {isOpen && <div className="collapsible-content">{children}</div>}
      </div>
    );
  };
  
  export default Collapsible;