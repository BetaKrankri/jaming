import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    handleTermChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    search() {
        this.props.onSearch(this.state.searchTerm)
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist"
                    onChange={this.handleTermChange} />
                <button className="SearchButton"
                    onClick={this.search}>BUSCAR</button>
            </div>
        );
    }
}

export default SearchBar;