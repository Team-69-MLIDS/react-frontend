import "../App.css";

const SearchOptions = ({runID, date, model, dataset}) => {
    

    return (<div className = "searchList">


        <h3>RunID:{runID}</h3>
        <h4>Date:{date}</h4>
        <h4>Model:{model}</h4>
        <h4>Dataset:{dataset}</h4>

    </div>)

}


export default SearchOptions;