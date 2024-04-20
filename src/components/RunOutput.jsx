import "../App.css";
import OutputColumn from "./OutputColumn";
import Collapsible from "react-collapsible";

const RunOutput = ({ RunTitle, model, dataset, table, overall, matrices }) => {
    const keys = Object.keys(table);

    console.log("Table Keys: " + keys);
    return (
        <div className='runOutput'>
            <div className='outputHeading'>
                <h1>{RunTitle}</h1>
                <h2>Model: {model.toUpperCase()}</h2>
                <h2>Dataset: {dataset}</h2>
            </div>
            <div className='runOutputColumns'>
                {keys.map((key) => (
                    <OutputColumn
                        algorithm={key}
                        tableData={table[key]}
                        overallData={overall[key]}
                        matrix={matrices[key]}
                    />
                ))}
            </div>
            <div className='outputHyperparameters'></div>
        </div>
    );
};

export default RunOutput;
