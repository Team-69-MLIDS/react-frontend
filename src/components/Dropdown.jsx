import { useEffect, useState } from "react";
import "../App.css";
import Select from "react-select";

const Dropdown = ({
    placeholder,
    options,
    inputName,
    onChange,
    tweakValue,
}) => {
    const [selected, setSelected] = useState(
        tweakValue ? { value: tweakValue, label: tweakValue } : null
    );

    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
        onChange(inputName, selectedOption); // Pass the selected option to the parent component
    };

    return (
        <Select
            className='dropdown'
            placeholder={placeholder}
            options={options.map((option) => ({
                value: option,
                label: option,
            }))}
            inputName={inputName}
            value={selected}
            onChange={handleChange}
        />
    );
};

export default Dropdown;
