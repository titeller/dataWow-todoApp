import React, { useState, useEffect, useRef, ReactNode } from 'react';

import DropdownSrc from '../images/dropdown.png';

type Props = {
  children: ReactNode;
};

const Dropdown:React.FC<Props> = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (event: any) => {
      if (isDropdownOpen && ref.current && !ref.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    }
  }, [isDropdownOpen])
  return (
    <div
      className="dropdown-wrapper"
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
      <div>
        <img
          src={DropdownSrc}
          alt="todo-dropdown"
          className="dropdown-img"
        />
        <div className="dropdown" ref={ref as React.RefObject<HTMLDivElement>}>
          <ul
            className={`dropdown-menus ${isDropdownOpen ? 'open' : ''}`}
          >
            {children}
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Dropdown;
