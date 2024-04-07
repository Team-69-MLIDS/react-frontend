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
        runid: "",
        model_name: "",
        dataset: "",
        hyperparameters: null,
    });

    axios.defaults.baseURL = "http://localhost:5000/api";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    useEffect(() => {
        console.log(runConfig); // This will log the updated runConfig state
    }, [runConfig]);

    const handleModelChange = (inputName, model) => {
        setSelectedModel(model.value); // Update selected model in state
    };

    const handleDatasetChange = (inputName, selectedDataset) => {
        setSelectedDataset(selectedDataset.value); // Update selected dataset in state
    };

    const handleRunIDChange = (e) => {
        setRunConfig((prevValues) => ({
            ...prevValues,
            runid: e.target.value,
        }));
    };

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
            setRunConfig((prevValues) => ({
                ...prevValues,
                model_name: selectedModel,
            }));
        }
    }, [selectedModel]);

    // Sets dataset in runconfig when dataset changes
    useEffect(() => {
        setRunConfig((prevValues) => ({
            ...prevValues,
            dataset: selectedDataset ? selectedDataset : null,
        }));
    }, [selectedDataset]);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/run", runConfig);
            console.log(response.data);
            onSubmit(response.data);
        } catch (error) {
            console.error("Error running engine: ", error);
            throw error;
        }
        return false;
    };

    useEffect(() => {
        const submitRun = async () => {
            const response = await axios.post("/run");
        };
    }, []);

    return (
        <div className='runConfigurator'>
            <div className='configuratorOptions'>
                <form onSubmit={handleSubmit} action=''>
                    <input
                        type='text'
                        name='RunID'
                        id='RunID'
                        placeholder='Enter RunID'
                        onChange={handleRunIDChange}
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
