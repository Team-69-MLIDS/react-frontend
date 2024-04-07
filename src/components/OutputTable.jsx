import { useEffect } from "react";
import "../App.css";

const OutputTable = ({ data }) => {
    function createData(index, row) {
        return {
            Attack: index,
            Precision: row.precision.toFixed(2),
            Recall: row.recall.toFixed(2),
            f1: row.f1_score.toFixed(2),
            Support: Math.round(row.support),
        };
    }

    // Create rows array
    const rows = Object.keys(data).map((key) => {
        return createData(key, data[key]);
    });

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Atk</th>
                    <th>Prc</th>
                    <th>Rcl</th>
                    <th>F1</th>
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
