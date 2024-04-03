import "../App.css";
import Collapsible from "react-collapsible";

const HyperparamMenu = ({ params }) => {
    const keys = Object.keys(params);

    const InputComponents = {
        string: (param) => (
            <input
                type='text'
                placeholder='string'
                defaultValue={
                    param.default !== "no default" && param.default !== "None"
                        ? param.default
                        : ""
                }
                className='hyperParamInput'
            />
        ),
        int: (param) => (
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
            />
        ),
        float: (param) => (
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
            />
        ),
        // Add more input components for other type_hint values as needed
    };

    return (
        <Collapsible trigger='Hyperparameters'>
            {keys.map((key) => (
                <Collapsible trigger={key} key={key}>
                    {params[key].map((param, index) => {
                        // Ignore type_hints that are not 'int', 'float', or 'string' UNTIL BETTER SOLUTION
                        if (
                            !["int", "float", "string"].includes(
                                param.type_hint
                            )
                        ) {
                            return null; // Skip rendering for ignored type_hints UNTIL BETTER SOLIUTION
                        }

                        return (
                            <div className='hyperParamDiv border' key={index}>
                                <label
                                    className='hyperParamLabel'
                                    title={param.description}
                                >
                                    {param.name}:
                                </label>
                                {InputComponents[param.type_hint](param)}
                            </div>
                        );
                    })}
                </Collapsible>
            ))}
        </Collapsible>
    );
};

export default HyperparamMenu;
