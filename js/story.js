/* =========================================================
   VELOURA CAFE
   STORY PAGE
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           SCROLL REVEAL
        ================================================= */

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


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
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            function (element) {


                observer.observe(
                    element
                );


            }
        );



        /* =================================================
           NAVBAR
        ================================================= */

        const header =
            document.getElementById(
                "storyHeader"
            );


        function updateNavbar() {


            if (
                window.scrollY > 50
            ) {


                header.classList.add(
                    "scrolled"
                );


            } else {


                header.classList.remove(
                    "scrolled"
                );


            }


        }


        updateNavbar();


        window.addEventListener(
            "scroll",
            updateNavbar
        );



        /* =================================================
           HERO 3D PARALLAX
        ================================================= */

        const heroVisual =
            document.getElementById(
                "heroVisual"
            );


        const depthItems =
            document.querySelectorAll(
                "[data-depth]"
            );


        if (
            heroVisual
        ) {


            heroVisual.addEventListener(
                "mousemove",
                function (event) {


                    if (
                        window.innerWidth < 900
                    ) {


                        return;


                    }


                    const rect =
                        heroVisual
                            .getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width -
                        0.5;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height -
                        0.5;


                    const rotateY =
                        x * 5;


                    const rotateX =
                        y * -4;


                    heroVisual.style.transform =
                        "perspective(1500px) rotateX(" +
                        rotateX +
                        "deg) rotateY(" +
                        rotateY +
                        "deg)";


                    depthItems.forEach(
                        function (item) {


                            const depth =
                                Number(
                                    item.dataset.depth
                                );


                            item.style.translate =
                                x *
                                depth *
                                16 +
                                "px " +
                                y *
                                depth *
                                16 +
                                "px";


                        }
                    );


                }
            );



            heroVisual.addEventListener(
                "mouseleave",
                function () {


                    heroVisual.style.transform =
                        "perspective(1500px) rotateX(0deg) rotateY(0deg)";


                    depthItems.forEach(
                        function (item) {


                            item.style.translate =
                                "0 0";


                        }
                    );


                }
            );


        }



        /* =================================================
           IMAGE TILT
        ================================================= */

        const tiltCards =
            document.querySelectorAll(
                "[data-tilt]"
            );


        tiltCards.forEach(
            function (card) {


                card.addEventListener(
                    "mousemove",
                    function (event) {


                        if (
                            window.innerWidth < 900
                        ) {


                            return;


                        }


                        const rect =
                            card
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
                            4;


                        const rotateX =
                            -(
                                y -
                                centerY
                            ) /
                            centerY *
                            4;


                        card.style.transform =
                            "perspective(1200px) rotateX(" +
                            rotateX +
                            "deg) rotateY(" +
                            rotateY +
                            "deg) scale(1.015)";


                    }
                );



                card.addEventListener(
                    "mouseleave",
                    function () {


                        card.style.transform =
                            "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";


                    }
                );


            }
        );



        /* =================================================
           EXPERIENCE CARD 3D
        ================================================= */

        const experienceCards =
            document.querySelectorAll(
                ".experience-card"
            );


        experienceCards.forEach(
            function (card) {


                card.addEventListener(
                    "mousemove",
                    function (event) {


                        if (
                            window.innerWidth < 900
                        ) {


                            return;


                        }


                        const rect =
                            card
                                .getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        const rotateY =
                            (
                                x -
                                rect.width / 2
                            ) /
                            rect.width *
                            5;


                        const rotateX =
                            -(
                                y -
                                rect.height / 2
                            ) /
                            rect.height *
                            5;


                        card.style.transform =
                            "perspective(1000px) translateY(-8px) rotateX(" +
                            rotateX +
                            "deg) rotateY(" +
                            rotateY +
                            "deg)";


                    }
                );



                card.addEventListener(
                    "mouseleave",
                    function () {


                        card.style.transform =
                            "perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg)";


                    }
                );


            }
        );



        /* =================================================
           HERO MOUSE LIGHT
        ================================================= */

        const storyHero =
            document.querySelector(
                ".story-hero"
            );


        if (
            storyHero
        ) {


            storyHero.addEventListener(
                "mousemove",
                function (event) {


                    if (
                        window.innerWidth < 800
                    ) {


                        return;


                    }


                    const rect =
                        storyHero
                            .getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    storyHero.style.setProperty(
                        "--mouse-x",
                        x + "px"
                    );


                    storyHero.style.setProperty(
                        "--mouse-y",
                        y + "px"
                    );


                }
            );


        }



        /* =================================================
           INTERIOR PARALLAX
        ================================================= */

        const interiorSection =
            document.querySelector(
                ".interior-feature"
            );


        const interiorImage =
            document.getElementById(
                "interiorImage"
            );


        if (
            interiorSection &&
            interiorImage
        ) {


            window.addEventListener(
                "scroll",
                function () {


                    const rect =
                        interiorSection
                            .getBoundingClientRect();


                    const windowHeight =
                        window.innerHeight;


                    if (
                        rect.bottom > 0 &&
                        rect.top <
                        windowHeight
                    ) {


                        const progress =
                            (
                                windowHeight -
                                rect.top
                            ) /
                            (
                                windowHeight +
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
                            "px)";


                    }


                }
            );


        }



        /* =================================================
           SMOOTH INTERNAL LINKS
        ================================================= */

        const anchorLinks =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        anchorLinks.forEach(
            function (link) {


                link.addEventListener(
                    "click",
                    function (event) {


                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {


                            return;


                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (
                            target
                        ) {


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
           HERO INITIAL REVEAL
        ================================================= */

        setTimeout(
            function () {


                const heroRevealItems =
                    document.querySelectorAll(
                        ".story-hero .reveal"
                    );


                heroRevealItems.forEach(
                    function (
                        item,
                        index
                    ) {


                        setTimeout(
                            function () {


                                item.classList.add(
                                    "visible"
                                );


                            },
                            index * 120
                        );


                    }
                );


            },
            120
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



        function isVelouraLoggedIn() {


            return (
                localStorage.getItem(
                    "velouraLoggedIn"
                ) === "true"
            );


        }



        function getCustomerFirstName(name) {


            if (!name) {

                return "CUSTOMER";

            }


            return name
                .trim()
                .split(/\s+/)[0];


        }



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


                if (customerDropdownName) {


                    customerDropdownName.textContent =
                        "Guest";


                }


                if (customerDropdownEmail) {


                    customerDropdownEmail.textContent =
                        "Welcome to Veloura";


                }


            }


        }



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



        function openCustomerAuth(type) {


            if (!customerAuthModal) {

                return;

            }


            if (
                type === "signin"
            ) {


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



        if (customerSignupTab) {


            customerSignupTab.addEventListener(
                "click",
                showCustomerSignup
            );


        }



        if (customerSigninTab) {


            customerSigninTab.addEventListener(
                "click",
                showCustomerSignin
            );


        }



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



        if (customerSignupForm) {


            customerSignupForm.addEventListener(
                "submit",
                function (event) {


                    event.preventDefault();


                    const nameInput =
                        document.getElementById(
                            "customerSignupName"
                        );


                    const emailInput =
                        document.getElementById(
                            "customerSignupEmail"
                        );


                    const phoneInput =
                        document.getElementById(
                            "customerSignupPhone"
                        );


                    const passwordInput =
                        document.getElementById(
                            "customerSignupPassword"
                        );


                    const errorBox =
                        document.getElementById(
                            "customerSignupError"
                        );


                    const name =
                        nameInput
                            ? nameInput.value.trim()
                            : "";


                    const email =
                        emailInput
                            ? emailInput.value
                                .trim()
                                .toLowerCase()
                            : "";


                    const phone =
                        phoneInput
                            ? phoneInput.value.trim()
                            : "";


                    const password =
                        passwordInput
                            ? passwordInput.value
                            : "";


                    if (errorBox) {


                        errorBox.textContent =
                            "";


                    }


                    if (
                        name.length < 2
                    ) {


                        if (errorBox) {


                            errorBox.textContent =
                                "Please enter your name.";


                        }


                        return;


                    }


                    if (
                        !email ||
                        !email.includes("@")
                    ) {


                        if (errorBox) {


                            errorBox.textContent =
                                "Please enter a valid email address.";


                        }


                        return;


                    }


                    if (
                        phone.length < 7
                    ) {


                        if (errorBox) {


                            errorBox.textContent =
                                "Please enter your phone number.";


                        }


                        return;


                    }


                    if (
                        password.length < 6
                    ) {


                        if (errorBox) {


                            errorBox.textContent =
                                "Password must contain at least 6 characters.";


                        }


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



        if (customerSigninForm) {


            customerSigninForm.addEventListener(
                "submit",
                function (event) {


                    event.preventDefault();


                    const emailInput =
                        document.getElementById(
                            "customerSigninEmail"
                        );


                    const passwordInput =
                        document.getElementById(
                            "customerSigninPassword"
                        );


                    const errorBox =
                        document.getElementById(
                            "customerSigninError"
                        );


                    const email =
                        emailInput
                            ? emailInput.value
                                .trim()
                                .toLowerCase()
                            : "";


                    const password =
                        passwordInput
                            ? passwordInput.value
                            : "";


                    if (errorBox) {


                        errorBox.textContent =
                            "";


                    }


                    const user =
                        getVelouraUser();


                    if (!user) {


                        if (errorBox) {


                            errorBox.textContent =
                                "No Veloura account found. Please sign up first.";


                        }


                        return;


                    }


                    if (
                        String(
                            user.email ||
                            ""
                        ).toLowerCase() !==
                        email
                    ) {


                        if (errorBox) {


                            errorBox.textContent =
                                "Email address does not match your Veloura account.";


                        }


                        return;


                    }


                    if (
                        String(
                            user.password ||
                            ""
                        ) !==
                        password
                    ) {


                        if (errorBox) {


                            errorBox.textContent =
                                "Incorrect password.";


                        }


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


            updateCustomerAccount();


        }



        if (customerSignOut) {


            customerSignOut.addEventListener(
                "click",
                signOutVelouraCustomer
            );


        }



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


                closeCustomerAuth();


            }
        );



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



        updateCustomerAccount();


    }
);