import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

document.addEventListener("DOMContentLoaded", () => {
    
    new Swiper(".swiper", {
        modules: [Navigation, Pagination],
        loop: true,
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
