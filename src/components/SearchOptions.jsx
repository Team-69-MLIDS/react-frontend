import "../App.css";

const SearchOptions = ({ run, onLeftSelect, onRightSelect, onTweak }) => {
    const selectLeft = () => {
        onLeftSelect(run);
    };

    const selectRight = () => {
        onRightSelect(run);
    };

    const tweakRun = () => {
        onTweak(run);
    };

    return (
        <div className='searchList'>
            <h3>RunID: {run.run_tag}</h3>
            <h4>Date: {run.timestamp}</h4>
            <h4>Model: {run.detection_model_name}</h4>
            <h4>Dataset: {run.dataset}</h4>
            <div className='runSelectContainer'>
                <div className='runSelect' onClick={selectLeft}>
                    Left
                </div>
                <div className='runSelectContainer' onClick={tweakRun}>
                    Tweak
                </div>
                <div className='runSelect' onClick={selectRight}>
                    Right
                </div>
            </div>
        </div>
    );
};

export default SearchOptions;
