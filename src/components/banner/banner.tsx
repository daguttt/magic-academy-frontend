'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface BannerProps {
  className?: string;
}

const Banner: React.FC<BannerProps> = ({ className }) => {
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  useEffect(() => {
    // Cargar la imagen almacenada al montar el componente
    const storedImage = localStorage.getItem('bannerImage');
    if (storedImage) {
      setBannerImage(storedImage);
    }
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
      // Guardar la imagen en localStorage
      localStorage.setItem('bannerImage', imageUrl);
    }
  };

  return (
    <div className="relative">
      <div
        className={clsx(
          'relative h-64 cursor-pointer bg-cover bg-center',
          className
        )}
        style={{
          backgroundImage: `url('${bannerImage || 'https://picsum.photos/200/300'}')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="flex h-full items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            ¡Bienvenido instructor!
          </h1>
        </div>
        <label className="absolute bottom-4 right-4 cursor-pointer rounded bg-blue-600 px-4 py-2 text-white">
          Seleccionar Archivo
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden" // Ocultar el input de archivo
          />
        </label>
      </div>
    </div>
  );
};

export default Banner;
