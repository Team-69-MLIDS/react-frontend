import "../App.css";
import OutputColumn from "./OutputColumn";

const RunOutput = ({ RunTitle, model, table, overall }) => {
    const tablekeys = Object.keys(table);
    const overallKeys = Object.keys(overall);
    return (
        <div className='runOutput'>
            <div className='outputHeading'>
                <h1>{RunTitle}</h1>
                <h2>Model: {model}</h2>
            </div>
            <div className='runOutputColumns'>
                <OutputColumn
                    algorithm={tablekeys[0]}
                    tableData={table[tablekeys[0]]}
                    overallData={overall[overallKeys[0]]}
                />
                <OutputColumn
                    algorithm={tablekeys[1]}
                    tableData={table[tablekeys[1]]}
                    overallData={overall[overallKeys[1]]}
                />
                <OutputColumn
                    algorithm={tablekeys[2]}
                    tableData={table[tablekeys[2]]}
                    overallData={overall[overallKeys[2]]}
                />
            </div>
            <div className='outputHyperparameters'></div>
        </div>
    );
};

export default RunOutput;
