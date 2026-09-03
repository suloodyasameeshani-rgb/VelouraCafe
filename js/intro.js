/* =========================================================
   VELOURA INTRO
   3D SLIDER + THIRD-SLIDE UNLOCK
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        const slidesTrack =
            document.getElementById(
                "slidesTrack"
            );


        const productWindow =
            document.getElementById(
                "productWindow"
            );


        const sliderDots =
            document.querySelectorAll(
                ".slider-dot"
            );


        const introCopy =
            document.getElementById(
                "introCopy"
            );


        const introTitle =
            document.getElementById(
                "introTitle"
            );


        const introDescription =
            document.getElementById(
                "introDescription"
            );


        const getStartedButton =
            document.getElementById(
                "getStartedButton"
            );


        const buttonLabel =
            document.getElementById(
                "buttonLabel"
            );


        const progressNote =
            document.getElementById(
                "progressNote"
            );


        const pageTransition =
            document.getElementById(
                "pageTransition"
            );


        const productDepthLayers =
            document.querySelectorAll(
                ".product-depth-layer"
            );



        /* =================================================
           CONTENT
        ================================================= */

        const slides = [


            {

                title:
                    "Coffee made<br>to be remembered.",

                description:
                    "Smooth, elegant and thoughtfully crafted for your everyday moments."

            },


            {

                title:
                    "A little luxury<br>in every sip.",

                description:
                    "Refreshing coffee with character, balance and a refined Veloura finish."

            },


            {

                title:
                    "Sweet moments.<br>Beautifully made.",

                description:
                    "Indulgent flavours created to make every Veloura visit feel special."

            }


        ];



        let currentSlide = 0;


        let thirdSlideVisited = false;


        let dragStartX = 0;


        let dragCurrentX = 0;


        let dragging = false;



        /* =================================================
           BUTTON STATE
        ================================================= */

        function updateButtonState() {


            if (
                thirdSlideVisited
            ) {


                getStartedButton.classList.remove(
                    "locked"
                );


                getStartedButton.classList.add(
                    "unlocked"
                );


                getStartedButton.setAttribute(
                    "aria-disabled",
                    "false"
                );


                buttonLabel.textContent =
                    "ENTER VELOURA";


                progressNote.textContent =
                    "Your Veloura experience is ready.";


                progressNote.classList.add(
                    "ready"
                );


            } else {


                getStartedButton.classList.add(
                    "locked"
                );


                getStartedButton.classList.remove(
                    "unlocked"
                );


                getStartedButton.setAttribute(
                    "aria-disabled",
                    "true"
                );


                buttonLabel.textContent =
                    "VIEW ALL 3 TO CONTINUE";


                progressNote.textContent =
                    "Explore all three Veloura creations first.";


                progressNote.classList.remove(
                    "ready"
                );


            }


        }



        /* =================================================
           SHOW SLIDE
        ================================================= */

        function showSlide(index) {


            if (
                index < 0
            ) {


                index =
                    slides.length - 1;


            }


            if (
                index >=
                slides.length
            ) {


                index = 0;


            }


            currentSlide =
                index;



            /* UNLOCK AFTER THIRD SLIDE IS REACHED */

            if (
                currentSlide === 2
            ) {


                thirdSlideVisited =
                    true;


                updateButtonState();


            }



            /* MOVE TRACK */

            slidesTrack.style.transform =
                "translateX(-" +
                currentSlide *
                33.333333 +
                "%)";



            /* DOTS */

            sliderDots.forEach(
                function (
                    dot,
                    dotIndex
                ) {


                    dot.classList.toggle(
                        "active",
                        dotIndex ===
                        currentSlide
                    );


                }
            );



            /* TEXT */

            introCopy.classList.add(
                "changing"
            );


            setTimeout(
                function () {


                    introTitle.innerHTML =
                        slides[
                            currentSlide
                        ].title;


                    introDescription.textContent =
                        slides[
                            currentSlide
                        ].description;


                    introCopy.classList.remove(
                        "changing"
                    );


                },
                230
            );


        }



        /* =================================================
           DOT CLICK
        ================================================= */

        sliderDots.forEach(
            function (dot) {


                dot.addEventListener(
                    "click",
                    function () {


                        showSlide(
                            Number(
                                dot.dataset.slide
                            )
                        );


                    }
                );


            }
        );



        /* =================================================
           TOUCH SWIPE
        ================================================= */

        productWindow.addEventListener(
            "touchstart",
            function (event) {


                dragStartX =
                    event.touches[0]
                        .clientX;


                dragCurrentX =
                    dragStartX;


                dragging =
                    true;


            },
            {
                passive: true
            }
        );


        productWindow.addEventListener(
            "touchmove",
            function (event) {


                if (!dragging) {

                    return;

                }


                dragCurrentX =
                    event.touches[0]
                        .clientX;


            },
            {
                passive: true
            }
        );


        productWindow.addEventListener(
            "touchend",
            function () {


                finishDrag(
                    45
                );


            }
        );



        /* =================================================
           MOUSE DRAG
        ================================================= */

        productWindow.addEventListener(
            "mousedown",
            function (event) {


                dragStartX =
                    event.clientX;


                dragCurrentX =
                    dragStartX;


                dragging =
                    true;


            }
        );


        window.addEventListener(
            "mousemove",
            function (event) {


                if (!dragging) {

                    return;

                }


                dragCurrentX =
                    event.clientX;


            }
        );


        window.addEventListener(
            "mouseup",
            function () {


                finishDrag(
                    60
                );


            }
        );



        /* =================================================
           FINISH DRAG
        ================================================= */

        function finishDrag(
            threshold
        ) {


            if (!dragging) {

                return;

            }


            const difference =
                dragStartX -
                dragCurrentX;


            if (
                Math.abs(
                    difference
                ) > threshold
            ) {


                if (
                    difference > 0
                ) {


                    showSlide(
                        currentSlide + 1
                    );


                } else {


                    showSlide(
                        currentSlide - 1
                    );


                }


            }


            dragging =
                false;


        }



        /* =================================================
           KEYBOARD
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {


                if (
                    event.key ===
                    "ArrowRight"
                ) {


                    showSlide(
                        currentSlide + 1
                    );


                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {


                    showSlide(
                        currentSlide - 1
                    );


                }


                if (
                    event.key ===
                    "Enter" &&
                    thirdSlideVisited
                ) {


                    openHome();


                }


            }
        );



        /* =================================================
           3D TILT
        ================================================= */

        productWindow.addEventListener(
            "mousemove",
            function (event) {


                if (
                    window.innerWidth <
                    800
                ) {


                    return;


                }


                const rect =
                    productWindow
                        .getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    (
                        x -
                        centerX
                    ) /
                    centerX *
                    5;


                const rotateX =
                    -(
                        y -
                        centerY
                    ) /
                    centerY *
                    4;


                productWindow.style.transform =
                    "perspective(1400px) rotateX(" +
                    rotateX +
                    "deg) rotateY(" +
                    rotateY +
                    "deg) translateY(-3px)";


                productDepthLayers.forEach(
                    function (layer) {


                        layer.style.transform =
                            "translateX(" +
                            rotateY * 1.4 +
                            "px) translateY(" +
                            -rotateX * 1.4 +
                            "px)";


                    }
                );


            }
        );



        productWindow.addEventListener(
            "mouseleave",
            function () {


                productWindow.style.transform =
                    "perspective(1400px) rotateX(0deg) rotateY(0deg) translateY(0)";


                productDepthLayers.forEach(
                    function (layer) {


                        layer.style.transform =
                            "translateX(0) translateY(0)";


                    }
                );


            }
        );



        /* =================================================
           BUTTON CLICK
        ================================================= */

        getStartedButton.addEventListener(
            "click",
            function () {


                if (
                    !thirdSlideVisited
                ) {


                    getStartedButton.animate(

                        [

                            {
                                transform:
                                    "translateX(0)"
                            },

                            {
                                transform:
                                    "translateX(-5px)"
                            },

                            {
                                transform:
                                    "translateX(5px)"
                            },

                            {
                                transform:
                                    "translateX(-3px)"
                            },

                            {
                                transform:
                                    "translateX(3px)"
                            },

                            {
                                transform:
                                    "translateX(0)"
                            }

                        ],

                        {

                            duration:
                                380

                        }

                    );


                    return;


                }


                openHome();


            }
        );



        /* =================================================
           OPEN HOME
        ================================================= */

        function openHome() {


            pageTransition.classList.add(
                "active"
            );


            setTimeout(
                function () {


                    window.location.href =
                        "home.html";


                },
                1200
            );


        }



        /* =================================================
           START
        ================================================= */

        updateButtonState();


        showSlide(
            0
        );


    }
);