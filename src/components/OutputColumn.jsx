import "../App.css";
import OutputTable from "./OutputTable";
const OutputColumn = ({ algorithm, tableData, overallData }) => {
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
                        {overallData[keys[index]]}
                    </p>
                ))}
            </div>
            <div className='confusionMatrix'></div>
        </div>
    );
};

export default OutputColumn;
