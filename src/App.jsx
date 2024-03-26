import { useEffect, useState } from "react";
import "./App.css";
import RunConfigurator from "./components/RunConfigurator";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";

function App() {
    const [hyperparams, setHyperParams] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0); // FORCE TO RUN RESULT TAB WHEN RUNING ENGINE

    axios.defaults.baseURL = "http://localhost:5000/api";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    const models = {
        models: [
            {
                label: "Model 1",
                value: "Model 1",
            },
            {
                label: "Model 2",
                value: "Model 2",
            },
            {
                label: "Model 3",
                value: "Model 3",
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
            {/* SIDEBAR */}
            <div className='sidebar'>
                <RunConfigurator
                    Title='Run A'
                    models={models.models}
                    datasets={datasets.datasets}
                />
                <RunConfigurator
                    Title='Run B'
                    models={models.models}
                    datasets={datasets.datasets}
                />
            </div>
            {/* RHS TABS */}
            <div className='tabs'>
                <Tabs
                    selectedIndex={selectedIndex}
                    onSelect={(index) => setSelectedIndex(index)}
                >
                    <TabList>
                        <Tab>
                            <div className='tabTitle'>Title 1</div>
                        </Tab>
                        <Tab>
                            <div className='tabTitle'>Title 2</div>
                        </Tab>
                        <Tab>
                            <div className='tabTitle'>Title 3</div>
                        </Tab>
                        <Tab>
                            <div className='tabTitle'>Title 4</div>
                        </Tab>
                        <Tab>
                            <div className='tabTitle'>Title 5</div>
                        </Tab>
                        <Tab>
                            <div className='tabTitle'>Title 6</div>
                        </Tab>
                        <Tab>
                            <div className='tabTitle'>Title 7</div>
                        </Tab>
                        <Tab>
                            <div className='tabTitle'>Title 9</div>
                        </Tab>
                    </TabList>
                    <TabPanel>
                        <div>this is a div</div>
                    </TabPanel>
                    <TabPanel>
                        <div>This is another div</div>
                    </TabPanel>
                    <TabPanel>
                        <div>Your mother</div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}

export default App;
