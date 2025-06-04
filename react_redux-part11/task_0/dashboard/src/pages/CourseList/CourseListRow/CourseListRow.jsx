import React from 'react'

const CourseListRow = ({ isHeader = false, textFirstCell = '', textSecondCell = null, className = '', }) => {
    return (
      <tr>
        {isHeader ? (
          textSecondCell === null ? (
            <th className={className} colSpan="2">{textFirstCell}</th>
          ) : (
            <>
              <th className={className}>{textFirstCell}</th>
              <th className={className}>{textSecondCell}</th>
            </>
          )
        ) : (
          <>
            <td className={className}>{textFirstCell}</td>
            <td className={className}>{textSecondCell}</td>
          </>
        )}
      </tr>
    );
  };

export default CourseListRow;