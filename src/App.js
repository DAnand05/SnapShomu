import React, { useState } from "react";
import "./styles.css";

const validEmail = "test@admin.com";
const validPassword = "test@pwd";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [images, setImages] = useState([]);
  const [isGridView, setIsGridView] = useState(true);

  const authenticateUser = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email === validEmail && password === validPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Try again!");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prevImages) => [...prevImages, e.target.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = (index) => {
    if (window.confirm("Do you want to delete this image?")) {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <div className="login-page">
          <h2>Welcome to SnapShomiii</h2>
          <input type="email" id="email" placeholder="Enter Email" />
          <input type="password" id="password" placeholder="Enter Password" />
          <button className="login-btn" onClick={authenticateUser}>
            Login
          </button>
        </div>
      ) : (
        <div className="gallery-container">
          {/* Fixed Header for Birthday Message */}
          <header className="birthday-message">
            <h1>Happy Birthday, My Love! 🎉🎂</h1>
            <p>
              On this Special Day, I just want to thank you for coming into my
              life. Aap bhot special ho mere liye shomuuuu jiiii. I love you
              bchchiii jiiii bhottt saraaaa. Aap mutki bhainffff ho meriii. Aap
              jese smile krte ho, jese act krte ho mere around, mujhe bhot acha
              lgta h, thanks for being born and coming in my life. You are very
              special to me. ❤❤
            </p>
          </header>

          <div className="gallery-controls">
            <button
              onClick={() => setIsGridView(!isGridView)}
              className="toggle-btn"
            >
              {isGridView ? "Switch to List View" : "Switch to Grid View"}
            </button>
            <label className="upload-btn">
              Upload Image
              <input type="file" accept="image/*" onChange={handleFileUpload} />
            </label>
          </div>

          <div className={isGridView ? "grid-view" : "list-view"}>
            {images.map((src, index) => (
              <div key={index} className="image-wrapper">
                <img
                  src={src}
                  alt="memory"
                  className="gallery-img"
                  onClick={() => deleteImage(index)}
                />
                <a href={src} download={`memory-${index + 1}.jpg`}>
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
