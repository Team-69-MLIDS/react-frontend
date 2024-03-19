import { useState } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown";
import RunConfigurator from "./components/RunConfigurator";
import axios from "axios";

function App() {
    const apiURL = "https://localhost:5000/api";

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

    const prevRuns = {
        prevRuns: [
            {
                id: 1,
                label: "Run 1",
            },
            {
                id: 2,
                label: "Run 2",
            },
            {
                id: 3,
                label: "Run 3",
            },
        ],
    };

    return (
        <div className='container'>
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
            <div className='rhs'>
                <h1>test</h1>
            </div>
        </div>
    );
}

export default App;
