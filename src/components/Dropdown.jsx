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
    const [selected, setSelected] = useState(tweakValue ? tweakValue : null);
    const handleChange = (selectedOption) => {
        onChange(inputName, selectedOption); // Pass the selected option to the parent component
    };

    useEffect(() => {
        console.log(selected);
    }, []);

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
