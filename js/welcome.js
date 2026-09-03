/* =========================================================
   VELOURA CAFE
   PREMIUM CINEMATIC WELCOME
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        const loadingProgress =
            document.getElementById(
                "loadingProgress"
            );


        const loadingNumber =
            document.getElementById(
                "loadingNumber"
            );


        const exitTransition =
            document.getElementById(
                "exitTransition"
            );


        const welcomeContent =
            document.getElementById(
                "welcomeContent"
            );



        /* =================================================
           LOADING BAR
        ================================================= */

        let progress = 0;


        const loadingTimer =
            setInterval(
                function () {


                    if (
                        progress < 92
                    ) {


                        progress +=
                            Math.floor(
                                Math.random() * 7
                            ) + 2;


                        if (
                            progress > 92
                        ) {


                            progress = 92;


                        }


                        loadingProgress.style.width =
                            progress + "%";


                        loadingNumber.textContent =
                            progress + "%";


                    }


                },
                180
            );



        /* =================================================
           FINAL LOADING
        ================================================= */

        setTimeout(
            function () {


                clearInterval(
                    loadingTimer
                );


                progress = 100;


                loadingProgress.style.transition =
                    "width 0.7s cubic-bezier(0.22, 1, 0.36, 1)";


                loadingProgress.style.width =
                    "100%";


                loadingNumber.textContent =
                    "100%";


            },
            3300
        );



        /* =================================================
           SUBTLE 3D MOUSE MOVEMENT
        ================================================= */

        document.addEventListener(
            "mousemove",
            function (event) {


                if (
                    window.innerWidth < 800
                ) {


                    return;


                }


                const x =
                    (
                        event.clientX /
                        window.innerWidth -
                        0.5
                    );


                const y =
                    (
                        event.clientY /
                        window.innerHeight -
                        0.5
                    );


                const rotateY =
                    x * 3.5;


                const rotateX =
                    y * -2.5;


                welcomeContent.style.transform =
                    "perspective(1500px) rotateX(" +
                    rotateX +
                    "deg) rotateY(" +
                    rotateY +
                    "deg)";


            }
        );



        document.addEventListener(
            "mouseleave",
            function () {


                welcomeContent.style.transform =
                    "perspective(1500px) rotateX(0deg) rotateY(0deg)";


            }
        );



        /* =================================================
           EXIT ANIMATION
        ================================================= */

        setTimeout(
            function () {


                exitTransition.classList.add(
                    "active"
                );


            },
            4000
        );



        /* =================================================
           OPEN INTRO
        ================================================= */

        setTimeout(
            function () {


                window.location.href =
                    "intro.html";


            },
            4850
        );


    }
);