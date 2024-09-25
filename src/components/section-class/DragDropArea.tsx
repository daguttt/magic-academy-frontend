'use client';
import React, { useState, DragEvent} from "react";

const DragDropArea: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoUrl(url);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClosePreview = () => {
    setIsHovered(false); // Cerrar el preview
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleRemoveVideo = () => {
    setVideoUrl(null); // Eliminar el video
    setIsHovered(false); // Restablecer el hover
  };

  return (
    <div
      className="border-2 border-dashed border-input rounded-lg p-4 flex flex-col items-center justify-center h-64"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!videoUrl ? (
        <>
          <p className="text-muted-foreground">Drag and Drop your video here</p>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="mt-4"
            id="file-input"
            style={{ display: 'none' }} // Ocultar el input por defecto
          />
          <label htmlFor="file-input" className="bg-blue-500 text-white p-2 rounded cursor-pointer">
            Upload Video
          </label>
        </>
      ) : (
        <div className="relative w-full flex justify-center transition-opacity duration-300 ease-in-out">
          {isHovered ? (
            <video
              style={{ maxWidth: 'calc(100% + 20px)', maxHeight: '120px' }} // Ajuste responsivo
              controls
              className="transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="transition-opacity duration-300 ease-in-out opacity-0">
              <video
                style={{ maxWidth: 'calc(100% + 20px)', maxHeight: '120px' }} // Ajuste responsivo
                controls
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {isHovered && (
            <button
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
              onClick={handleRemoveVideo} // Llama a handleRemoveVideo
            >
              X
            </button>
          )}
          {!isHovered && (
            <p className="mt-2 text-green-600">Video Uploaded!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DragDropArea;
