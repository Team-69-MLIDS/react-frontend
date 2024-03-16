import { useState } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown";

function App() {
    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];

    return (
        <div className='test'>
            <Dropdown options={options} />
        </div>
    );
}

export default App;
