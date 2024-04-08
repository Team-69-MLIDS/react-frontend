import { useEffect, useState } from "react";
import "./App.css";
import RunConfigurator from "./components/RunConfigurator";
import RunOutput from "./components/RunOutput";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Fuse from 'fuse.js';
import SearchOptions from "./components/SearchOptions";

function App() {
    const [models, setModels] = useState(null);
    const [datasets, setDatasets] = useState(null);
    const [runOutput, setRunOutput] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [runData, setRunData] = useState([]);

    const FuzzySearch = () => {
        
        useEffect(() => {
          fetchData();
        }, []);
      
        useEffect(() => {
          const fuse = new Fuse(runData, {
            keys: ['runID', 'date'],
            threshold: 0.4,//fuzzy value
          });
      
          const results = fuse.search(searchTerm);
          setSearchResults(results);
        }, [searchTerm, runData]);
    
    };
    
    useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get("/run");
          setRunData(response.data);
        } catch (error) {
          console.error("Error loading runs: ", error);
        }
      };
      fetchData();
    },[])

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
      };

      useEffect(() => {
        console.log(searchTerm);        
      },[searchTerm])

      useEffect(() => {
        console.log(runData);        
      },[runData])

    const handleSubmit = (e) => {
        e.preventDefault();
        
      }

    axios.defaults.baseURL = "http://localhost:5000/api";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

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

    useEffect(() => {
        console.log(runOutput);
    }, [runOutput]);

    const handleRunResponse = (response) => {
        setRunOutput([response, null]);
    };

    if (!datasets || !models) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            {/* SIDEBAR Tabs */}
            <div className='sidebar'>
                <Tabs>
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
                        />
                    </TabPanel>
                    <TabPanel>
                    {/* <div>
                            <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearch}
                            />
                        <ul>
                             {searchResults.map((result, index) => (
                            <li key={index}>
                                
                                <span>{result.item.runID}</span> - <span>{result.item.date}</span>
                            </li>
                            ))} 
                            
                        </ul>
                    </div> */}
                    
                    {runData.map((run)=>(<SearchOptions runID = {run.run_tag} date = {run.timestamp} model = {run.detection_model_name} dataset = {run.dataset}/>))}
                    </TabPanel>
                </Tabs>
            </div>
            {/* Compare Window */}
            <div className='compare'>
                <div className='outputContainer'>
                    {runOutput[0] ? (
                        <RunOutput
                            RunTitle={runOutput[0].run_tag}
                            model={runOutput[0].detection_model_name}
                            table={runOutput[0].learner_performance_per_attack}
                            overall={runOutput[0].learner_overalls}
                            matrices={runOutput[0].confusion_matrices}
                        />
                    ) : null}
                    {runOutput[1] ? (
                        <RunOutput
                            RunTitle={runOutput[1].run_tag}
                            model={runOutput[1].detection_model_name}
                            table={runOutput[1].learner_performance_per_attack}
                            overall={runOutput[1].learner_overalls}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default App;
