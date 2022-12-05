import React from 'react';
import Tracklist from '../Tracklist/Tracklist.js'
import './SearchResults.css';


class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <Tracklist tracks={this.props.searchResults}
                    onAdd={this.props.onAdd}
                    isRemoval={false} />
            </div>
        );
    }
}

export default SearchResults;