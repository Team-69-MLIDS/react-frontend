import { useState } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown";
import RunConfigurator from "./components/RunConfigurator";

function App() {
    const algorithms = {
        algorithms: [
            {
                label: "Algorithm 1",
                value: "Algorithm 1",
            },
            {
                label: "Algorithm 2",
                value: "Algorithm 2",
            },
            {
                label: "Algorithm 3",
                value: "Algorithm 3",
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
        <div className='test'>
            <RunConfigurator
                Title='Run A'
                algorithms={algorithms.algorithms}
                datasets={datasets.datasets}
            />
        </div>
    );
}

export default App;
