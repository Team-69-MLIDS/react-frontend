import "../App.css";
import OutputTable from "./OutputTable";
const OutputColumn = ({ algorithm, tableData, overallData, matrix }) => {
    const textPrompts = {
        accuracy: "Average Accuracy: ",
        macro_avg_precision: "Macro Average Precision: ",
        macro_avg_recall: "Macro Average Recall: ",
        macro_avg_f1_score: "Macro Average F1: ",
        macro_avg_support: "Macro Average Support: ",
        weighted_avg_f1_score: "Weighted Average F1: ",
        weighted_avg_precision: "Weighted Average Precision: ",
        weighted_avg_recall: "Weighted Average Recall: ",
        weighted_avg_support: "Weighted Average Support: ",
    };
    const keys = Object.keys(overallData);
    return (
        <div className='outputColumn'>
            <h3>{algorithm}</h3>
            <div className='outputTable'>
                <OutputTable data={tableData} />
            </div>
            <div className='averageValues'>
                {keys.map((key, index) => (
                    <p key={index}>
                        {textPrompts[key]}
                        {overallData[key].toFixed(6)}
                    </p>
                ))}
            </div>
            <div className='confusionMatrix'>
                <img
                    className='confusionMatrixImage'
                    src={"data:image/png;base64," + matrix}
                />
            </div>
        </div>
    );
};

export default OutputColumn;
