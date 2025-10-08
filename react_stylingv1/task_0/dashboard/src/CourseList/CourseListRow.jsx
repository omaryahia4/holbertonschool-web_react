import '../main.css';

export default function CourseListRow({
    isHeader = false,
    textFirstCell = '',
    textSecondCell = null
}) {
    return (
        isHeader ? (
            <tr className="header-row">
                <th colSpan={textSecondCell ? 1 : 2}>{textFirstCell}</th>
                {textSecondCell ? <th>{textSecondCell}</th> : null}
            </tr>
        ) : (
            <tr className="data-row">
                <td>{textFirstCell}</td>
                <td>{textSecondCell}</td>
            </tr>
        )
    )
}
