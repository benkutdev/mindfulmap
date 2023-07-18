import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LocationCard from "../LocationCard/LocationCard";
import shortid from "shortid";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
  align-items: ${(props) => (props.centered ? "center" : "flex-start")};
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  font-family: inherit;
  font-size: 100%;
  padding: 0.5em 1em;
  color: #fff;
  background-color: #719ece;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const FileInput = styled.input.attrs({ type: "file" })`
  display: none;
`;

const FileInputLabel = styled.label`
  font-size: 14px;
  padding: 0.5em 1em;
  color: #fff;
  background-color: #719ece;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const QualityLabel = styled.span`
  margin-left: 10px;
  font-weight: bold;
`;

const QualityValue = styled.span`
  margin-left: 5px;
`;

export default function MindfulForm() {
  const [formState, setFormState] = useState({
    id: shortid.generate(),
    location: "",
    nature: false,
    city: false,
    loud: false,
    calm: false,
    crowdy: false,
    clean: false,
    quality: 1,
    photo: null,
  });

  const [submittedData, setSubmittedData] = useState([]);
  const {
    location,
    nature,
    city,
    loud,
    calm,
    crowdy,
    clean,
    quality,
    photo,
  } = formState;

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("locationData"));
    if (Array.isArray(savedState)) {
      setSubmittedData(savedState);
    }
  }, []);

  const handleCheckboxChange = (field) => (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: e.target.checked,
    }));
  };

  const handleFieldChange = (field) => (e) => {
    setFormState((prevState) => ({ ...prevState, [field]: e.target.value }));
  };

  const handleQualityChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      quality: parseInt(e.target.value),
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormState((prevState) => ({ ...prevState, photo: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData((prevState) => [...prevState, formState]);
    localStorage.setItem(
      "locationData",
      JSON.stringify([...submittedData, formState])
    );
    setFormState({
      id: shortid.generate(),
      location: "",
      nature: false,
      city: false,
      loud: false,
      calm: false,
      crowdy: false,
      clean: false,
      quality: 1,
      photo: null,
    });
  };

  const deleteCard = (id) => {
    const updatedData = submittedData.filter((data) => data.id !== id);
    setSubmittedData(updatedData);
    localStorage.setItem("locationData", JSON.stringify(updatedData));
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <FieldContainer>
          <label>
            Location:
            <input
              type="text"
              value={location}
              onChange={handleFieldChange("location")}
            />
          </label>
        </FieldContainer>

        <FieldContainer>
          <CheckboxLabel>
            <Checkbox
              checked={nature}
              onChange={handleCheckboxChange("nature")}
            />
            Nature
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox
              checked={city}
              onChange={handleCheckboxChange("city")}
            />
            City
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox
              checked={loud}
              onChange={handleCheckboxChange("loud")}
            />
            Loud
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox
              checked={calm}
              onChange={handleCheckboxChange("calm")}
            />
            Calm
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox
              checked={crowdy}
              onChange={handleCheckboxChange("crowdy")}
            />
            Crowdy
          </CheckboxLabel>
          <CheckboxLabel>
            <Checkbox
              checked={clean}
              onChange={handleCheckboxChange("clean")}
            />
            Clean
          </CheckboxLabel>
        </FieldContainer>

        <FieldContainer>
          <label>
            Quality:
            <input
              type="range"
              value={quality}
              min={1}
              max={10}
              onChange={handleQualityChange}
            />
            <QualityValue>{quality}</QualityValue>
          </label>
        </FieldContainer>

        <FieldContainer>
          <FileInputLabel>
            Upload Photo
            <FileInput onChange={handlePhotoChange} />
          </FileInputLabel>
        </FieldContainer>

        <Button type="submit">Create Mindful Spot</Button>
      </FormContainer>

      {submittedData.map((data) => (
        <LocationCard
          key={data.id}
          {...data}
          onDelete={() => deleteCard(data.id)}
        />
      ))}
    </Container>
  );
}
