import "../App.css";

const SearchOptions = ({ run, onLeftSelect, onRightSelect, onTweak }) => {
    const selectLeft = () => {
        onLeftSelect(run);
        scrollToRef();
    };

    const scrollToRef = () => {
        document.getElementById("compare").scroll({
            top: 0,
        });
    };

    const selectRight = () => {
        onRightSelect(run);
        scrollToRef();
    };

    const tweakRun = () => {
        onTweak(run);
    };

    return (
        <div className='searchList'>
            <h3>RunID: {run.run_tag}</h3>
            <h5>Date: {run.timestamp}</h5>
            <h5>Model: {run.detection_model_name}</h5>
            <h5>Dataset: {run.dataset}</h5>
            <div className='runSelectContainer'>
                <div className='runSelect' onClick={selectLeft}>
                    Copy to Left
                </div>
                <div className='runSelect' onClick={tweakRun}>
                    Tweak
                </div>

                <div className='runSelect' onClick={selectRight}>
                    Copy to Right
                </div>
            </div>
        </div>
    );
};

export default SearchOptions;
