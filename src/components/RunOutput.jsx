import "../App.css";
import OutputColumn from "./OutputColumn";
import Collapsible from "react-collapsible";

const RunOutput = ({ RunTitle, model, dataset, table, overall, matrices }) => {
    const keys = Object.keys(table);
    return (
        <div className='runOutput'>
            <div className='outputHeading'>
                <h2>{RunTitle}</h2>
                <h3>Model: {model.toUpperCase()}</h3>
                <h3>Dataset: {dataset}</h3>
            </div>
            <div className='runOutputColumns'>
                {keys.map((key) => (
                    <Collapsible trigger={key} transitionTime={0.1} key={key}>
                        <OutputColumn
                            algorithm={key}
                            tableData={table[key]}
                            overallData={overall[key]}
                            matrix={matrices[key]}
                        />
                    </Collapsible>
                ))}
            </div>
            <div className='outputHyperparameters'></div>
        </div>
    );
};

export default RunOutput;
