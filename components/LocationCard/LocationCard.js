import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  border: 1px solid black;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 400px; /* Set the desired initial width */
  
  @media (max-width: 768px) {
    width: 100%; /* Adjust the width to 100% on screens smaller than 768px */
  }
`;

const CardTitle = styled.h3`
  margin-bottom: 1px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  font-family: inherit;
  font-size: 100%;
  padding: 0.5em 1em;
  color: #fff;
  background-color: #c0392b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  margin-left: 5px;
`;

const categoryList = [
  { name: "Nature", state: "nature" },
  { name: "City", state: "city" },
  { name: "Loud", state: "loud" },
  { name: "Calm", state: "calm" },
  { name: "Crowdy", state: "crowdy" },
  { name: "Clean", state: "clean" },
];

const LocationCard = memo(
  ({
    id,
    location,
    nature,
    city,
    loud,
    calm,
    crowdy,
    clean,
    quality,
    photo,
    onDelete,
  }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const checkedCategories = categoryList.filter(
      (category) => eval(category.state)
    );

    useEffect(() => {
      if (photo instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageUrl(reader.result);
        };
        reader.readAsDataURL(photo);
      }
    }, [photo]);

    return (
      <CardContainer>
        <CardTitle>{location}</CardTitle>
        <CategoryContainer>
          {checkedCategories.map(({ name, state }) => (
            <CategoryItem key={state}>
              <Checkbox checked={eval(state)} readOnly />
              <CheckboxLabel>{name}</CheckboxLabel>
            </CategoryItem>
          ))}
        </CategoryContainer>
        <p>Location Quality: {quality}</p>
        {imageUrl && <Image src={imageUrl} alt={location} />}
        <DeleteButton onClick={() => onDelete(id)}>Delete</DeleteButton>
      </CardContainer>
    );
  }
);

LocationCard.displayName = "LocationCard";

export default LocationCard;
