import { useEffect, useState } from "react";
import "./App.css";
import RunConfigurator from "./components/RunConfigurator";
import RunOutput from "./components/RunOutput";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";

function App() {
    const [hyperparams, setHyperParams] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0); // FORCE TO RUN RESULT TAB WHEN RUNING ENGINE
    const [models, setModels] = useState(null);
    const [datasets, setDatasets] = useState(null);

    axios.defaults.baseURL = "http://localhost:5000/api";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    const testRunOutput = {
        confusion_matrices: {
            property1: [[]],
            property2: [],
        },
        ensemble: {
            property1: [
                // Algorithm 1
                {
                    precision: 0,
                    recall: 0,
                    f1_score: 0,
                    support: 0,
                },
            ],
            property2: [
                // Algorithm 2
                {
                    precision: 0,
                    recall: 0,
                    f1_score: 0,
                    support: 0,
                },
            ],
            property3: [
                // Algorithm 3
                {
                    precision: 0,
                    recall: 0,
                    f1_score: 0,
                    support: 0,
                },
            ],
        },
        overall: {
            property1: {
                avg_accuracy: 0,
                avg_precision: 0,
                avg_recall: 0,
                avg_f1: 0,
                unrounded_f1: [1.69, 1.54],
                macro_avg: 0,
                weighted_avg: 0,
            },
            property2: {
                avg_accuracy: 0,
                avg_precision: 0,
                avg_recall: 0,
                avg_f1: 0,
                unrounded_f1: [1.69, 1.54],
                macro_avg: 0,
                weighted_avg: 0,
            },
        },
        model: "model name",
        runid: "run id",
        timestamp: "timestamp",
    };

    const handleRunConfiguratorSubmit = () => {
        setSelectedIndex(0); // Change selected index to Recent Run tab
    };

    // MODELS

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get("/model_names");
                setModels(response.data);
            } catch (error) {
                console.error("Error fetching models: ", error);
                throw error;
            }
        };
        fetchModels();
    }, []);

    useEffect(() => {
        console.log(models);
    }, [models]);

    // DATASET

    useEffect(() => {
        const fetchDatasets = async () => {
            try {
                const response = await axios.get("/datasets");
                let subsstring = response.data.map((str) => str.substring(5));
                setDatasets(subsstring);
            } catch (error) {
                console.error("Error fetching datasets: ", error);
                throw error;
            }
        };
        fetchDatasets();
    }, []);

    useEffect(() => {
        console.log(datasets);
    }, [datasets]);

    // HYPERPARAMS

    useEffect(() => {
        const fetchHyperParams = async () => {
            try {
                const response = await axios.get("/hyperparameters");
                setHyperParams(response.data);
            } catch (error) {
                console.error("Error fetching hyperparameters:", error);
                throw error;
            }
        };
        fetchHyperParams();
    }, []);

    // useEffect(() => {
    //     console.log(hyperparams);
    // }, [hyperparams]);

    if (!datasets || !models) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            {/* SIDEBAR Tabs */}
            <div className='sidebar'>
                <Tabs
                    selectedIndex={selectedIndex}
                    onSelect={(index) => setSelectedIndex(index)}
                >
                    <TabList>
                        <Tab>
                            <div className='tabTitle'>Config</div>
                        </Tab>
                        <Tab>
                            <div className='tabTitle'>Search</div>
                        </Tab>
                    </TabList>
                    <TabPanel>
                        <RunConfigurator
                            Title='Run A'
                            models={models}
                            datasets={datasets}
                            onSubmit={handleRunConfiguratorSubmit}
                        />
                        <RunConfigurator
                            Title='Run B'
                            models={models}
                            datasets={datasets}
                            onSubmit={handleRunConfiguratorSubmit}
                        />
                    </TabPanel>
                    <TabPanel>
                        <div>Your mother.</div>
                    </TabPanel>
                </Tabs>
            </div>
            {/* Compare Window */}
            <div className='compare'>
                <div className='outputContainer'>
                    <RunOutput
                        RunTitle={testRunOutput.runid}
                        model={testRunOutput.model}
                        algorithms={testRunOutput.ensemble}
                    />
                    <RunOutput
                        RunTitle={testRunOutput.runid}
                        model={testRunOutput.model}
                        algorithms={testRunOutput.ensemble}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
