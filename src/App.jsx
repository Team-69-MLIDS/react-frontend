import { useEffect, useState } from "react";
import "./App.css";
import RunConfigurator from "./components/RunConfigurator";
import RunOutput from "./components/RunOutput";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Fuse from "fuse.js";
import SearchOptions from "./components/SearchOptions";
import ReactLoading from 'react-loading';

function App() {
    const [models, setModels] = useState(null);
    const [datasets, setDatasets] = useState(null);
    const [leftOutput, setLeftOutput] = useState(null);
    const [rightOutput, setRightOutput] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [runData, setRunData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [tweakRun, setTweakRun] = useState(null);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    axios.defaults.baseURL = "http://localhost:5000/api";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    
    const fuse = new Fuse(runData, {
        keys: ["run_tag", "timestamp"],
        threshold: .1, //fuzzy value
    });

    const onButtonClick = (state) => {
        setIsLoading(state);
    }

    useEffect(() => {
        console.log(leftOutput);
    }, [leftOutput]);

    // Perform Search
    useEffect(() => {
        if (searchTerm) {
            // Show filtered data when there is a searchTerm
            const results = fuse.search(searchTerm);
            const fixedResults = results.map((run) => run.item);
            setSearchResults(fixedResults);
        } else {
            // Show all data when searchTerm is null
            setSearchResults(runData);
        }
    }, [searchTerm, runData]);


    // Getting Run Data
    const fetchRunData = async () => {
        try {
            const response = await axios.get("/run");
            setRunData(response.data);
        } catch (error) {
            console.error("Error loading runs: ", error);
        }
    };
    useEffect(() => {
        fetchRunData();
    }, []);

    // Setting Search Term

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
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

    // DATASET

    useEffect(() => {
        const fetchDatasets = async () => {
            try {
                const response = await axios.get("/datasets");
                setDatasets(response.data);
            } catch (error) {
                console.error("Error fetching datasets: ", error);
                throw error;
            }
        };
        fetchDatasets();
    }, []);


    // Set Outputs when clicked
    const handleLeftSelect = (run) => {
        setLeftOutput(run);
    };
    const handleRightSelect = (run) => {
        setRightOutput(run);
    };
    const handleTweakRun = (run) => {
        // Go to config tab
        setSelectedTabIndex(0);
        // Enter data from this run into runconfigurator
        setTweakRun(run);
    };

    // Set Outputs when new run completes
    const handleRunResponse = (response) => {
        fetchRunData();
        setLeftOutput(response);
        setRightOutput(null);
    };

    if (!datasets || !models) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            {/* SIDEBAR Tabs */}
            <div className='sidebar'>
                <Tabs
                    selectedIndex={selectedTabIndex}
                    onSelect={(index) => setSelectedTabIndex(index)}
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
                            models={models}
                            datasets={datasets}
                            onSubmit={handleRunResponse}
                            onButtonClick={onButtonClick}
                            tweakRun={tweakRun}
                        />
                    </TabPanel>
                    <TabPanel>
                        <input
                            type='text'
                            placeholder='Search...'
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        {searchResults.map((run, index) => (
                            <SearchOptions
                                key={index}
                                run={run}
                                onLeftSelect={handleLeftSelect}
                                onRightSelect={handleRightSelect}
                                onTweak={handleTweakRun}
                            />
                        ))}
                    </TabPanel>
                </Tabs>
            </div>
            {/* Compare Window */}
            <div id='compare'>
                <div className='outputContainer'>
                            {isLoading ? (
                                <ReactLoading className="loading" type={'spin'} color={'#007bff'} height={'100px'} width={'100px'} />
                            ) : (
                                <>
                                    {leftOutput && (
                                        <RunOutput
                                            RunTitle={leftOutput.run_tag}
                                            dataset={leftOutput.dataset}
                                            model={leftOutput.detection_model_name}
                                            table={leftOutput.learner_performance_per_attack}
                                            overall={leftOutput.learner_overalls}
                                            matrices={leftOutput.confusion_matrices}
                                        />
                                    )}
                                    {rightOutput && (
                                        <RunOutput
                                            RunTitle={rightOutput.run_tag}
                                            dataset={rightOutput.dataset}
                                            model={rightOutput.detection_model_name}
                                            table={rightOutput.learner_performance_per_attack}
                                            overall={rightOutput.learner_overalls}
                                            matrices={rightOutput.confusion_matrices}
                                        />
                                    )}
                                </>
                            )}

                    
                </div>
            </div>
        </div>
    );
}

export default App;
