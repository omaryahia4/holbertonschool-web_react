import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow Component', () => {

  it('renders one <th> with colspan=2 when isHeader is true and textSecondCell is null', () => {
    render(<CourseListRow isHeader={true} textFirstCell="H1" textSecondCell={null} />);

    const thElement = screen.getByText('H1');
    expect(thElement).toBeInTheDocument();
    expect(thElement).toHaveAttribute('colspan', '2');
  });

  it('renders two <th> cells when isHeader is true and textSecondCell is present', () => {
    render(<CourseListRow isHeader={true} textFirstCell="H1" textSecondCell="H2" />);

    const thFirstCell = screen.getByText('H1');
    const thSecondCell = screen.getByText('H2');

    expect(thFirstCell).toBeInTheDocument();
    expect(thSecondCell).toBeInTheDocument();
    expect(thFirstCell.tagName.toLowerCase()).toBe('th');
    expect(thSecondCell.tagName.toLowerCase()).toBe('th');
  });


  it('renders two <td> elements when isHeader is false', () => {
    render(<CourseListRow isHeader={false} textFirstCell="C1" textSecondCell="C2" />);

    const tdFirstCell = screen.getByText('C1');
    const tdSecondCell = screen.getByText('C2');

    expect(tdFirstCell).toBeInTheDocument();
    expect(tdSecondCell).toBeInTheDocument();
    expect(tdFirstCell.tagName.toLowerCase()).toBe('td');
    expect(tdSecondCell.tagName.toLowerCase()).toBe('td');
  });

  it('should render header row with background color #deb5b545 when isHeader is true', () => {
    const { container } = render(<CourseListRow isHeader textFirstCell="Header" textSecondCell="Second Header" />);
    const row = container.querySelector('tr');
    expect(row).toHaveStyle('background-color: #deb5b545');
  });

  it('should render header row with background color #deb5b545 when isHeader is true and secondTextCell is not null', () => {
    const { container } = render(<CourseListRow isHeader textFirstCell="Header" textSecondCell="Second Header" />);
    const row = container.querySelector('tr');
    expect(row).toHaveStyle('background-color: #deb5b545');
  });

  it('should render regular row with background color #f5f5f5ab when isHeader is false', () => {
    const { container } = render(<CourseListRow textFirstCell="Row 1" textSecondCell="Row 2" />);
    const row = container.querySelector('tr');
    expect(row).toHaveStyle('background-color: #f5f5f5ab');
  });

});