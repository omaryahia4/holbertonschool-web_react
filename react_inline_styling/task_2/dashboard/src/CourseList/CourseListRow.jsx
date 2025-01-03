import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#deb5b545',
  },
  defaultRow: {
    backgroundColor: '#f5f5f5ab',
  },
  th: {
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
    padding: '8px',
  },
  td: {
    textAlign: 'left',
    padding: '8px',
  },
});

const CourseListRow = ({ isHeader = false, textFirstCell = '', textSecondCell = null }) => {
  return isHeader ? (
    <tr className={css(styles.headerRow)}>
      <th
        
        colSpan={textSecondCell ? 1 : 2}
      >
        {textFirstCell}
      </th>
      {textSecondCell && (
        <th className={css(styles.th)}>{textSecondCell}</th>
      )}
    </tr>
  ) : (
    <tr className={css(styles.defaultRow)}>
      <td className={css(styles.td)}>{textFirstCell}</td>
      <td className={css(styles.td)}>{textSecondCell}</td>
    </tr>
  );
};

export default CourseListRow;
