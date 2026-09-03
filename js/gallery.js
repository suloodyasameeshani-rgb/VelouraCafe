/* =========================================================
   VELOURA CAFE
   GALLERY PAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           NAVBAR
        ================================================= */

        const galleryHeader =
            document.getElementById(
                "galleryHeader"
            );


        window.addEventListener(
            "scroll",
            function () {

                galleryHeader.classList.toggle(
                    "scrolled",
                    window.scrollY > 50
                );

            }
        );



        /* =================================================
           REVEAL ANIMATION
        ================================================= */

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.1
                }
            );


        document
            .querySelectorAll(
                ".reveal"
            )
            .forEach(
                function (element) {

                    observer.observe(
                        element
                    );

                }
            );



        /* =================================================
           GALLERY ITEMS
        ================================================= */

        const galleryItems =
            Array.from(
                document.querySelectorAll(
                    ".gallery-item"
                )
            );


        const filterButtons =
            document.querySelectorAll(
                ".filter-button"
            );


        const galleryEmpty =
            document.getElementById(
                "galleryEmpty"
            );


        let currentFilter =
            "all";


        function filterGallery() {

            let visibleCount =
                0;


            galleryItems.forEach(
                function (item) {

                    const category =
                        item.dataset.category;


                    const isVisible =
                        currentFilter === "all" ||
                        currentFilter === category;


                    item.classList.toggle(
                        "hidden",
                        !isVisible
                    );


                    if (
                        isVisible
                    ) {

                        visibleCount++;

                    }

                }
            );


            galleryEmpty.classList.toggle(
                "active",
                visibleCount === 0
            );

        }



        filterButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        filterButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        currentFilter =
                            button.dataset.filter;


                        filterGallery();

                    }
                );

            }
        );



        /* =================================================
           GALLERY DATA
        ================================================= */

        const galleryData =
            [
                {
                    image:
                        "assets/images/gallery-1.jpg",

                    category:
                        "COFFEE",

                    title:
                        "The First Pour"
                },

                {
                    image:
                        "assets/images/gallery-2.jpg",

                    category:
                        "INTERIOR",

                    title:
                        "Quiet Luxury"
                },

                {
                    image:
                        "assets/images/gallery-3.jpg",

                    category:
                        "DESSERT",

                    title:
                        "Sweet Detail"
                },

                {
                    image:
                        "assets/images/gallery-4.jpg",

                    category:
                        "FOOD",

                    title:
                        "Crafted Flavour"
                },

                {
                    image:
                        "assets/images/gallery-5.jpg",

                    category:
                        "MOMENTS",

                    title:
                        "Time Well Spent"
                },

                {
                    image:
                        "assets/images/gallery-6.jpg",

                    category:
                        "COFFEE",

                    title:
                        "Art in Every Cup"
                },

                {
                    image:
                        "assets/images/gallery-7.jpg",

                    category:
                        "INTERIOR",

                    title:
                        "Designed to Stay"
                },

                {
                    image:
                        "assets/images/gallery-8.jpg",

                    category:
                        "DESSERT",

                    title:
                        "A Little Indulgence"
                },

                {
                    image:
                        "assets/images/gallery-9.jpg",

                    category:
                        "FOOD",

                    title:
                        "Made with Intention"
                },

                {
                    image:
                        "assets/images/gallery-10.jpg",

                    category:
                        "MOMENTS",

                    title:
                        "Evening at Veloura"
                }
            ];



        /* =================================================
           LIGHTBOX
        ================================================= */

        const lightbox =
            document.getElementById(
                "galleryLightbox"
            );


        const lightboxImage =
            document.getElementById(
                "lightboxImage"
            );


        const lightboxCategory =
            document.getElementById(
                "lightboxCategory"
            );


        const lightboxTitle =
            document.getElementById(
                "lightboxTitle"
            );


        const lightboxCurrent =
            document.getElementById(
                "lightboxCurrent"
            );


        const lightboxTotal =
            document.getElementById(
                "lightboxTotal"
            );


        let currentIndex =
            0;



        function formatNumber(
            number
        ) {

            return String(
                number
            ).padStart(
                2,
                "0"
            );

        }



        function updateLightbox() {

            const item =
                galleryData[
                    currentIndex
                ];


            lightboxImage.src =
                item.image;


            lightboxImage.alt =
                item.title;


            lightboxCategory.textContent =
                item.category;


            lightboxTitle.textContent =
                item.title;


            lightboxCurrent.textContent =
                formatNumber(
                    currentIndex + 1
                );


            lightboxTotal.textContent =
                formatNumber(
                    galleryData.length
                );

        }



        function openLightbox(
            index
        ) {

            currentIndex =
                index;


            updateLightbox();


            lightbox.classList.add(
                "active"
            );


            document.body.classList.add(
                "modal-open"
            );

        }



        function closeLightbox() {

            lightbox.classList.remove(
                "active"
            );


            document.body.classList.remove(
                "modal-open"
            );

        }



        function nextImage() {

            currentIndex++;


            if (
                currentIndex >=
                galleryData.length
            ) {

                currentIndex =
                    0;

            }


            updateLightbox();

        }



        function previousImage() {

            currentIndex--;


            if (
                currentIndex < 0
            ) {

                currentIndex =
                    galleryData.length - 1;

            }


            updateLightbox();

        }



        galleryItems.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        openLightbox(
                            Number(
                                item.dataset.index
                            )
                        );

                    }
                );

            }
        );



        document
            .getElementById(
                "lightboxClose"
            )
            .addEventListener(
                "click",
                closeLightbox
            );


        document
            .getElementById(
                "lightboxBackdrop"
            )
            .addEventListener(
                "click",
                closeLightbox
            );


        document
            .getElementById(
                "lightboxNext"
            )
            .addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    nextImage();

                }
            );


        document
            .getElementById(
                "lightboxPrev"
            )
            .addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    previousImage();

                }
            );



        /* =================================================
           KEYBOARD
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    !lightbox.classList.contains(
                        "active"
                    )
                ) {

                    return;

                }


                if (
                    event.key === "Escape"
                ) {

                    closeLightbox();

                }


                if (
                    event.key === "ArrowRight"
                ) {

                    nextImage();

                }


                if (
                    event.key === "ArrowLeft"
                ) {

                    previousImage();

                }

            }
        );



        /* =================================================
           INITIAL
        ================================================= */

        filterGallery();


    }
);