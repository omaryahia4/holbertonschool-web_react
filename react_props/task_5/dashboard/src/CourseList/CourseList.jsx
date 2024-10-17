import React from 'react';
import './CourseList.css';
import CourseListRow from './CourseListRow';

const CourseList = ({ courses = [] }) => {
  return (
        <table id="CourseList">
        { courses.length > 0 ? 
        <>
          <thead className='table-title'>
            <CourseListRow textFirstCell="Available courses" isHeader={true} />
          </thead>
            <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />

          <tbody>
            {
              courses.map(course => (
                      <CourseListRow 
                        key={course.id} 
                        textFirstCell={course.name} 
                        textSecondCell={course.credit} 
                      />
                    ))
            }
          </tbody>
          </>
      :
        <thead className='table-title'>
          <CourseListRow textFirstCell="No course available yet" isHeader={true}/>
        </thead>
      }
    </table>

  );
};

export default CourseList;