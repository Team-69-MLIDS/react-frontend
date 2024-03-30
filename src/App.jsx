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
    //const [models, setModels] = useState(null);

    axios.defaults.baseURL = "http://localhost:5000/api";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    const models = {
        models: [
            {
                label: "LCCDE",
                value: "LCCDE",
            },
            {
                label: "Treebased",
                value: "Treebased",
            },
            {
                label: "MTH",
                value: "MTH",
            },
        ],
    };

    const datasets = {
        datasets: [
            {
                label: "Dataset 1",
                value: "Dataset 1",
            },
            {
                label: "Dataset 2",
                value: "Dataset 2",
            },
            {
                label: "Dataset 3",
                value: "Dataset 3",
            },
        ],
    };

    const handleRunConfiguratorSubmit = () => {
        setSelectedIndex(0); // Change selected index to Recent Run tab
    };

    // const fetchModels = async () => {
    //     try {
    //         const response = await axios.get("/algorithm_names");
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error fetching models: ", error);
    //         throw error;
    //     }
    // };

    // useEffect(() => {
    //     fetchModels.then((data) => setModels(data));
    // }, []);

    // useEffect(() => {
    //     console.log(models);
    // }, [models]);

    const fetchHyperParams = async () => {
        try {
            const response = await axios.get("/hyperparameters");
            return response.data;
        } catch (error) {
            console.error("Error fetching hyperparameters:", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchHyperParams().then((data) => setHyperParams(data));
    }, []);

    useEffect(() => {
        console.log(hyperparams);
    }, [hyperparams]);

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
                            models={models.models}
                            datasets={datasets.datasets}
                            onSubmit={handleRunConfiguratorSubmit}
                        />
                        <RunConfigurator
                            Title='Run B'
                            models={models.models}
                            datasets={datasets.datasets}
                            onSubmit={handleRunConfiguratorSubmit}
                        />
                    </TabPanel>
                    <TabPanel>
                        <div>This is another div</div>
                    </TabPanel>
                </Tabs>
            </div>
            {/* Compare Window */}
            <div className='compare'>
                <div className='outputContainer'>
                    <RunOutput RunTitle='Run A' model='LCCDE' />
                    <RunOutput RunTitle='Run B' model='LCCDE' />
                </div>
            </div>
        </div>
    );
}

export default App;
