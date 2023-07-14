import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const QualityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const PhotoContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export default function MindfulForm() {
  const [formState, setFormState] = useState({
    location: "",
    nature: false,
    city: false,
    loud: false,
    calm: false,
    crowdy: false,
    clean: false,
    quality: 1,
    photo: null
  });

  const handleCheckboxChange = (field) => (e) => {
    setFormState({ ...formState, [field]: e.target.checked });
  };

  const handleFieldChange = (field) => (e) => {
    setFormState({ ...formState, [field]: e.target.value });
  };

  const handleQualityChange = (e) => {
    setFormState({ ...formState, quality: parseInt(e.target.value) });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormState({ ...formState, photo: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Label>
          Location:
          <input
            type="text"
            value={formState.location}
            onChange={handleFieldChange('location')}
            required
          />
        </Label>
        <CheckboxContainer>
          <label>
            Nature
            <input
              type="checkbox"
              checked={formState.nature}
              onChange={handleCheckboxChange('nature')}
            />
          </label>
          <label>
            City
            <input
              type="checkbox"
              checked={formState.city}
              onChange={handleCheckboxChange('city')}
            />
          </label>
          <label>
            Loud
            <input
              type="checkbox"
              checked={formState.loud}
              onChange={handleCheckboxChange('loud')}
            />
          </label>
          <label>
            Calm
            <input
              type="checkbox"
              checked={formState.calm}
              onChange={handleCheckboxChange('calm')}
            />
          </label>
          <label>
            Crowdy
            <input
              type="checkbox"
              checked={formState.crowdy}
              onChange={handleCheckboxChange('crowdy')}
            />
          </label>
          <label>
            Clean
            <input
              type="checkbox"
              checked={formState.clean}
              onChange={handleCheckboxChange('clean')}
            />
          </label>
        </CheckboxContainer>
        <QualityContainer>
          <Label>
            Quality:
            <input
              type="range"
              min={1}
              max={10}
              value={formState.quality}
              onChange={handleQualityChange}
            />
          </Label>
          <span>{formState.quality}</span>
        </QualityContainer>
        <PhotoContainer>
        <Label>
          Photo:
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </Label>
        </PhotoContainer>
        <div>
          <button type="submit">Create Mindful Spot</button>
        </div>
      </StyledForm>
    </FormContainer>
  );
}
