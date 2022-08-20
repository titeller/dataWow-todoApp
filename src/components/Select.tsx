import React, { useState, useEffect, useRef, FC, RefObject } from 'react';

import SelectSrc from '../images/select.png';

interface IOption {
  label: string;
  value: string;
};

type Props = {
  options: IOption[];
  onSelectChange: (value: string) => void;
};

const Dropdown:FC<Props> = ({ options, onSelectChange }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(options[0]);
  let ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: any) => {
      if (isSelectOpen && ref.current && !ref.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    }
  }, [isSelectOpen]);

  const onHandleSelectChange = (option: any) => {
    setCurrentOption(option);
    onSelectChange(option.value);
  }

  return (
    <div
      className="Select-wrapper"
      onClick={() => setIsSelectOpen(!isSelectOpen)}>
      <div>
        <div className="Select-input">
          <div className="Select-value">{currentOption.label}</div>
          <div>
            <img
              src={SelectSrc}
              alt="todo-select"
              className="Select-img"
            />
          </div>
        </div>
        <div className="Select" ref={ref as RefObject<HTMLDivElement>}>
          <ul
            className={`Select-menus ${isSelectOpen ? 'open' : ''}`}
          >
            {options.map((option, index) => (
              <li
                key={index} 
                value={option.value}
                onClick={() => onHandleSelectChange(option)}
              >
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Dropdown;
