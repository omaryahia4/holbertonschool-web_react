import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import CourseListRow from './CourseListRow/CourseListRow';
import WithLogging from '../../components/HOC/WithLogging';

const styles = StyleSheet.create({
  courseList: {
    border: '1px solid black',
    borderCollapse: 'collapse',
    width: '100%',
  },
  th: {
    border: '1px solid black',
    textAlign: 'left',
    padding: '8px',
  },
  td: {
    border: '1px solid black',
    textAlign: 'left',
    padding: '8px',
  },
  tableTitle: {
    textAlign: 'center',
  },
});

export const CourseList = ({ courses = [] }) => {
  return (
    <table id="CourseList" className={css(styles.courseList)}>
      <thead>
        {courses.length > 0 ? (
          <>
            <CourseListRow
              isHeader={true}
              textFirstCell="Available courses"
              className={css(styles.th, styles.tableTitle)}
              colSpan={2}
            />
            <CourseListRow
              isHeader={true}
              textFirstCell="Course name"
              textSecondCell="Credit"
              className={css(styles.th)}
            />
          </>
        ) : (
          <CourseListRow
            isHeader={true}
            textFirstCell="No course available yet"
            className={css(styles.th, styles.tableTitle)}
            colSpan={2}
          />
        )}
      </thead>
      {courses.length > 0 && (
        <tbody>
          {courses.map((course) => (
            <CourseListRow
              key={course.id}
              textFirstCell={course.name}
              textSecondCell={course.credit}
              isHeader={false}
              className={css(styles.td)}
            />
          ))}
        </tbody>
      )}
    </table>
  );
};

export default WithLogging(CourseList);
