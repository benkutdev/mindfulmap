import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid black;
  padding: 20px;
  margin-top: 20px;
`;

const CardTitle = styled.h3`
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 50%;
  height: auto;
`;

const LocationCard = ({ location, nature, city, loud, calm, crowdy, clean, quality, photo }) => {
  let imageUrl = null;
  if (photo) {
    imageUrl = URL.createObjectURL(photo);
  }

  return (
    <CardContainer>
      <CardTitle>{location}</CardTitle>
      {imageUrl && <Image src={imageUrl} alt={location} />}
      <p>Nature: {nature ? 'Yes' : 'No'}</p>
      <p>City: {city ? 'Yes' : 'No'}</p>
      <p>Loud: {loud ? 'Yes' : 'No'}</p>
      <p>Calm: {calm ? 'Yes' : 'No'}</p>
      <p>Crowdy: {crowdy ? 'Yes' : 'No'}</p>
      <p>Clean: {clean ? 'Yes' : 'No'}</p>
      <p>Quality: {quality}</p>
    </CardContainer>
  );
}

export default LocationCard;
