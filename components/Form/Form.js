import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LocationCard from "../LocationCard/LocationCard";

// Create a single styled container for form fields to reduce duplication
const FieldContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: ${props => props.centered ? 'center' : 'flex-start'};
`;

// Use destructuring assignment for the formState to make the formState references more concise
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

  const [submitted, setSubmitted] = useState(false);
  const {location, nature, city, loud, calm, crowdy, clean, quality, photo} = formState;

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('locationData'));
    if (savedState) {
      setFormState(savedState);
      setSubmitted(true);
    }
  }, []);

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
    localStorage.setItem('locationData', JSON.stringify(formState));
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldContainer>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={handleFieldChange('location')}
            required
          />
        </label>
      </FieldContainer>

      {/* Create an array of checkbox labels and map over them to reduce code duplication */}
      <FieldContainer>
        {['Nature', 'City', 'Loud', 'Calm', 'Crowdy', 'Clean'].map((label) => (
          <label key={label}>
            {label}
            <input
              type="checkbox"
              checked={formState[label.toLowerCase()]}
              onChange={handleCheckboxChange(label.toLowerCase())}
            />
          </label>
        ))}
      </FieldContainer>

      <FieldContainer centered>
        <label>
          Quality:
          <input
            type="range"
            min={1}
            max={10}
            value={quality}
            onChange={handleQualityChange}
          />
        </label>
        <span>{quality}</span>
      </FieldContainer>

      <FieldContainer>
        <label>
          Photo:
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </label>
      </FieldContainer>

      <FieldContainer>
        <button type="submit">Create Mindful Spot</button>
      </FieldContainer>

      {submitted && <LocationCard {...formState} />}
    </form>
  );
}
