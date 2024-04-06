import "../App.css";
import Dropdown from "./Dropdown";
import { useState, useEffect } from "react";
import axios from "axios";
import HyperparamMenu from "./HyperparamMenu";

const RunConfigurator = ({ models, datasets, onSubmit }) => {
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedDataset, setSelectedDataset] = useState(null);
    const [hyperparams, setHyperParams] = useState(null);
    const [runConfig, setRunConfig] = useState({
        runID: "",
        model: "",
        dataset: "",
        hyperparameters: null,
    });

    axios.defaults.baseURL = "http://localhost:5000/api";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    useEffect(() => {
        console.log(runConfig); // This will log the updated runConfig state
    }, [runConfig]);

    const handleModelChange = (inputName, selectedModel) => {
        setSelectedModel(selectedModel.value); // Update selected model in state
    };

    useEffect(() => {
        console.log(selectedModel);
    }, [selectedModel]);
    // HYPERPARAMS

    // Get hyperparameters for currently selected model
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
            fetchHyperParams();
        }
    }, [selectedModel]);

    // Logs hyperparameters when they change FOR TESTING DELETE LATER
    useEffect(() => {
        if (hyperparams) {
            console.log(hyperparams);
        }
    }, [hyperparams]);

    // Set hyperparamValues
    const handleHyperparamChange = (hyperparamValues) => {
        setRunConfig((prevValues) => ({
            ...prevValues,
            hyperparameters: hyperparamValues,
        }));
    };

    const handleDatasetChange = (inputName, selectedDataset) => {
        setSelectedDataset(selectedDataset.value); // Update selected dataset in state
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(event); // Use to check if values are indexing correctly

        setRunConfig((prevValues) => ({
            ...prevValues,
            runID: event.target[0].value,
            model: selectedModel,
            dataset: "data\\" + selectedDataset,
        }));

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
                    {/* HYPERPARAMS */}

                    {hyperparams != null ? (
                        <HyperparamMenu
                            params={hyperparams}
                            onInputChange={handleHyperparamChange}
                        />
                    ) : null}
                    <button type='submit'>Run</button>
                </form>
            </div>
        </div>
    );
};

export default RunConfigurator;
