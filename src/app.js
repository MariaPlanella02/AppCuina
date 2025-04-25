import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";


// Importa módulos de Node.js necesarios para Sharp
import sharp from "sharp";
import fs from "fs";
import path from "path";

// Detecta si el script debe ejecutarse solo para optimizar imágenes
const args = process.argv.slice(2); // Obtiene argumentos de la línea de comandos
const optimizeOnly = args.includes("--optimize-only");


if (optimizeOnly) {
    optimizeImages(); // Ejecuta solo la optimización de imágenes
} else {
    document.addEventListener("DOMContentLoaded", () => {
        
        new Swiper(".swiper", {
            modules: [Navigation, Pagination],
            loop: true,
            autoHeight: false,
            slidesPerView: 1,
            centeredSlides: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    });
}


// Función para optimizar imágenes con Sharp
function optimizeImages() {
    const inputDir = "./src/img"; // Carpeta con imágenes originales
    const outputDir = "./src/optimized-img"; // Carpeta de imágenes optimizadas

    // Crear carpeta de destino si no existe
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // Leer y procesar imágenes
    fs.readdir(inputDir, (err, files) => {
        if (err) {
            console.error("Error leyendo las imágenes:", err);
            return;
        }
    
        files.forEach(file => {
            const inputPath = path.join(inputDir, file);
    
            sharp(inputPath)
                .resize({ width: 400 }) // Versión para móviles
                .toFile(path.join(outputDir, `small-${file.split('.')[0]}.webp`));
            sharp(inputPath)
                .resize({ width: 800 }) // Versión para tablets
                .toFile(path.join(outputDir, `medium-${file.split('.')[0]}.webp`));
            sharp(inputPath)
                .resize({ width: 1200 }) // Versión para ordenadores
                .toFile(path.join(outputDir, `large-${file.split('.')[0]}.webp`));
        });
    });
    
}