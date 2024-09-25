'use client';
import React, { useState, DragEvent } from 'react';

const DragDropArea: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find((file) => file.type.startsWith('video/'));
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoUrl(url);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
      className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-input p-4"
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
          <label
            htmlFor="file-input"
            className="cursor-pointer rounded bg-blue-500 p-2 text-white"
          >
            Upload Video
          </label>
        </>
      ) : (
        <div className="relative flex w-full justify-center transition-opacity duration-300 ease-in-out">
          {isHovered ? (
            <video
              style={{ maxWidth: 'calc(100% + 20px)', maxHeight: '120px' }} // Ajuste responsivo
              controls
              className="transform transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="opacity-0 transition-opacity duration-300 ease-in-out">
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
              className="absolute right-0 top-0 rounded bg-red-500 p-1 text-white"
              onClick={handleRemoveVideo} // Llama a handleRemoveVideo
            >
              X
            </button>
          )}
          {!isHovered && <p className="mt-2 text-green-600">Video Uploaded!</p>}
        </div>
      )}
    </div>
  );
};

export default DragDropArea;
