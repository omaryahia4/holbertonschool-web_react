export default function CourseListRow({
    isHeader = false,
    textFirstCell = '',
    textSecondCell = null
}) {
    return (
        <tr className={isHeader ? "bg-[color:theme(--color-table-header)]/45" : "bg-[color:theme(--color-table-rows)]/66"}>
        isHeader ? (
            <tr>
                <th colSpan={textSecondCell ? 1 : 2}>{textFirstCell}</th>
                {textSecondCell ? <th>{textSecondCell}</th> : null}
            </tr>
        ) : (
            <tr>
                <td>{textFirstCell}</td>
                <td>{textSecondCell}</td>
            </tr>
        )
        </tr>
    )
}
