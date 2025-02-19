'use client';

import { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import HeroSection from '@/components/sections/Hero';
import ReasonsSection from '@/components/sections/ReasonsSection/ReasonsSection'; // Importa el componente de razones
import GallerySection from '@/components/sections/GallerySection/GallerySection'; // Importa el componente de galería
import PromisesSection from '@/components/sections/PromisesSection/PromisesSection'; // Importa el componente de promesas
import GardenSection from '@/components/sections/GardenSection/GardenSection'; // Importa el componente de jardín

export default function Home() {
const [activeSection, setActiveSection] = useState('hero');

return (
<div className="relative">
{/* Barra de navegación */}
<Navigation
activeSection={activeSection}
onSectionChange={setActiveSection}
/>

{/* Sección Hero */}
{activeSection === 'hero' && <HeroSection />}

{/* Contenedor principal para las demás secciones */}
<div className="pt-20 px-4">
<div className="max-w-4xl mx-auto">
{/* Sección de Razones */}
{activeSection === 'reasons' && <ReasonsSection />}

{/* Sección de Galería */}
{activeSection === 'gallery' && <GallerySection />}

{/* Sección de Promesas */}
{activeSection === 'promises' && <PromisesSection />}

{/* Sección de Jardín */}
{activeSection === 'garden' && <GardenSection />}
</div>
</div>
</div>
);
}