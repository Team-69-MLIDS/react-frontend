import { useEffect, useState } from "react";
import "./App.css";
import RunConfigurator from "./components/RunConfigurator";
import RunOutput from "./components/RunOutput";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Fuse from "fuse.js";
import SearchOptions from "./components/SearchOptions";
import ReactLoading from "react-loading";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Collapsible from "react-collapsible";

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
    const [selectedRange, setSelectedRange] = useState([]);

    axios.defaults.baseURL = "http://localhost:5000/api";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

    const fuse = new Fuse(runData, {
        keys: ["run_tag", "timestamp"],
        threshold: 0.1, //fuzzy value
    });

    const filterByDate = (runs) => {
        // Convert selectedRange to Date objects if needed
        const startDate = selectedRange[0];
        const endDate = selectedRange[1];

        const filteredResults = runs.filter((run) => {
            // Convert timestamp to a Date object
            const timestampDate = new Date(run.timestamp);

            // Compare timestampDate with selected range
            return timestampDate >= startDate && timestampDate <= endDate;
        });

        return filteredResults;
    };

    // Perform Search
    useEffect(() => {
        if (searchTerm) {
            // Show filtered data when there is a searchTerm
            const results = fuse.search(searchTerm);
            const fixedResults = results.map((run) => run.item);

            // Filter results based on the date range
            setSearchResults(
                selectedRange.length != 0
                    ? filterByDate(fixedResults)
                    : fixedResults
            );
        } else {
            // Show all data when searchTerm is null

            setSearchResults(
                selectedRange.length != 0 ? filterByDate(runData) : runData
            );
        }
    }, [searchTerm, runData, selectedRange]);

    const onButtonClick = (state) => {
        setIsLoading(state);
    };

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
        if (leftOutput == run) {
            setLeftOutput(null);
        } else {
            setLeftOutput(run);
        }
    };
    const handleRightSelect = (run) => {
        if (rightOutput == run) {
            setRightOutput(null);
        } else {
            setRightOutput(run);
        }
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

    // Handles selecting and deselecting a date range
    const handleDateSelection = (range) => {
        if (
            selectedRange[0] &&
            range[1].getTime() - range[0].getTime() === 86399999
        ) {
            setSelectedRange([]);
        } else {
            setSelectedRange(range);
        }
    };

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
                        <div className='searchBarContainer'>
                            <input
                                type='text'
                                placeholder='Search...'
                                value={searchTerm}
                                onChange={handleSearch}
                                className='searchBar'
                            />
                            <div className='calendarContainer'>
                                <Collapsible
                                    trigger='Select Date Range'
                                    transitionTime={0.1}
                                >
                                    <Calendar
                                        className='calendar'
                                        onChange={handleDateSelection}
                                        selectRange={true}
                                        returnValue='range'
                                        view='month'
                                        calendarType='gregory'
                                        value={selectedRange}
                                    />
                                </Collapsible>
                            </div>
                        </div>
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
                        <ReactLoading
                            className='loading'
                            type={"spin"}
                            color={"#007bff"}
                            height={"100px"}
                            width={"100px"}
                        />
                    ) : (
                        <>
                            {leftOutput && (
                                <RunOutput
                                    RunTitle={leftOutput.run_tag}
                                    dataset={leftOutput.dataset}
                                    model={leftOutput.detection_model_name}
                                    table={
                                        leftOutput.learner_performance_per_attack
                                    }
                                    overall={leftOutput.learner_overalls}
                                    matrices={leftOutput.confusion_matrices}
                                />
                            )}
                            {rightOutput && (
                                <RunOutput
                                    RunTitle={rightOutput.run_tag}
                                    dataset={rightOutput.dataset}
                                    model={rightOutput.detection_model_name}
                                    table={
                                        rightOutput.learner_performance_per_attack
                                    }
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
