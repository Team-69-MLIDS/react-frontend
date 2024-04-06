import { useEffect, useState } from "react";
import "../App.css";
import Collapsible from "react-collapsible";

const HyperparamMenu = ({ params, onInputChange }) => {
    const [hyperparamValues, setHyperparamValues] = useState({});

    const keys = Object.keys(params);

    const InputComponents = {
        string: (param, classifier) => (
            <input
                type='text'
                placeholder='string'
                defaultValue={
                    param.default !== "no default" && param.default !== "None"
                        ? param.default
                        : ""
                }
                className='hyperParamInput'
                onChange={(e) =>
                    handleInputChange(param.name, e.target.value, classifier)
                }
            />
        ),
        int: (param, classifier) => (
            <input
                type='number'
                placeholder='int'
                step={1}
                defaultValue={
                    param.default !== "no default" && param.default !== "None"
                        ? param.default
                        : ""
                }
                className='hyperParamInput'
                onChange={(e) =>
                    handleInputChange(
                        param.name,
                        parseInt(e.target.value),
                        classifier
                    )
                }
            />
        ),
        float: (param, classifier) => (
            <input
                type='number'
                placeholder='float'
                step={0.01}
                defaultValue={
                    param.default !== "no default" && param.default !== "None"
                        ? param.default
                        : ""
                }
                className='hyperParamInput'
                onChange={(e) =>
                    handleInputChange(
                        param.name,
                        parseFloat(e.target.value),
                        classifier
                    )
                }
            />
        ),
        // Add more input components for other type_hint values as needed
    };

    // Sets hyperparam values of each hyperparameter under their specific classifier
    const handleInputChange = (paramName, value, classifier) => {
        setHyperparamValues((prevValues) => ({
            ...prevValues,
            [classifier]: {
                ...(prevValues[classifier] || {}),
                [paramName]: value,
            },
        }));
    };

    // Logs hyper param values FOR TESTING DELETE LATER
    useEffect(() => {
        onInputChange(hyperparamValues); // sends hyperparamValues to the parent component in order to form the runConfig
    }, [hyperparamValues]);

    return (
        <Collapsible trigger='Hyperparameters'>
            {keys.map((key) => (
                <Collapsible trigger={key} key={key}>
                    {params[key].map((param, index) => {
                        const type = param.type_hint.split(",")[0];
                        // Ignore type_hints that are not 'int', 'float', or 'string' UNTIL BETTER SOLUTION
                        if (!["int", "float", "string"].includes(type)) {
                            return null; // Skip rendering for ignored type_hints UNTIL BETTER SOLIUTION
                        }

                        return (
                            <div className='hyperParamDiv' key={index}>
                                <label
                                    className='hyperParamLabel'
                                    title={
                                        param.name + ":\n\n" + param.description
                                    }
                                >
                                    {param.name}:
                                </label>
                                {InputComponents[type](param, key)}
                            </div>
                        );
                    })}
                </Collapsible>
            ))}
        </Collapsible>
    );
};

export default HyperparamMenu;
