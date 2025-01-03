import React from 'react';

const CourseListRow = ({ isHeader = false, textFirstCell = '', textSecondCell = null }) => {
  const rowStyle = {
    backgroundColor: isHeader ? '#deb5b545' : '#f5f5f5ab',
  };

  return (
    isHeader ? (
      <tr style={rowStyle}>
        <th colSpan={textSecondCell ? 1 : 2}>{textFirstCell}</th>
        {textSecondCell ? <th>{textSecondCell}</th> : null}
      </tr>
    ) : (
      <tr style={rowStyle}>
        <td>{textFirstCell}</td>
        <td>{textSecondCell}</td>
      </tr>
    )
  )
};

export default CourseListRow;
