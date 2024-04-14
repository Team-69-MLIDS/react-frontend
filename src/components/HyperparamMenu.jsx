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
                    handleInputChange(
                        param.name,
                        e.target.value,
                        classifier,
                        param.id
                    )
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
                        classifier,
                        param.id
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
                        classifier,
                        param.id
                    )
                }
            />
        ),
    };

    // Sets hyperparam values of each hyperparameter under their specific classifier
    const handleInputChange = (paramName, value, classifier, id) => {
        setHyperparamValues((prevValues) => {
            // Copy previous values
            let updatedValues = { ...prevValues };

            // If the value is blank, remove the item from the list
            if (value === "") {
                // Check if the classifier exists
                if (updatedValues[classifier]) {
                    // Check if the paramName exists within the classifier
                    if (updatedValues[classifier][paramName]) {
                        delete updatedValues[classifier][paramName];
                    }

                    // If there are no more parameters left within the classifier, remove the classifier
                    if (Object.keys(updatedValues[classifier]).length === 0) {
                        delete updatedValues[classifier];
                    }
                }
            } else {
                // Update or add the value if it's not blank
                updatedValues = {
                    ...updatedValues,
                    [classifier]: {
                        ...(updatedValues[classifier] || {}),
                        [paramName]: {
                            v: value,
                            id: id,
                        },
                    },
                };
            }

            return updatedValues;
        });
    };

    // sends hyperparamValues to the parent component in order to form the runConfig
    useEffect(() => {
        onInputChange(hyperparamValues);
    }, [hyperparamValues]);

    return (
        <Collapsible
            className='hyperparamsCollapseClosed'
            openedClassName='hyperparamsCollapseOpened'
            trigger='Hyperparameters'
            transitionTime={0.1}
            // triggerStyle={{ cursor: "pointer" }}
        >
            {keys.map((key) => (
                <Collapsible
                    className='hyperparamsCollapseClosed'
                    trigger={key}
                    key={key}
                    triggerStyle={{ cursor: "pointer" }}
                    transitionTime={0.1}
                >
                    {params[key].map((param, index) => {
                        const type = param.type_hint.split(",")[0];
                        // Ignore type_hints that are not 'int', 'float', or 'string'
                        if (!["int", "float", "string"].includes(type)) {
                            return null; // Skip rendering for ignored type_hints
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
