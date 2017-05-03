import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from './CardList';
import Search from '../../components/Search';
import { Toolbar, NavItem, Space } from 'rebass';
import { actions } from '../../store/albums';

const style = {
    search: {
        flex: '1 1 400px'
    }
}
class Home extends Component {
    state = {
        searchQuery: ''
    }

    searchAlbums = (query) => {
        this.setState({
            searchQuery: query
        })
        this.props.dispatch(actions.fetchAllAlbums({ q: query }));
    }

    render() {
        return (
            <div>
                <Toolbar>
                    <NavItem is="a">
                        Project X
                    </NavItem>
                    <Space
                        auto
                        x={1}
                    />
                    <NavItem style={style.search}>
                        <div className="toolbar__search">
                            <Search onSearch={this.searchAlbums} ></Search>
                        </div>
                    </NavItem>
                </Toolbar>
                <CardList query={this.state.searchQuery} ></CardList>
            </div>
        );
    }
}

const HomeContainer = connect()(Home);

export { HomeContainer as Home };