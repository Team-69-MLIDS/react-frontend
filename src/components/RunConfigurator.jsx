import "../App.css";
import Dropdown from "./Dropdown";
import { useState, useEffect } from "react";
import axios from "axios";

const RunConfigurator = ({ Title, models, datasets, onSubmit }) => {
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedDataset, setSelectedDataset] = useState(null);
    const [hyperparams, setHyperParams] = useState(null);
    const [runConfig, setRunConfig] = useState({
        runID: "",
        learningRate: -0.1,
        depth: -0.1,
        model: "",
        dataset: "",
    });

    axios.defaults.baseURL = "http://localhost:5000/api";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    useEffect(() => {
        console.log(runConfig); // This will log the updated runConfig state
    }, [runConfig]); // This useEffect will run whenever runConfig state changes

    const handleModelChange = (inputName, selectedModel) => {
        setSelectedModel(selectedModel.value); // Update selected algorithm in state
    };

    // HYPERPARAMS

    useEffect(() => {
        const fetchHyperParams = async () => {
            try {
                const response = await axios.get("/hyperparameters", {
                    params: {
                        model: selectedModel,
                    },
                });
                setHyperParams(response.data);
            } catch (error) {
                console.error("Error fetching hyperparameters:", error);
                throw error;
            }
        };
        if (selectedModel) {
            console.log(selectedModel);
            fetchHyperParams();
        }
    }, [selectedModel]);

    useEffect(() => {
        if (hyperparams) {
            console.log(hyperparams);
        }
    }, [hyperparams]);

    const handleDatasetChange = (inputName, selectedDataset) => {
        setSelectedDataset(selectedDataset); // Update selected dataset in state
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        //console.log(event); // Use to check if values are indexing correctly

        setRunConfig({
            runID: event.target[0].value,
            learningRate: event.target[3].value,
            depth: event.target[4].value,
            model: selectedModel.value,
            dataset: "data\\" + selectedDataset.value,
        });

        // USEEFFECT ON RUNCONFIG CHANGE MAKES /RUN API CALL

        if (onSubmit) {
            onSubmit();
        }
    };

    useEffect(() => {
        const submitRun = async () => {
            const response = await axios.post("/run");
        };
    }, []);

    return (
        <div className='runConfigurator'>
            <h1 className='runTitle'>{Title}</h1>
            <div className='configuratorOptions'>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='RunID'
                        id='RunID'
                        placeholder='Enter RunID'
                    />
                    <div className='configuratorDropdowns'>
                        <Dropdown
                            placeholder='Select Model'
                            options={models}
                            inputName='model'
                            onChange={handleModelChange}
                        />
                        <Dropdown
                            placeholder='Select Dataset'
                            options={datasets}
                            inputName='datasets'
                            onChange={handleDatasetChange}
                        />
                    </div>
                    <div className='modelInputs'>
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
