import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Container, Text } from 'rebass';
import Card from '../../components/Card';

const style = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    resultText: {
        width: '100%',
        textAlign: 'center'
    }
}

class CardList extends Component {

    render() {
        const { albums, query, loading, error } = this.props;
        const albumsArray = Object.keys(albums).map(el => albums[el]);
        const listEmpty = albumsArray.length === 0;
        return (
            <Container style={style.container} pt={4}>
                {
                    listEmpty && !loading && !error && <div className="card-list__info"> Your album list is empty <br /> try to search something</div>
                }
                {
                    error && <div className="card-list__error"> Error while loading albums </div>
                }
                {
                    (query && !loading) && <Text style={style.resultText}>
                        Results for "{query}"
                    </Text>
                }
                {
                    loading ? <div className="card-list__loading"></div>
                        : albumsArray.map((el, i) => (
                            <Card entity={el} key={el.id}></Card>
                        ))
                }
            </Container >
        );
    }
}

CardList.propTypes = {
    query: propTypes.string,
    loading: propTypes.bool,
    error: propTypes.bool,
    albums: propTypes.object.isRequired
}

const enhancer = connect(state => {
    return {
        albums: state.albums.albumsList,
        loading: state.albums.albumsInfo.loading,
        error: state.albums.albumsInfo.error
    }
})

export default enhancer(CardList);