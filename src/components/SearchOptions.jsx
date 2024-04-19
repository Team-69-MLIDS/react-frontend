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
            <h3 className='searchOptions'>RunID: {run.run_tag}</h3>
            <h5 className='searchOptions'>Date: {run.timestamp}</h5>
            <h5 className='searchOptions'>
                Model: {run.detection_model_name.toUpperCase()}
            </h5>
            <h5 className='searchOptions'>Dataset: {run.dataset}</h5>
            <div className='runSelectContainer'>
                <button className='runSelect' onClick={selectLeft}>
                    Display Left
                </button>
                <button className='runSelect' onClick={tweakRun}>
                    Tweak
                </button>
                <button className='runSelect' onClick={selectRight}>
                    Display Right
                </button>
            </div>
        </div>
    );
};

export default SearchOptions;
