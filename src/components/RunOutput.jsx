import "../App.css";
import OutputColumn from "./OutputColumn";

const RunOutput = ({ RunTitle, model, dataset, table, overall, matrices }) => {
    const tablekeys = Object.keys(table);
    const overallKeys = Object.keys(overall);
    const matrixKeys = Object.keys(matrices);
    return (
        <div className='runOutput'>
            <div className='outputHeading'>
                <h1>{RunTitle}</h1>
                <h2>Model: {model.toUpperCase()}</h2>
                <h2>Dataset: {dataset}</h2>
            </div>
            <div className='runOutputColumns'>
                <OutputColumn
                    algorithm={tablekeys[0]}
                    tableData={table[tablekeys[0]]}
                    overallData={overall[overallKeys[0]]}
                    matrix={matrices[matrixKeys[0]]}
                />
                <OutputColumn
                    algorithm={tablekeys[1]}
                    tableData={table[tablekeys[1]]}
                    overallData={overall[overallKeys[1]]}
                    matrix={matrices[matrixKeys[1]]}
                />
                <OutputColumn
                    algorithm={tablekeys[2]}
                    tableData={table[tablekeys[2]]}
                    overallData={overall[overallKeys[2]]}
                    matrix={matrices[matrixKeys[2]]}
                />
            </div>
            <div className='outputHyperparameters'></div>
        </div>
    );
};

export default RunOutput;
