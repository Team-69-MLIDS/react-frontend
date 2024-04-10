import "../App.css";

const SearchOptions = ({ run, onLeftSelect, onRightSelect }) => {
    const selectLeft = () => {
        onLeftSelect(run);
    };

    const selectRight = () => {
        onRightSelect(run);
    };

    return (
        <div className='searchList'>
            <h3>RunID: {run.run_tag}</h3>
            <h4>Date: {run.timestamp}</h4>
            <h4>Model: {run.detection_model_name}</h4>
            <h4>Dataset: {run.dataset}</h4>
            <div className='runSelectContainer'>
                <div className='runSelect' onClick={selectLeft}>
                    Copy to Left
                </div>
                
                <div className='runSelect' onClick={selectRight}>
                    Copy to Right
                </div>
            </div>
        </div>
    );
};

export default SearchOptions;
