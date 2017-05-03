import React from 'react'
import propTypes from 'prop-types';
import { Card as RCard, CardImage, Heading, Text } from 'rebass';

const Card = ({
    entity: {
    albumName,
    artistName,
    artwork,
    url,
    resource } = {} }) => {
    return (
        <RCard
            m={1}
            mt={4}
            width={256}>
            <a href={url}>
                <CardImage src={artwork} />
            </a>
            <Heading
                level={2}
                size={3}>
                {albumName}
            </Heading>
            <Text>
                {artistName}
            </Text>
        </RCard >

    )
}
Card.propTypes = {
    entity: propTypes.object.isRequired
}

export default Card;