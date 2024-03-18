import "../App.css";
import Dropdown from "./Dropdown";
import { useState, useEffect } from "react";

const RunConfigurator = ({ Title, algorithms, datasets }) => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
    const [selectedDataset, setSelectedDataset] = useState(null);

    const [runConfig, setRunConfig] = useState({
        runID: "",
        learningRate: -0.1,
        depth: -0.1,
        algorithm: "",
        dataset: "",
    });

    useEffect(() => {
        console.log(runConfig); // This will log the updated runConfig state
    }, [runConfig]); // This useEffect will run whenever runConfig state changes

    const handleAlgorithmChange = (inputName, selectedAlgorithm) => {
        setSelectedAlgorithm(selectedAlgorithm); // Update selected algorithm in state
    };

    const handleDatasetChange = (inputName, selectedDataset) => {
        setSelectedDataset(selectedDataset); // Update selected dataset in state
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(event);
        setRunConfig({
            runID: event.target[0].value,
            learningRate: event.target[3].value,
            depth: event.target[4].value,
            algorithm: selectedAlgorithm.value,
            dataset: selectedDataset.value,
        });

        console.log("Run ID: ", event.target[0].value);
        console.log("Learning Rate: ", event.target[2].value);
        console.log("Depth: ", event.target[3].value);
        console.log("Selected Algorithm: ", selectedAlgorithm.value);
    };

    return (
        <div className='runConfigurator'>
            <h1 className='runTitle'>{Title}</h1>
            <div className='ConfiguratorOptions'>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='RunID'
                        id='RunID'
                        placeholder='Enter RunID'
                    />
                    <Dropdown
                        placeholder='Select Algorithm'
                        options={algorithms}
                        inputName='algorithm'
                        onChange={handleAlgorithmChange}
                    />
                    <Dropdown
                        placeholder='Select Dataset'
                        options={datasets}
                        inputName='datasets'
                        onChange={handleDatasetChange}
                    />
                    <div className='algoInputs'>
                        <label htmlFor='LearningRate'>Learning Rate</label>
                        <input
                            type='float'
                            name='LearningRate'
                            id='LearningRate'
                            defaultValue={0.01}
                        />
                        <label htmlFor='Depth'>Depth</label>
                        <input
                            type='float'
                            name='Depth'
                            id='Depth'
                            defaultValue={0.89}
                        />
                    </div>
                    <button type='submit'>Run</button>
                </form>
            </div>
        </div>
    );
};

export default RunConfigurator;
