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
  diabetes: {
    gender: "Female",
    age: 80,
    hypertension: 0,
    heart_disease: 1,
    smoking_history: "never",
    bmi: 25.19,
    HbA1c_level: 6.6,
    blood_glucose_level: 140,
  },
  heart: {
    age: 63,
    sex: 1,
    cp: 3,
    trtbps: 145,
    chol: 233,
    fbs: 1,
    restecg: 0,
    thalachh: 150,
    exng: 0,
    oldpeak: 2.3,
    slp: 0,
    caa: 0,
    thall: 1,
  },
  cholesterol: {
    age: 63,
    sex: 1,
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
  weather: {
    Temperature: 38,
    Humidity: 83,
    "Wind Speed": 1.5,
    "Precipitation (%)": 82,
    "Cloud Cover": "clear",
    "Atmospheric Pressure": 1026.25,
    "UV Index": 7,
    Season: "Spring",
    "Visibility (km)": 1,
    Location: "coastal",
  },
};

function DigitalHuman() {
  const [showModal, setShowModal] = useState(false);
  const [fields, setFields] = useState(defaultValues);

  // Toggle main modal
  const toggleModal = () => {
    setShowModal(!showModal);
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

  console.log("hello", fields.weather["Cloud Cover"]);
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
              Edit All Values
            </button>
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
                  <h4>{key.replace(/([A-Z])/g, " $1").trim()}</h4>
                  {typeof value === "object" && (
                    <div>
                      {Object.entries(value).map(([field, fieldValue]) => (
                        <div key={field} className="input-field">
                          <label>{field.replace(/([A-Z])/g, " $1")}</label>
                          <input
                            type="text"
                            value={fieldValue}
                            onChange={(e) =>
                              handleFieldChange(key, field, e.target.value)
                            }
                          />
                        </div>
                      ))}
                      {/* Add upload button for tumor, skinCancer, lungCancer, alzheimer */}
                      {[
                        "tumor",
                        "skinCancer",
                        "lungCancer",
                        "alzheimer",
                      ].includes(key) && (
                        <div className="input-field">
                          <label>Upload Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(key, e)}
                          />
                        </div>
                      )}
                      {value.image && (
                        <img
                          src={value.image}
                          alt={`${key} preview`}
                          style={{
                            maxWidth: "100%",
                            maxHeight: 150,
                            borderRadius: 10,
                          }}
                        />
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
              <button className="close-btn" onClick={toggleModal}>
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
