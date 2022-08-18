import React from 'react'

type ProgressTypes = {
  todosCompletedPercent: number;
  todosCompletedCount: number;
};

const Progress = ({
  todosCompletedPercent,
  todosCompletedCount
}: ProgressTypes) => {
  
  return (
    <div className="Progress">
      <p className="Progress-label">
        Progress
      </p>
      <div className="Progress-line">
        <div className="Progress-line-current" style={{ width: `${todosCompletedPercent}%` }}>
        </div>
      </div>
      <p className="Progress-text">
        {`${todosCompletedCount} completed`}
      </p>
    </div>
  )
}

export default Progress
