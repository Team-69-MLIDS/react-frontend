import "../App.css";
import Select from "react-select";

const Dropdown = ({ placeholder, options, inputName, onChange }) => {
    const handleChange = (selectedOption) => {
        onChange(inputName, selectedOption); // Pass the selected option to the parent component
    };

    return (
        <Select
            className='dropdown'
            placeholder={placeholder}
            options={options}
            inputName={inputName}
            onChange={handleChange}
        />
    );
};

export default Dropdown;
