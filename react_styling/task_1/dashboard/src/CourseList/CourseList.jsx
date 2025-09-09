import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';

function CourseList({ courses = [] }) {
    return (
        <div className='w-4/5 max-w-[90%] min-w-[80%] mx-auto my-8'>
            {
                courses.length > 0 ?
                    (
                        <table id='CourseList' className="w-4/5 max-w-[90%] min-w-[80%] mx-auto my-8 border-collapse border border-gray-300">
                            <thead>
                                <CourseListRow
                                    textFirstCell="Available courses"
                                    isHeader={true}
                                />
                                <CourseListRow
                                    textFirstCell="Course name"
                                    textSecondCell="Credit"
                                    isHeader={true}
                                />
                            </thead>
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
                        </table>
                    ) : (
                        <table id='CourseList' className='w-full border-collapse border border-gray-300'>
                            <thead>
                                <CourseListRow
                                    isHeader={true}
                                    textFirstCell="No course available yet"
                                />
                            </thead>
                        </table>
                    )
            }
        </div>
    );
}

const CourseListWithLogging = WithLogging(CourseList);
export default CourseListWithLogging