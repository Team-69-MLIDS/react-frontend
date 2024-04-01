import { useEffect } from "react";
import "../App.css";

const OutputTable = ({ data }) => {
    function createData(Attack, Precision, Recall, f1, Support) {
        return { Attack, Precision, Recall, f1, Support };
    }
    const rows = data.map((row, index) => {
        // For each row, call createData with the appropriate parameters
        // console.log(row);
        return createData(
            index,
            row.precision,
            row.recall,
            row.f1_score,
            row.support
        );
    });

    // useEffect(() => { //FOR TESTING
    //     console.log(rows);
    // }, [rows]);
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Atk</th>
                    <th>Prc</th>
                    <th>Rcl</th>
                    <th>f1</th>
                    <th>Sup</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        <td>{row.Attack}</td>
                        <td>{row.Precision}</td>
                        <td>{row.Recall}</td>
                        <td>{row.f1}</td>
                        <td>{row.Support}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default OutputTable;
