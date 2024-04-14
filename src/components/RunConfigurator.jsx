import "../App.css";
import Dropdown from "./Dropdown";
import { useState, useEffect } from "react";
import axios from "axios";
import HyperparamMenu from "./HyperparamMenu";

const RunConfigurator = ({ models, datasets, onSubmit, tweakRun, onButtonClick }) => {
    const [selectedModel, setSelectedModel] = useState(
        tweakRun ? tweakRun.detection_model_name : null
    );
    const [selectedDataset, setSelectedDataset] = useState(
        tweakRun ? tweakRun.dataset : null
    );
    const [hyperparams, setHyperParams] = useState(null);
    const [runConfig, setRunConfig] = useState({
        runid: "",
        model_name: tweakRun ? tweakRun.detection_model_name : "",
        dataset: tweakRun ? tweakRun.dataset : "",
        hyperparameters: tweakRun ? tweakRun.learner_configuration : null,
    });
    const [buttonClicked, setButtonClicked] = useState(false); // State variable to track button click

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
        if (!buttonClicked) {
            try {
                onButtonClick(true);
                setButtonClicked(true); // Disable button after first click
                const response = await axios.post("/run", runConfig);
                console.log(response.data);
                onSubmit(response.data);
            } catch (error) {
                console.error("Error running engine: ", error);
                throw error;
            } finally {
                onButtonClick(false);
                setButtonClicked(false); // Enable button after loading completes
            }
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
                            tweakValue={
                                tweakRun ? tweakRun.detection_model_name : null
                            }
                        />
                        <Dropdown
                            placeholder='Select Dataset'
                            options={datasets}
                            inputName='datasets'
                            onChange={handleDatasetChange}
                            tweakValue={tweakRun ? tweakRun.dataset : null}
                        />
                    </div>
                    {/* HYPERPARAMS */}

                    {hyperparams != null ? (
                        <HyperparamMenu
                            params={hyperparams}
                            onInputChange={handleHyperparamChange}
                        />
                    ) : null}
                    <button type='submit' disabled={buttonClicked}>Run</button>
                </form>
            </div>
        </div>
    );
};

export default RunConfigurator;
