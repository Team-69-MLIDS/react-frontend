import "../App.css";
import OutputColumn from "./OutputColumn";

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
                {/* <OutputColumn
                    algorithm={keys[0]}
                    tableData={table[keys[0]]}
                    overallData={overall[keys[0]]}
                    matrix={matrices[keys[0]]}
                />
                <OutputColumn
                    algorithm={keys[1]}
                    tableData={table[keys[1]]}
                    overallData={overall[keys[1]]}
                    matrix={matrices[keys[1]]}
                />
                <OutputColumn
                    algorithm={keys[2]}
                    tableData={table[keys[2]]}
                    overallData={overall[keys[2]]}
                    matrix={matrices[keys[2]]}
                /> */}
            </div>
            <div className='outputHyperparameters'></div>
        </div>
    );
};

export default RunOutput;
