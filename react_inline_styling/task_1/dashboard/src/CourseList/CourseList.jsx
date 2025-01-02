import React from 'react';
import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  courseList: {
    marginLeft: 'auto',
    marginRight: 'auto',
    border: 'groove',
    width: '100%',
  },
  tableTitle: {
    textAlign: 'center',
  },
  th: {
    borderBottom: '1px solid rgb(178, 178, 178)',
    textAlign: 'left',
  },
});

export const CourseList = ({ courses = [] }) => {
  return (
    <table id="CourseList" className={css(styles.courseList)}>
      {courses.length > 0 ? (
        <>
          <thead className={css(styles.tableTitle)}>
            <CourseListRow textFirstCell="Available courses" isHeader={true} />
            <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
          </thead>
          <tbody>
            {courses.map((course) => (
              <CourseListRow
                key={course.id}
                textFirstCell={course.name}
                textSecondCell={course.credit}
              />
            ))}
          </tbody>
        </>
      ) : (
        <thead className={css(styles.tableTitle)}>
          <CourseListRow textFirstCell="No course available yet" isHeader={true} />
        </thead>
      )}
    </table>
  );
};

export default WithLogging(CourseList);
