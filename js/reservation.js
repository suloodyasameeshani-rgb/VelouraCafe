/* =========================================================
   VELOURA CAFE
   RESERVATION PAGE
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           NAVBAR
        ================================================= */

        const header =
            document.getElementById(
                "reservationHeader"
            );


        function updateNavbar() {

            if (!header) {
                return;
            }

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
           REVEAL
        ================================================= */

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        const revealObserver =
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


                                revealObserver.unobserve(
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

                revealObserver.observe(
                    element
                );

            }
        );



        /* =================================================
           BOOKING CARD 3D
        ================================================= */

        const bookingCard =
            document.getElementById(
                "bookingCard"
            );


        if (
            bookingCard
        ) {


            bookingCard.addEventListener(
                "mousemove",
                function (event) {


                    if (
                        window.innerWidth < 900
                    ) {

                        return;

                    }


                    const rect =
                        bookingCard
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
                        2.5;


                    const rotateX =
                        -(
                            y -
                            centerY
                        ) /
                        centerY *
                        2;


                    bookingCard.style.transform =
                        "perspective(1400px) rotateX(" +
                        rotateX +
                        "deg) rotateY(" +
                        rotateY +
                        "deg)";


                }
            );


            bookingCard.addEventListener(
                "mouseleave",
                function () {


                    bookingCard.style.transform =
                        "perspective(1400px) rotateX(0deg) rotateY(0deg)";


                }
            );


        }



        /* =================================================
           DETAIL CARD 3D
        ================================================= */

        const detailCards =
            document.querySelectorAll(
                ".reservation-details > div"
            );


        detailCards.forEach(
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
                            3;


                        const rotateX =
                            -(
                                y -
                                rect.height / 2
                            ) /
                            rect.height *
                            3;


                        card.style.transform =
                            "perspective(900px) translateX(8px) translateY(-3px) rotateX(" +
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
                            "perspective(900px) translateX(0) translateY(0) rotateX(0deg) rotateY(0deg)";


                    }
                );


            }
        );



        /* =================================================
           FORM ELEMENTS
        ================================================= */

        const reservationForm =
            document.getElementById(
                "reservationForm"
            );


        const nameInput =
            document.getElementById(
                "name"
            );


        const phoneInput =
            document.getElementById(
                "phone"
            );


        const emailInput =
            document.getElementById(
                "email"
            );


        const dateInput =
            document.getElementById(
                "date"
            );


        const timeInput =
            document.getElementById(
                "time"
            );


        const messageInput =
            document.getElementById(
                "message"
            );


        const guestMinus =
            document.getElementById(
                "guestMinus"
            );


        const guestPlus =
            document.getElementById(
                "guestPlus"
            );


        const guestCount =
            document.getElementById(
                "guestCount"
            );


        const guestsInput =
            document.getElementById(
                "guests"
            );


        let guests = 2;



        /* =================================================
           GUEST SELECTOR
        ================================================= */

        function updateGuests() {


            if (guestCount) {

                guestCount.textContent =
                    guests;

            }


            if (guestsInput) {

                guestsInput.value =
                    guests;

            }


        }


        if (guestMinus) {


            guestMinus.addEventListener(
                "click",
                function () {


                    if (
                        guests > 1
                    ) {


                        guests--;


                        updateGuests();


                    }


                }
            );


        }


        if (guestPlus) {


            guestPlus.addEventListener(
                "click",
                function () {


                    if (
                        guests < 12
                    ) {


                        guests++;


                        updateGuests();


                    }


                }
            );


        }



        /* =================================================
           DATE MINIMUM
        ================================================= */

        if (dateInput) {


            const today =
                new Date();


            const year =
                today.getFullYear();


            const month =
                String(
                    today.getMonth() + 1
                ).padStart(
                    2,
                    "0"
                );


            const day =
                String(
                    today.getDate()
                ).padStart(
                    2,
                    "0"
                );


            dateInput.min =
                year +
                "-" +
                month +
                "-" +
                day;


        }



        /* =================================================
           FORM ERROR
        ================================================= */

        function showError(
            input,
            message
        ) {


            if (!input) {
                return;
            }


            const group =
                input.closest(
                    ".form-group"
                );


            if (!group) {
                return;
            }


            const error =
                group.querySelector(
                    ".error-message"
                );


            group.classList.add(
                "invalid"
            );


            if (
                error
            ) {


                error.textContent =
                    message;


            }


        }



        function clearError(
            input
        ) {


            if (!input) {
                return;
            }


            const group =
                input.closest(
                    ".form-group"
                );


            if (
                !group
            ) {

                return;

            }


            group.classList.remove(
                "invalid"
            );


            const error =
                group.querySelector(
                    ".error-message"
                );


            if (
                error
            ) {


                error.textContent =
                    "";


            }


        }



        function validEmail(
            email
        ) {


            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(
                    email
                );


        }



        function validateForm() {


            let valid =
                true;


            [
                nameInput,
                phoneInput,
                emailInput,
                dateInput,
                timeInput
            ].forEach(
                function (input) {


                    clearError(
                        input
                    );


                }
            );


            if (
                !nameInput ||
                nameInput.value
                    .trim()
                    .length < 2
            ) {


                showError(
                    nameInput,
                    "Please enter your name."
                );


                valid =
                    false;


            }


            if (
                !phoneInput ||
                phoneInput.value
                    .trim()
                    .length < 7
            ) {


                showError(
                    phoneInput,
                    "Please enter a valid phone number."
                );


                valid =
                    false;


            }


            if (
                !emailInput ||
                !validEmail(
                    emailInput.value
                        .trim()
                )
            ) {


                showError(
                    emailInput,
                    "Please enter a valid email."
                );


                valid =
                    false;


            }


            if (
                !dateInput ||
                !dateInput.value
            ) {


                showError(
                    dateInput,
                    "Please choose a date."
                );


                valid =
                    false;


            }


            if (
                !timeInput ||
                !timeInput.value
            ) {


                showError(
                    timeInput,
                    "Please choose a time."
                );


                valid =
                    false;


            }


            return valid;


        }



        /* =================================================
           RESERVATION HISTORY
        ================================================= */

        function getReservationHistoryKey(
            email
        ) {


            if (
                email &&
                email.trim()
            ) {


                return (
                    "velouraReservationHistory_" +
                    email
                        .trim()
                        .toLowerCase()
                );


            }


            return "velouraReservationHistory";


        }



        function createReservationNumber() {


            const stamp =
                Date.now()
                    .toString()
                    .slice(-6);


            const random =
                Math.floor(
                    Math.random() *
                    90 +
                    10
                );


            return (
                "VR-" +
                stamp +
                random
            );


        }



        function saveReservationToHistory() {


            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();


            const reservation = {


                reservationNumber:
                    createReservationNumber(),


                createdAt:
                    new Date()
                        .toISOString(),


                bookingDate:
                    new Date()
                        .toISOString(),


                date:
                    dateInput.value,


                time:
                    timeInput.value,


                guests:
                    guests,


                name:
                    nameInput.value
                        .trim(),


                email:
                    email,


                phone:
                    phoneInput.value
                        .trim(),


                occasion:
                    "",


                message:
                    messageInput
                        ? messageInput.value.trim()
                        : "",


                status:
                    "upcoming"


            };


            localStorage.setItem(
                "velouraLastReservation",
                JSON.stringify(
                    reservation
                )
            );


            const historyKey =
                getReservationHistoryKey(
                    reservation.email
                );


            let history = [];


            try {


                const savedHistory =
                    localStorage.getItem(
                        historyKey
                    );


                if (
                    savedHistory
                ) {


                    const parsed =
                        JSON.parse(
                            savedHistory
                        );


                    if (
                        Array.isArray(
                            parsed
                        )
                    ) {


                        history =
                            parsed;


                    }


                }


            } catch (error) {


                history =
                    [];


            }


            history.unshift(
                reservation
            );


            localStorage.setItem(
                historyKey,
                JSON.stringify(
                    history
                )
            );


            return reservation;


        }



        /* =================================================
           CONFIRMATION
        ================================================= */

        const confirmationModal =
            document.getElementById(
                "confirmationModal"
            );


        const confirmationText =
            document.getElementById(
                "confirmationText"
            );


        const closeConfirmation =
            document.getElementById(
                "closeConfirmation"
            );


        if (
            reservationForm
        ) {


            reservationForm.addEventListener(
                "submit",
                function (event) {


                    event.preventDefault();


                    if (
                        !validateForm()
                    ) {


                        return;


                    }


                    const selectedDate =
                        new Date(
                            dateInput.value +
                            "T00:00:00"
                        );


                    const formattedDate =
                        selectedDate.toLocaleDateString(
                            "en-GB",
                            {
                                day:
                                    "numeric",

                                month:
                                    "long",

                                year:
                                    "numeric"
                            }
                        );


                    saveReservationToHistory();


                    if (
                        confirmationText
                    ) {


                        confirmationText.textContent =
                            nameInput.value.trim() +
                            ", your table for " +
                            guests +
                            " guest" +
                            (
                                guests > 1
                                    ? "s"
                                    : ""
                            ) +
                            " has been requested for " +
                            formattedDate +
                            " at " +
                            timeInput.options[
                                timeInput.selectedIndex
                            ].text +
                            ".";


                    }


                    if (
                        confirmationModal
                    ) {


                        confirmationModal.classList.add(
                            "active"
                        );


                    }


                    document.body.style.overflow =
                        "hidden";


                }
            );


        }



        if (
            closeConfirmation
        ) {


            closeConfirmation.addEventListener(
                "click",
                function () {


                    if (
                        confirmationModal
                    ) {


                        confirmationModal.classList.remove(
                            "active"
                        );


                    }


                    document.body.style.overflow =
                        "";


                    if (
                        reservationForm
                    ) {


                        reservationForm.reset();


                    }


                    guests =
                        2;


                    updateGuests();


                    prefillReservationForm();


                }
            );


        }



        if (
            confirmationModal
        ) {


            confirmationModal.addEventListener(
                "click",
                function (event) {


                    if (
                        event.target ===
                        confirmationModal
                    ) {


                        confirmationModal.classList.remove(
                            "active"
                        );


                        document.body.style.overflow =
                            "";


                    }


                }
            );


        }



        /* =================================================
           CLEAR FORM ERRORS
        ================================================= */

        if (
            reservationForm
        ) {


            const formInputs =
                reservationForm.querySelectorAll(
                    "input, select, textarea"
                );


            formInputs.forEach(
                function (input) {


                    input.addEventListener(
                        "input",
                        function () {


                            clearError(
                                input
                            );


                        }
                    );


                    input.addEventListener(
                        "change",
                        function () {


                            clearError(
                                input
                            );


                        }
                    );


                }
            );


        }



        /* =================================================
           CUSTOMER ACCOUNT ELEMENTS
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



        /* =================================================
           LOCAL STORAGE USER
        ================================================= */

        function getVelouraUser() {


            try {


                const savedUser =
                    localStorage.getItem(
                        "velouraUser"
                    );


                if (
                    !savedUser
                ) {


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
                ) ===
                "true"
            );


        }



        function getCustomerFirstName(
            name
        ) {


            if (
                !name
            ) {


                return "CUSTOMER";


            }


            return name
                .trim()
                .split(/\s+/)[0];


        }



        /* =================================================
           PREFILL RESERVATION FORM
        ================================================= */

        function prefillReservationForm() {


            const user =
                getVelouraUser();


            if (
                !user ||
                !isVelouraLoggedIn()
            ) {


                return;


            }


            if (
                nameInput &&
                !nameInput.value &&
                user.name
            ) {


                nameInput.value =
                    user.name;


            }


            if (
                emailInput &&
                !emailInput.value &&
                user.email
            ) {


                emailInput.value =
                    user.email;


            }


            if (
                phoneInput &&
                !phoneInput.value &&
                user.phone
            ) {


                phoneInput.value =
                    user.phone;


            }


        }



        /* =================================================
           UPDATE ACCOUNT
        ================================================= */

        function updateCustomerAccount() {


            const user =
                getVelouraUser();


            const loggedIn =
                Boolean(
                    user &&
                    isVelouraLoggedIn()
                );


            if (
                loggedIn
            ) {


                const firstName =
                    getCustomerFirstName(
                        user.name
                    );


                if (
                    customerAccount
                ) {


                    customerAccount.classList.add(
                        "logged-in"
                    );


                }


                if (
                    customerAccountName
                ) {


                    customerAccountName.textContent =
                        firstName.toUpperCase();


                }


                if (
                    customerDropdownName
                ) {


                    customerDropdownName.textContent =
                        user.name ||
                        firstName;


                }


                if (
                    customerDropdownEmail
                ) {


                    customerDropdownEmail.textContent =
                        user.email ||
                        "Veloura Customer";


                }


                prefillReservationForm();


            } else {


                if (
                    customerAccount
                ) {


                    customerAccount.classList.remove(
                        "logged-in"
                    );


                    customerAccount.classList.remove(
                        "open"
                    );


                }


                if (
                    customerAccountName
                ) {


                    customerAccountName.textContent =
                        "SIGN IN";


                }


                if (
                    customerAccountButton
                ) {


                    customerAccountButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                }


                if (
                    customerDropdownName
                ) {


                    customerDropdownName.textContent =
                        "Guest";


                }


                if (
                    customerDropdownEmail
                ) {


                    customerDropdownEmail.textContent =
                        "Welcome to Veloura";


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
           OPEN / CLOSE AUTH
        ================================================= */

        function openCustomerAuth(
            type
        ) {


            if (
                !customerAuthModal
            ) {


                return;


            }


            if (
                type ===
                "signin"
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


            if (
                !customerAuthModal
            ) {


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
           ACCOUNT BUTTON
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



        if (
            customerSignupTab
        ) {


            customerSignupTab.addEventListener(
                "click",
                showCustomerSignup
            );


        }



        if (
            customerSigninTab
        ) {


            customerSigninTab.addEventListener(
                "click",
                showCustomerSignin
            );


        }



        if (
            customerAuthClose
        ) {


            customerAuthClose.addEventListener(
                "click",
                closeCustomerAuth
            );


        }



        if (
            customerAuthBackdrop
        ) {


            customerAuthBackdrop.addEventListener(
                "click",
                closeCustomerAuth
            );


        }



        /* =================================================
           SIGN UP
        ================================================= */

        if (
            customerSignupForm
        ) {


            customerSignupForm.addEventListener(
                "submit",
                function (event) {


                    event.preventDefault();


                    const signupNameInput =
                        document.getElementById(
                            "customerSignupName"
                        );


                    const signupEmailInput =
                        document.getElementById(
                            "customerSignupEmail"
                        );


                    const signupPhoneInput =
                        document.getElementById(
                            "customerSignupPhone"
                        );


                    const signupPasswordInput =
                        document.getElementById(
                            "customerSignupPassword"
                        );


                    const signupError =
                        document.getElementById(
                            "customerSignupError"
                        );


                    const signupName =
                        signupNameInput
                            ? signupNameInput.value.trim()
                            : "";


                    const signupEmail =
                        signupEmailInput
                            ? signupEmailInput.value
                                .trim()
                                .toLowerCase()
                            : "";


                    const signupPhone =
                        signupPhoneInput
                            ? signupPhoneInput.value.trim()
                            : "";


                    const signupPassword =
                        signupPasswordInput
                            ? signupPasswordInput.value
                            : "";


                    if (
                        signupError
                    ) {


                        signupError.textContent =
                            "";


                    }


                    if (
                        signupName.length < 2
                    ) {


                        if (
                            signupError
                        ) {


                            signupError.textContent =
                                "Please enter your name.";


                        }


                        return;


                    }


                    if (
                        !validEmail(
                            signupEmail
                        )
                    ) {


                        if (
                            signupError
                        ) {


                            signupError.textContent =
                                "Please enter a valid email address.";


                        }


                        return;


                    }


                    if (
                        signupPhone.length < 7
                    ) {


                        if (
                            signupError
                        ) {


                            signupError.textContent =
                                "Please enter your phone number.";


                        }


                        return;


                    }


                    if (
                        signupPassword.length < 6
                    ) {


                        if (
                            signupError
                        ) {


                            signupError.textContent =
                                "Password must contain at least 6 characters.";


                        }


                        return;


                    }


                    const user = {


                        name:
                            signupName,


                        email:
                            signupEmail,


                        phone:
                            signupPhone,


                        password:
                            signupPassword


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

        if (
            customerSigninForm
        ) {


            customerSigninForm.addEventListener(
                "submit",
                function (event) {


                    event.preventDefault();


                    const signinEmailInput =
                        document.getElementById(
                            "customerSigninEmail"
                        );


                    const signinPasswordInput =
                        document.getElementById(
                            "customerSigninPassword"
                        );


                    const signinError =
                        document.getElementById(
                            "customerSigninError"
                        );


                    const signinEmail =
                        signinEmailInput
                            ? signinEmailInput.value
                                .trim()
                                .toLowerCase()
                            : "";


                    const signinPassword =
                        signinPasswordInput
                            ? signinPasswordInput.value
                            : "";


                    if (
                        signinError
                    ) {


                        signinError.textContent =
                            "";


                    }


                    const user =
                        getVelouraUser();


                    if (
                        !user
                    ) {


                        if (
                            signinError
                        ) {


                            signinError.textContent =
                                "No Veloura account found. Please sign up first.";


                        }


                        return;


                    }


                    if (
                        String(
                            user.email ||
                            ""
                        ).toLowerCase() !==
                        signinEmail
                    ) {


                        if (
                            signinError
                        ) {


                            signinError.textContent =
                                "Email address does not match your Veloura account.";


                        }


                        return;


                    }


                    if (
                        String(
                            user.password ||
                            ""
                        ) !==
                        signinPassword
                    ) {


                        if (
                            signinError
                        ) {


                            signinError.textContent =
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



        /* =================================================
           SIGN OUT
        ================================================= */

        function signOutVelouraCustomer() {


            localStorage.setItem(
                "velouraLoggedIn",
                "false"
            );


            if (
                customerAccount
            ) {


                customerAccount.classList.remove(
                    "open"
                );


            }


            updateCustomerAccount();


        }


        if (
            customerSignOut
        ) {


            customerSignOut.addEventListener(
                "click",
                signOutVelouraCustomer
            );


        }



        /* =================================================
           CLICK OUTSIDE
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


                    if (
                        customerAccountButton
                    ) {


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


                if (
                    customerAccount
                ) {


                    customerAccount.classList.remove(
                        "open"
                    );


                }


                if (
                    customerAccountButton
                ) {


                    customerAccountButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                }


                closeCustomerAuth();


            }
        );



        /* =================================================
           STORAGE SYNC
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
           HERO INITIAL REVEAL
        ================================================= */

        setTimeout(
            function () {


                const heroItems =
                    document.querySelectorAll(
                        ".reservation-hero .reveal"
                    );


                heroItems.forEach(
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
           INITIAL ACCOUNT
        ================================================= */

        updateCustomerAccount();

        updateGuests();


    }
);