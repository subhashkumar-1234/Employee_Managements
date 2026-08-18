import React, { useState, useEffect } from 'react';

const ImageUploadPage = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filePreview, setFilePreview] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dashboard_images');
    if (saved) {
      try {
        setImages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse images', e);
      }
    }
  }, []);

  // Sync to localStorage
  const saveImages = (newImages) => {
    setImages(newImages);
    try {
      localStorage.setItem('dashboard_images', JSON.stringify(newImages));
    } catch (e) {
      setErrorMsg('Storage full! Try uploading a smaller size image or deleting existing ones.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size limit (limit to 1MB to avoid hitting localStorage 5MB limit)
    if (file.size > 1024 * 1024) {
      setErrorMsg('File too large. Please select an image under 1MB to ensure persistent storage.');
      setFilePreview(null);
      setFileData(null);
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
      setFileData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!fileData) {
      setErrorMsg('Please select an image first.');
      return;
    }

    const newImage = {
      id: Date.now(),
      title: title.trim() || 'Untitled Image',
      description: description.trim() || 'No description provided.',
      src: fileData,
      date: new Date().toLocaleDateString()
    };

    const updatedImages = [newImage, ...images];
    saveImages(updatedImages);

    // Reset inputs
    setTitle('');
    setDescription('');
    setFilePreview(null);
    setFileData(null);
    setErrorMsg('');
    // Clear file input HTML element
    document.getElementById('image-file-input').value = '';
  };

  const handleDelete = (id) => {
    const filtered = images.filter((img) => img.id !== id);
    saveImages(filtered);
  };

  return (
    <div className="view-container">
      <h1 className="view-title">Image Upload & Gallery</h1>

      <div className="upload-section">
        <form onSubmit={handleUpload} className="upload-form">
          {errorMsg && <div className="alert-message alert-danger">{errorMsg}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="image-file-input">Select Image</label>
            <input
              id="image-file-input"
              type="file"
              accept="image/*"
              className="form-control-file"
              onChange={handleFileChange}
            />
          </div>

          {filePreview && (
            <div className="image-preview-container">
              <p className="preview-label">Image Preview:</p>
              <img src={filePreview} alt="Preview" className="image-preview" />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Image Title</label>
            <input
              type="text"
              placeholder="Enter Image Title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description / Caption</label>
            <textarea
              placeholder="Enter image description"
              className="form-control text-area"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={!fileData}>
            Upload Image
          </button>
        </form>
      </div>

      <h2 className="section-title">Gallery ({images.length} images)</h2>

      {images.length === 0 ? (
        <div className="empty-gallery">
          <p>No images uploaded yet. Use the form above to add your first image!</p>
        </div>
      ) : (
        <div className="image-grid">
          {images.map((img) => (
            <div key={img.id} className="image-card">
              <div className="card-image-wrapper">
                <img src={img.src} alt={img.title} className="card-image" />
              </div>
              <div className="card-content">
                <h3 className="card-title">{img.title}</h3>
                <p className="card-date">{img.date}</p>
                <p className="card-desc">{img.description}</p>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="btn btn-danger btn-sm card-delete-btn"
                >
                  Delete Image
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploadPage;
