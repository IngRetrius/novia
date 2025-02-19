import { useState } from "react";
import Image from "next/image"; // Importamos Image de Next.js
import Modal from "../../ui/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { galleryItems } from "./galleryImages";

export default function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100 p-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-4">Gallery</h2>
      <p className="text-purple-600 text-center max-w-2xl mx-auto mb-8 italic">
        &quot;These are my favorite photos among thousands, and I&apos;m certain we will create countless more beautiful memories together in the near future. I love you Irem.&quot;
      </p>
      
      {/* Contenedor principal del Swiper */}
      <div className="w-full max-w-6xl aspect-[16/9]">
        <Swiper
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          loop={true}
          className="w-full h-full rounded-xl overflow-hidden"
        >
          {galleryItems.map((src: string, index: number) => (
            <SwiperSlide key={index} className="relative">
              {src.endsWith(".mp4") ? (
                <video
                  src={src}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => {
                    setSelectedMedia(src);
                    setIsOpen(true);
                  }}
                  controls
                />
              ) : (
                <Image
                  src={src}
                  alt={`Gallery item ${index + 1}`}
                  width={1920} // Ajusta según el tamaño real de las imágenes
                  height={1080}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => {
                    setSelectedMedia(src);
                    setIsOpen(true);
                  }}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal para vista ampliada */}
      {selectedMedia && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="max-h-[90vh] max-w-[90vw] overflow-hidden">
            {selectedMedia.endsWith(".mp4") ? (
              <video
                src={selectedMedia}
                controls
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <Image
                src={selectedMedia}
                alt="Selected"
                width={1920}
                height={1080}
                className="w-full h-full object-contain rounded-lg"
              />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
