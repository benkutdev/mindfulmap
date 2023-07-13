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

export default function MindfulForm() {
  const [location, setLocation] = useState("");
  const [nature, setNature] = useState(false);
  const [city, setCity] = useState(false);
  const [loud, setLoud] = useState(false);
  const [calm, setCalm] = useState(false);
  const [crowdy, setCrowdy] = useState(false);
  const [clean, setClean] = useState(false);
  const [quality, setQuality] = useState(1);

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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Label>
        <Label>Filters:</Label>
        <CheckboxContainer>
          <label>
            Nature
            <input
              type="checkbox"
              checked={nature}
              onChange={(e) => setNature(e.target.checked)}
            />
          </label>
          <label>
            City
            <input
              type="checkbox"
              checked={city}
              onChange={(e) => setCity(e.target.checked)}
            />
          </label>
          <label>
            Loud
            <input
              type="checkbox"
              checked={loud}
              onChange={(e) => setLoud(e.target.checked)}
            />
          </label>
          <label>
            Calm
            <input
              type="checkbox"
              checked={calm}
              onChange={(e) => setCalm(e.target.checked)}
            />
          </label>
          <label>
            Crowdy
            <input
              type="checkbox"
              checked={crowdy}
              onChange={(e) => setCrowdy(e.target.checked)}
            />
          </label>
          <label>
            Clean
            <input
              type="checkbox"
              checked={clean}
              onChange={(e) => setClean(e.target.checked)}
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
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
            />
          </Label>
          <span>{quality}</span>
        </QualityContainer>
        <div>
          <button type="submit">Create Mindful Spot</button>
        </div>
      </StyledForm>
    </FormContainer>
  );
}
