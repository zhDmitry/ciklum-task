import React, { Component } from 'react';
import propTypes from 'prop-types';
import { InlineForm } from 'rebass';

class Search extends Component {
    state = {
        value: ''
    }
    onSearchClick = (e) => {
        e.preventDefault();
        if (this.state.value) {
            this.props.onSearch(this.state.value);
        }
    }
    onType = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        return (
            <InlineForm
                buttonLabel="Go"
                label="Search"
                name="searchValue"
                onChange={this.onType}
                onClick={this.onSearchClick}
            />
        );
    }
}

Search.propTypes = {
    onSearch: propTypes.func.isRequired
}

export default Search;