/* =========================================================
   VELOURACAFE
   HOME PAGE ANIMATION + 3D
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        const navbar =
            document.getElementById(
                "navbar"
            );


        const menuToggle =
            document.getElementById(
                "menuToggle"
            );


        const mobileMenu =
            document.getElementById(
                "mobileMenu"
            );


        const hero =
            document.querySelector(
                ".hero"
            );


        const heroContent =
            document.getElementById(
                "heroContent"
            );


        const heroVideo =
            document.querySelector(
                ".hero-video"
            );


        const cursorLight =
            document.getElementById(
                "cursorLight"
            );


        const interiorImage =
            document.getElementById(
                "interiorImage"
            );


        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        const tiltCards =
            document.querySelectorAll(
                "[data-tilt]"
            );


        const magneticButtons =
            document.querySelectorAll(
                ".magnetic"
            );



        /* =================================================
           MOBILE MENU
        ================================================= */

        if (
            menuToggle &&
            mobileMenu
        ) {


            menuToggle.addEventListener(
                "click",
                function () {


                    mobileMenu.classList.toggle(
                        "active"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        mobileMenu.classList.contains(
                            "active"
                        )
                    );


                }
            );


            document
                .querySelectorAll(
                    ".mobile-menu a"
                )
                .forEach(
                    function (link) {


                        link.addEventListener(
                            "click",
                            function () {


                                mobileMenu.classList.remove(
                                    "active"
                                );


                                menuToggle.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );


                            }
                        );


                    }
                );


        }



        /* =================================================
           NAVBAR SCROLL
        ================================================= */

        function updateNavbar() {


            if (!navbar) {

                return;

            }


            if (
                window.scrollY > 45
            ) {


                navbar.classList.add(
                    "scrolled"
                );


            } else {


                navbar.classList.remove(
                    "scrolled"
                );


            }


        }


        window.addEventListener(
            "scroll",
            updateNavbar
        );


        updateNavbar();



        /* =================================================
           VIDEO
        ================================================= */

        if (heroVideo) {


            heroVideo.muted = true;


            heroVideo.setAttribute(
                "muted",
                ""
            );


            heroVideo.setAttribute(
                "playsinline",
                ""
            );


            heroVideo.play().catch(
                function () {


                    console.log(
                        "Hero video autoplay was blocked."
                    );


                }
            );


        }



        /* =================================================
           SCROLL REVEAL
        ================================================= */

        if (
            "IntersectionObserver"
            in window
        ) {


            const revealObserver =
                new IntersectionObserver(

                    function (
                        entries,
                        observer
                    ) {


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

                        threshold: 0.12,

                        rootMargin:
                            "0px 0px -30px 0px"

                    }

                );


            revealElements.forEach(
                function (element) {


                    revealObserver.observe(
                        element
                    );


                }
            );


        } else {


            revealElements.forEach(
                function (element) {


                    element.classList.add(
                        "visible"
                    );


                }
            );


        }



        /* =================================================
           CURSOR LIGHT
        ================================================= */

        if (
            cursorLight &&
            window.innerWidth > 980
        ) {


            document.addEventListener(
                "mousemove",
                function (event) {


                    cursorLight.style.opacity =
                        "1";


                    cursorLight.style.left =
                        event.clientX + "px";


                    cursorLight.style.top =
                        event.clientY + "px";


                }
            );


            document.addEventListener(
                "mouseleave",
                function () {


                    cursorLight.style.opacity =
                        "0";


                }
            );


        }



        /* =================================================
           HERO 3D DEPTH
        ================================================= */

        if (
            hero &&
            heroContent &&
            window.innerWidth > 980
        ) {


            hero.addEventListener(
                "mousemove",
                function (event) {


                    const rect =
                        hero.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    const rotateY =
                        x /
                        rect.width *
                        2.5;


                    const rotateX =
                        -y /
                        rect.height *
                        1.7;


                    heroContent.style.transform =
                        "rotateX(" +
                        rotateX +
                        "deg) rotateY(" +
                        rotateY +
                        "deg)";


                }
            );


            hero.addEventListener(
                "mouseleave",
                function () {


                    heroContent.style.transform =
                        "rotateX(0deg) rotateY(0deg)";


                }
            );


        }



        /* =================================================
           IMAGE 3D TILT
        ================================================= */

        tiltCards.forEach(
            function (card) {


                card.addEventListener(
                    "mousemove",
                    function (event) {


                        if (
                            window.innerWidth <= 980
                        ) {

                            return;

                        }


                        const rect =
                            card.getBoundingClientRect();


                        const mouseX =
                            event.clientX -
                            rect.left;


                        const mouseY =
                            event.clientY -
                            rect.top;


                        const centerX =
                            rect.width / 2;


                        const centerY =
                            rect.height / 2;


                        const rotateY =
                            (
                                mouseX -
                                centerX
                            ) /
                            centerX *
                            3.5;


                        const rotateX =
                            -(
                                mouseY -
                                centerY
                            ) /
                            centerY *
                            3.5;


                        card.style.transform =
                            "perspective(1200px) rotateX(" +
                            rotateX +
                            "deg) rotateY(" +
                            rotateY +
                            "deg) translateY(-3px)";


                    }
                );


                card.addEventListener(
                    "mouseleave",
                    function () {


                        card.style.transform =
                            "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";


                    }
                );


            }
        );



        /* =================================================
           MAGNETIC BUTTONS
        ================================================= */

        magneticButtons.forEach(
            function (button) {


                button.addEventListener(
                    "mousemove",
                    function (event) {


                        if (
                            window.innerWidth <= 980
                        ) {

                            return;

                        }


                        const rect =
                            button.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left -
                            rect.width / 2;


                        const y =
                            event.clientY -
                            rect.top -
                            rect.height / 2;


                        button.style.transform =
                            "translate(" +
                            x * 0.05 +
                            "px, " +
                            y * 0.05 +
                            "px) translateY(-2px)";


                    }
                );


                button.addEventListener(
                    "mouseleave",
                    function () {


                        button.style.transform =
                            "translate(0, 0)";


                    }
                );


            }
        );



        /* =================================================
           INTERIOR PARALLAX
        ================================================= */

        function updateInteriorParallax() {


            if (!interiorImage) {

                return;

            }


            const section =
                interiorImage.parentElement;


            const rect =
                section.getBoundingClientRect();


            const viewportHeight =
                window.innerHeight;


            if (
                rect.bottom > 0 &&
                rect.top < viewportHeight
            ) {


                const progress =
                    (
                        viewportHeight -
                        rect.top
                    ) /
                    (
                        viewportHeight +
                        rect.height
                    );


                const movement =
                    (
                        progress -
                        0.5
                    ) *
                    55;


                interiorImage.style.transform =
                    "translateY(" +
                    movement +
                    "px) scale(1.03)";


            }


        }


        window.addEventListener(
            "scroll",
            updateInteriorParallax
        );


        updateInteriorParallax();



        /* =================================================
           SMOOTH LINKS
        ================================================= */

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
                function (link) {


                    link.addEventListener(
                        "click",
                        function (event) {


                            const href =
                                link.getAttribute(
                                    "href"
                                );


                            if (
                                !href ||
                                href === "#"
                            ) {

                                return;

                            }


                            const target =
                                document.querySelector(
                                    href
                                );


                            if (target) {


                                event.preventDefault();


                                target.scrollIntoView(
                                    {

                                        behavior:
                                            "smooth",

                                        block:
                                            "start"

                                    }
                                );


                            }


                        }
                    );


                }
            );



        /* =================================================
           CUSTOMER ACCOUNT
        ================================================= */

        const customerAccount =
            document.getElementById(
                "customerAccount"
            );


        const customerAccountButton =
            document.getElementById(
                "customerAccountButton"
            );


        const customerAccountName =
            document.getElementById(
                "customerAccountName"
            );


        const customerArrow =
            document.getElementById(
                "customerArrow"
            );


        const customerDropdownName =
            document.getElementById(
                "customerDropdownName"
            );


        const customerDropdownEmail =
            document.getElementById(
                "customerDropdownEmail"
            );


        const customerSignOut =
            document.getElementById(
                "customerSignOut"
            );


        const mobileCustomerButton =
            document.getElementById(
                "mobileCustomerButton"
            );


        const mobileCustomerLinks =
            document.getElementById(
                "mobileCustomerLinks"
            );


        const mobileCustomerSignOut =
            document.getElementById(
                "mobileCustomerSignOut"
            );


        const customerAuthModal =
            document.getElementById(
                "customerAuthModal"
            );


        const customerAuthBackdrop =
            document.getElementById(
                "customerAuthBackdrop"
            );


        const customerAuthClose =
            document.getElementById(
                "customerAuthClose"
            );


        const customerSignupTab =
            document.getElementById(
                "customerSignupTab"
            );


        const customerSigninTab =
            document.getElementById(
                "customerSigninTab"
            );


        const customerSignupForm =
            document.getElementById(
                "customerSignupForm"
            );


        const customerSigninForm =
            document.getElementById(
                "customerSigninForm"
            );



        /* =================================================
           GET SAVED USER
        ================================================= */

        function getVelouraUser() {


            try {


                const savedUser =
                    localStorage.getItem(
                        "velouraUser"
                    );


                if (!savedUser) {

                    return null;

                }


                return JSON.parse(
                    savedUser
                );


            } catch (error) {


                return null;


            }


        }



        /* =================================================
           LOGIN STATUS
        ================================================= */

        function isVelouraLoggedIn() {


            return (
                localStorage.getItem(
                    "velouraLoggedIn"
                ) === "true"
            );


        }



        /* =================================================
           FIRST NAME
        ================================================= */

        function getCustomerFirstName(name) {


            if (!name) {

                return "CUSTOMER";

            }


            return name
                .trim()
                .split(/\s+/)[0];


        }



        /* =================================================
           UPDATE NAVBAR ACCOUNT
        ================================================= */

        function updateCustomerAccount() {


            const user =
                getVelouraUser();


            const loggedIn =
                Boolean(
                    user &&
                    isVelouraLoggedIn()
                );


            if (loggedIn) {


                const firstName =
                    getCustomerFirstName(
                        user.name
                    );


                if (customerAccount) {


                    customerAccount.classList.add(
                        "logged-in"
                    );


                }


                if (customerAccountName) {


                    customerAccountName.textContent =
                        firstName.toUpperCase();


                }


                if (customerArrow) {


                    customerArrow.style.display =
                        "inline-block";


                }


                if (customerDropdownName) {


                    customerDropdownName.textContent =
                        user.name ||
                        firstName;


                }


                if (customerDropdownEmail) {


                    customerDropdownEmail.textContent =
                        user.email ||
                        "Veloura Customer";


                }


                if (mobileCustomerButton) {


                    mobileCustomerButton.textContent =
                        firstName.toUpperCase() +
                        " ▾";


                }


            } else {


                if (customerAccount) {


                    customerAccount.classList.remove(
                        "logged-in"
                    );


                    customerAccount.classList.remove(
                        "open"
                    );


                }


                if (customerAccountButton) {


                    customerAccountButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                }


                if (customerAccountName) {


                    customerAccountName.textContent =
                        "SIGN IN";


                }


                if (customerArrow) {


                    customerArrow.style.display =
                        "none";


                }


                if (customerDropdownName) {


                    customerDropdownName.textContent =
                        "Guest";


                }


                if (customerDropdownEmail) {


                    customerDropdownEmail.textContent =
                        "Welcome to Veloura";


                }


                if (mobileCustomerButton) {


                    mobileCustomerButton.textContent =
                        "SIGN IN";


                }


                if (mobileCustomerLinks) {


                    mobileCustomerLinks.classList.remove(
                        "active"
                    );


                }


            }


        }



        /* =================================================
           AUTH TABS
        ================================================= */

        function showCustomerSignup() {


            if (
                !customerSignupTab ||
                !customerSigninTab ||
                !customerSignupForm ||
                !customerSigninForm
            ) {

                return;

            }


            customerSignupTab.classList.add(
                "active"
            );


            customerSigninTab.classList.remove(
                "active"
            );


            customerSignupForm.classList.add(
                "active"
            );


            customerSigninForm.classList.remove(
                "active"
            );


        }



        function showCustomerSignin() {


            if (
                !customerSignupTab ||
                !customerSigninTab ||
                !customerSignupForm ||
                !customerSigninForm
            ) {

                return;

            }


            customerSigninTab.classList.add(
                "active"
            );


            customerSignupTab.classList.remove(
                "active"
            );


            customerSigninForm.classList.add(
                "active"
            );


            customerSignupForm.classList.remove(
                "active"
            );


        }



        /* =================================================
           OPEN AUTH
        ================================================= */

        function openCustomerAuth(type) {


            if (!customerAuthModal) {

                return;

            }


            if (type === "signin") {


                showCustomerSignin();


            } else {


                showCustomerSignup();


            }


            customerAuthModal.classList.add(
                "active"
            );


            customerAuthModal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "customer-modal-open"
            );


        }



        /* =================================================
           CLOSE AUTH
        ================================================= */

        function closeCustomerAuth() {


            if (!customerAuthModal) {

                return;

            }


            customerAuthModal.classList.remove(
                "active"
            );


            customerAuthModal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "customer-modal-open"
            );


        }



        /* =================================================
           DESKTOP ACCOUNT BUTTON
        ================================================= */

        if (
            customerAccountButton &&
            customerAccount
        ) {


            customerAccountButton.addEventListener(
                "click",
                function (event) {


                    event.preventDefault();


                    event.stopPropagation();



                    if (
                        isVelouraLoggedIn() &&
                        getVelouraUser()
                    ) {


                        customerAccount.classList.toggle(
                            "open"
                        );


                        customerAccountButton.setAttribute(
                            "aria-expanded",
                            customerAccount.classList.contains(
                                "open"
                            )
                                ? "true"
                                : "false"
                        );


                    } else {


                        openCustomerAuth(
                            "signup"
                        );


                    }


                }
            );


        }



        /* =================================================
           SIGN UP TAB
        ================================================= */

        if (customerSignupTab) {


            customerSignupTab.addEventListener(
                "click",
                showCustomerSignup
            );


        }



        /* =================================================
           SIGN IN TAB
        ================================================= */

        if (customerSigninTab) {


            customerSigninTab.addEventListener(
                "click",
                showCustomerSignin
            );


        }



        /* =================================================
           MODAL CLOSE
        ================================================= */

        if (customerAuthClose) {


            customerAuthClose.addEventListener(
                "click",
                closeCustomerAuth
            );


        }


        if (customerAuthBackdrop) {


            customerAuthBackdrop.addEventListener(
                "click",
                closeCustomerAuth
            );


        }



        /* =================================================
           SIGN UP
        ================================================= */

        if (customerSignupForm) {


            customerSignupForm.addEventListener(
                "submit",
                function (event) {


                    event.preventDefault();



                    const name =
                        document
                            .getElementById(
                                "customerSignupName"
                            )
                            .value
                            .trim();



                    const email =
                        document
                            .getElementById(
                                "customerSignupEmail"
                            )
                            .value
                            .trim()
                            .toLowerCase();



                    const phone =
                        document
                            .getElementById(
                                "customerSignupPhone"
                            )
                            .value
                            .trim();



                    const password =
                        document
                            .getElementById(
                                "customerSignupPassword"
                            )
                            .value;



                    const errorBox =
                        document.getElementById(
                            "customerSignupError"
                        );



                    errorBox.textContent =
                        "";



                    if (
                        name.length < 2
                    ) {


                        errorBox.textContent =
                            "Please enter your name.";


                        return;


                    }



                    if (
                        !email ||
                        !email.includes("@")
                    ) {


                        errorBox.textContent =
                            "Please enter a valid email address.";


                        return;


                    }



                    if (
                        phone.length < 7
                    ) {


                        errorBox.textContent =
                            "Please enter your phone number.";


                        return;


                    }



                    if (
                        password.length < 6
                    ) {


                        errorBox.textContent =
                            "Password must contain at least 6 characters.";


                        return;


                    }



                    const user = {


                        name:
                            name,


                        email:
                            email,


                        phone:
                            phone,


                        password:
                            password


                    };



                    localStorage.setItem(
                        "velouraUser",
                        JSON.stringify(
                            user
                        )
                    );



                    localStorage.setItem(
                        "velouraLoggedIn",
                        "true"
                    );



                    updateCustomerAccount();


                    closeCustomerAuth();


                    customerSignupForm.reset();


                }
            );


        }



        /* =================================================
           SIGN IN
        ================================================= */

        if (customerSigninForm) {


            customerSigninForm.addEventListener(
                "submit",
                function (event) {


                    event.preventDefault();



                    const email =
                        document
                            .getElementById(
                                "customerSigninEmail"
                            )
                            .value
                            .trim()
                            .toLowerCase();



                    const password =
                        document
                            .getElementById(
                                "customerSigninPassword"
                            )
                            .value;



                    const errorBox =
                        document.getElementById(
                            "customerSigninError"
                        );



                    errorBox.textContent =
                        "";



                    const user =
                        getVelouraUser();



                    if (!user) {


                        errorBox.textContent =
                            "No Veloura account found. Please sign up first.";


                        return;


                    }



                    if (
                        String(
                            user.email ||
                            ""
                        ).toLowerCase() !==
                        email
                    ) {


                        errorBox.textContent =
                            "Email address does not match your Veloura account.";


                        return;


                    }



                    if (
                        String(
                            user.password ||
                            ""
                        ) !==
                        password
                    ) {


                        errorBox.textContent =
                            "Incorrect password.";


                        return;


                    }



                    localStorage.setItem(
                        "velouraLoggedIn",
                        "true"
                    );



                    updateCustomerAccount();


                    closeCustomerAuth();


                    customerSigninForm.reset();


                }
            );


        }



        /* =================================================
           SIGN OUT
        ================================================= */

        function signOutVelouraCustomer() {


            localStorage.setItem(
                "velouraLoggedIn",
                "false"
            );


            if (customerAccount) {


                customerAccount.classList.remove(
                    "open"
                );


            }


            if (mobileCustomerLinks) {


                mobileCustomerLinks.classList.remove(
                    "active"
                );


            }


            updateCustomerAccount();


        }



        if (customerSignOut) {


            customerSignOut.addEventListener(
                "click",
                signOutVelouraCustomer
            );


        }



        if (mobileCustomerSignOut) {


            mobileCustomerSignOut.addEventListener(
                "click",
                signOutVelouraCustomer
            );


        }



        /* =================================================
           MOBILE CUSTOMER
        ================================================= */

        if (mobileCustomerButton) {


            mobileCustomerButton.addEventListener(
                "click",
                function () {


                    if (
                        isVelouraLoggedIn() &&
                        getVelouraUser()
                    ) {


                        if (mobileCustomerLinks) {


                            mobileCustomerLinks.classList.toggle(
                                "active"
                            );


                        }


                    } else {


                        openCustomerAuth(
                            "signup"
                        );


                    }


                }
            );


        }



        /* =================================================
           CLICK OUTSIDE DROPDOWN
        ================================================= */

        document.addEventListener(
            "click",
            function (event) {


                if (
                    customerAccount &&
                    !customerAccount.contains(
                        event.target
                    )
                ) {


                    customerAccount.classList.remove(
                        "open"
                    );


                    if (customerAccountButton) {


                        customerAccountButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                    }


                }


            }
        );



        /* =================================================
           ESCAPE
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {


                if (
                    event.key !==
                    "Escape"
                ) {


                    return;


                }


                if (customerAccount) {


                    customerAccount.classList.remove(
                        "open"
                    );


                }


                if (customerAccountButton) {


                    customerAccountButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                }


                if (mobileCustomerLinks) {


                    mobileCustomerLinks.classList.remove(
                        "active"
                    );


                }


                closeCustomerAuth();


            }
        );



        /* =================================================
           SYNC BETWEEN PAGES / TABS
        ================================================= */

        window.addEventListener(
            "storage",
            function (event) {


                if (
                    event.key ===
                        "velouraUser" ||
                    event.key ===
                        "velouraLoggedIn"
                ) {


                    updateCustomerAccount();


                }


            }
        );



        /* =================================================
           INITIAL ACCOUNT UPDATE
        ================================================= */

        updateCustomerAccount();


    }
);