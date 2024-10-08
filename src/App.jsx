import React, { useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import background1 from "./images/logo_t.png";

// Default values for API models
const defaultValues = {
  tumor: {
    image: null, // Changed to null for easier handling
  },
  skinCancer: {
    image: null, // Changed to null for easier handling
  },
  lungCancer: {
    image: null, // Changed to null for easier handling
  },
  alzheimer: {
    image: null, // Changed to null for easier handling
  },
  ml: {
    gender: "Female",
    age: 80,
    hypertension: 0,
    heart_disease: 1,
    smoking_history: "never",
    bmi: 25.19,
    HbA1c_level: 6.6,
    blood_glucose_level: 140,
    cp: 3,
    trtbps: 145,
    fbs: 1,
    restecg: 0,
    thalachh: 150,
    exng: 0,
    oldpeak: 2.3,
    slp: 0,
    caa: 0,
    thall: 1,
  },
};
const attributeLabels = {
  gender: "Gender",
  age: "Age",
  hypertension: "Hypertension",
  heart_disease: "Heart Disease",
  smoking_history: "Smoking History",
  bmi: "BMI",
  HbA1c_level: "HbA1c Level",
  blood_glucose_level: "Blood Glucose Level",
  cp: "Chest Pain Type",
  trtbps: "Resting Blood Pressure",
  fbs: "Fasting Blood Sugar",
  restecg: "Resting Electrocardiogram",
  thalachh: "Maximum Heart Rate",
  exng: "Exercise Induced Angina",
  oldpeak: "Oldpeak",
  slp: "Slope of Peak Exercise ST Segment",
  caa: "Number of Major Vessels",
  thall: "Thalassemia",
};
const imageLabels = {
  tumor: "X-Ray for Brain Tumor",
  skinCancer: "X-Ray for Alzheimer",
  lungCancer: "Image for Skin",
  alzheimer: "X-Ray for Lung Disease",
};
function DigitalHuman() {
  const [showModal, setShowModal] = useState(false);
  const [fields, setFields] = useState(defaultValues);

  // Toggle main modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const closeModal = () => {
    setShowModal(!showModal);
    setFields(defaultValues);
  };

  // Handle field updates
  const handleFieldChange = (key, field, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [key]: {
        ...prevFields[key],
        [field]: value,
      },
    }));
  };

  // Handle image upload
  const handleImageUpload = (key, event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFields((prevFields) => ({
        ...prevFields,
        [key]: {
          ...prevFields[key],
          image: reader.result,
        },
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <img src={background1} alt="Logo" style={{ height: 80, width: 80 }} />
          <h1 style={{ marginRight: 30, fontSize: 30 }}>Health Prediction</h1>
        </div>
      </header>
      <div className="main-container">
        <div className="human-model-section">
          <Canvas
            camera={{
              position: [0, 2, 16],
              fov: 30,
            }}
            style={{
              borderRadius: 30,
              borderColor: "white",
              borderWidth: 5,
            }}
          >
            <mesh position={[0, -5, -10]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeBufferGeometry args={[100, 100]} />
              <meshStandardMaterial attach="material" color="#7fa7a3" />
              <gridHelper
                args={[100, 100, "#444444", "#444444"]}
                position={[0, -5, -10]}
              />
            </mesh>
            <Experience />
          </Canvas>
        </div>

        <div className="prediction-section">
          <h3>User Prediction</h3>
          <ul>
            <li>Heart Risk: 2%</li>
            <li>Cholesterol: 3%</li>
            <li>Heart Risk: 7%</li>
          </ul>

          <h3>Health Prediction</h3>
          <div className="prediction-bar">
            <label>Age</label>
            <div className="bar age"></div>
          </div>

          <div className="action-buttons">
            <button className="submit-btn" onClick={toggleModal}>
              Edit Inputs
            </button>
            <button className="submit-btn">Submit</button>
          </div>
        </div>
      </div>

      {/* Main modal for editing values */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 style={{ textAlign: "center" }}>Health Condition Inputs</h2>
            <div className="image-preview-container">
              {Object.entries(fields).map(([key, value]) => (
                <div key={key} className="image-preview">
                  {/* <h4>{key.replace(/([A-Z])/g, " ").trim()}</h4> */}
                  {typeof value === "object" && (
                    <div>
                      {Object.entries(value).map(([field, fieldValue]) => {
                        if (field === "image") return null; // Skip rendering the image field

                        const renderSelect = (label, options) => (
                          <div key={field} className="input-field">
                            <label>{label}</label>
                            <select
                              value={fieldValue}
                              onChange={(e) =>
                                handleFieldChange(key, field, e.target.value)
                              }
                            >
                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        );

                        const renderInput = (label, type) => (
                          <div key={field} className="input-field">
                            <label>{label}</label>
                            <input
                              type={type}
                              value={fieldValue}
                              onChange={(e) =>
                                handleFieldChange(key, field, e.target.value)
                              }
                            />
                          </div>
                        );

                        // Define options for select fields
                        const selectOptions = {
                          gender: [
                            { value: "Male", label: "Male" },
                            { value: "Female", label: "Female" },
                            { value: "Other", label: "Other" },
                          ],
                          hypertension: [
                            { value: "0", label: "No" },
                            { value: "1", label: "Yes" },
                          ],
                          heart_disease: [
                            { value: "0", label: "No" },
                            { value: "1", label: "Yes" },
                          ],
                          smoking_history: [
                            { value: "current", label: "Current" },
                            { value: "ever", label: "Ever" },
                            { value: "former", label: "Former" },
                            { value: "never", label: "Never" },
                            { value: "No Info", label: "No Info" },
                            { value: "not current", label: "Not Current" },
                          ],
                          cp: [
                            { value: "0", label: "Typical Angina" },
                            { value: "1", label: "Atypical Angina" },
                            { value: "2", label: "Non-anginal Pain" },
                            { value: "3", label: "Asymptomatic" },
                          ],
                          restecg: [
                            { value: "0", label: "Normal" },
                            { value: "1", label: "ST-T wave normality" },
                            {
                              value: "2",
                              label: "Left ventricular hypertrophy",
                            },
                          ],
                          slp: [
                            { value: "0", label: "0" },
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                          ],
                          thall: [
                            { value: "0", label: "0" },
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                          ],
                        };

                        // Check if the field should render a select or input
                        if (field in selectOptions) {
                          return renderSelect(
                            attributeLabels[field],
                            selectOptions[field]
                          );
                        }

                        // For numeric fields, render an input box
                        const numericFields = [
                          "age",
                          "bmi",
                          "HbA1c_level",
                          "blood_glucose_level",
                          "trtbps",
                          "fbs",
                          "thalachh",
                          "oldpeak",
                          "caa",
                        ];
                        const inputType = numericFields.includes(field)
                          ? "number"
                          : "text";
                        return renderInput(attributeLabels[field], inputType);
                      })}

                      {/* Show upload button without the input box for the specified keys */}
                      {[
                        "tumor",
                        "skinCancer",
                        "lungCancer",
                        "alzheimer",
                      ].includes(key) && (
                        <div className="input-field">
                          <label>Upload Image for {imageLabels[key]}</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(key, e)}
                          />
                          {value.image && (
                            <img
                              src={value.image}
                              alt="Preview"
                              style={{
                                width: "100%",
                                height: "auto",
                                marginTop: 10,
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={toggleModal}>
                Confirm
              </button>
              <button className="close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <footer
        style={{
          backgroundColor: "#2F6398",
          height: 30,
          textAlign: "center",
          width: "100%",
          marginTop: 20,
        }}
      >
        <text
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 20,
            color: "white",
          }}
        >
          © ASCEND Solutions 2024.
        </text>
      </footer>
    </div>
  );
}

export default DigitalHuman;
