import "../App.css";
import OutputColumn from "./OutputColumn";
import Collapsible from "react-collapsible";

const RunOutput = ({ RunTitle, model, dataset, table, overall, matrices }) => {
    const keys = Object.keys(table);
    return (
        <div className='runOutput'>
            <div className='outputHeading'>
                <h2>{RunTitle}</h2>
                <h3>Model: {model}</h3>
                <h3>Dataset: {dataset}</h3>
            </div>
            {/* I ADDED THIS DIV TO SEPARATE THE MAIN OUTPUT FROM THE REST */}
            <div className='mainOutputColumn'>
                <Collapsible
                    trigger={model} //USED THE MODEL INSTEAD OF THE KEYS TO MAKE SURE I ALWAYS FIND THE MAIN
                    transitionTime={0.1}
                    key={model}
                    open={true} //SET THE MAIN TO BE OPEN BY DEFAULT
                >
                    <OutputColumn // THE ACTUAL COLUMN
                        algorithm={model}
                        tableData={table[model]}
                        overallData={overall[model]}
                        matrix={matrices[model]}
                    />
                </Collapsible>
            </div>
            <div className='runOutputColumns'>
                {keys.map((key) =>
                    key === model ? null : ( // SKIPS RENDERING OF THE MAIN COLUMN IN THE CLASSIFIER SECTION
                        <div className='columnContainer' key={key}>
                            <Collapsible trigger={key} transitionTime={0.1}>
                                <OutputColumn
                                    algorithm={key}
                                    tableData={table[key]}
                                    overallData={overall[key]}
                                    matrix={matrices[key]}
                                />
                            </Collapsible>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default RunOutput;
