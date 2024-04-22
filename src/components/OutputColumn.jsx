import "../App.css";
import OutputTable from "./OutputTable";
const OutputColumn = ({ algorithm, tableData, overallData, matrix }) => {
    const textPrompts = [
        "Average Accuracy: ",
        "Average Precision: ",
        "Average Recall: ",
        "Average F1: ",
        "Unrounded F1: ",
        "Macro Average: ",
        "Weighted Average: ",
    ];
    const keys = Object.keys(overallData);
    return (
        <div className='outputColumn'>
            <h3>{algorithm}</h3>
            <div className='outputTable'>
                <OutputTable data={tableData} />
            </div>
            <div className='averageValues'>
                {textPrompts.map((prompt, index) => (
                    <p key={index}>
                        {prompt}
                        {overallData[keys[index]].toFixed(2)}
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
