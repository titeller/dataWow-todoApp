import React, { useState, useEffect, useRef, FC, RefObject } from 'react';
import { DropdownType } from '../@types/dropdown';

import DropdownSrc from '../images/dropdown.png';

const Dropdown:FC<DropdownType> = ({ children }) => {
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
      className="Dropdown-wrapper"
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
      <div>
        <img
          src={DropdownSrc}
          alt="todo-dropdown"
          className="Dropdown-img"
        />
        <div className="Dropdown" ref={ref as RefObject<HTMLDivElement>}>
          <ul
            className={`Dropdown-menus ${isDropdownOpen ? 'open' : ''}`}
          >
            {children}
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Dropdown;
