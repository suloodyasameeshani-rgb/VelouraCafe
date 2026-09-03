/* =========================================================
   VELOURA CAFE
   RESERVATION HISTORY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           ELEMENTS
        ================================================= */

        const header =
            document.getElementById(
                "historyHeader"
            );


        const reservationList =
            document.getElementById(
                "reservationList"
            );


        const emptyHistory =
            document.getElementById(
                "emptyHistory"
            );


        const noResults =
            document.getElementById(
                "noResults"
            );


        const reservationSearch =
            document.getElementById(
                "reservationSearch"
            );


        const reservationFilter =
            document.getElementById(
                "reservationFilter"
            );


        const reservationModal =
            document.getElementById(
                "reservationModal"
            );


        const bookAgainModal =
            document.getElementById(
                "bookAgainModal"
            );


        let reservations =
            [];


        let selectedReservation =
            null;


        let bookAgainReservation =
            null;



        /* =================================================
           NAVBAR
        ================================================= */

        window.addEventListener(
            "scroll",
            function () {

                header.classList.toggle(
                    "scrolled",
                    window.scrollY > 50
                );

            }
        );



        /* =================================================
           REVEAL
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
                function (item) {

                    observer.observe(
                        item
                    );

                }
            );



        /* =================================================
           USER
        ================================================= */

        function getSavedUser() {

            const saved =
                localStorage.getItem(
                    "velouraUser"
                );


            if (
                !saved
            ) {

                return null;

            }


            try {

                return JSON.parse(
                    saved
                );

            } catch (error) {

                return null;

            }

        }


        function getLoggedInUser() {

            if (
                localStorage.getItem(
                    "velouraLoggedIn"
                ) !== "true"
            ) {

                return null;

            }


            return getSavedUser();

        }


        function updateCustomer() {

            const user =
                getLoggedInUser();


            const name =
                document.getElementById(
                    "customerName"
                );


            const email =
                document.getElementById(
                    "customerEmail"
                );


            const initial =
                document.getElementById(
                    "customerInitial"
                );


            if (
                user
            ) {

                name.textContent =
                    user.name;


                email.textContent =
                    user.email;


                initial.textContent =
                    user.name
                        .charAt(0)
                        .toUpperCase();

            } else {

                name.textContent =
                    "Veloura Guest";


                email.textContent =
                    "Your reservation journey";


                initial.textContent =
                    "V";

            }

        }



        /* =================================================
           STORAGE
        ================================================= */

        function getReservationHistoryKey() {

            const user =
                getLoggedInUser();


            if (
                user &&
                user.email
            ) {

                return (
                    "velouraReservationHistory_" +
                    user.email
                        .trim()
                        .toLowerCase()
                );

            }


            return "velouraReservationHistory";

        }



        function loadReservations() {

            reservations =
                [];


            const saved =
                localStorage.getItem(
                    getReservationHistoryKey()
                );


            if (
                saved
            ) {

                try {

                    const parsed =
                        JSON.parse(
                            saved
                        );


                    if (
                        Array.isArray(
                            parsed
                        )
                    ) {

                        reservations =
                            parsed;

                    }

                } catch (error) {

                    reservations =
                        [];

                }

            }


            importLatestReservation();


            sortReservations();

        }



        function importLatestReservation() {

            const lastSaved =
                localStorage.getItem(
                    "velouraLastReservation"
                );


            if (
                !lastSaved
            ) {

                return;

            }


            try {

                const reservation =
                    JSON.parse(
                        lastSaved
                    );


                if (
                    !reservation ||
                    !reservation.reservationNumber
                ) {

                    return;

                }


                const exists =
                    reservations.some(
                        function (item) {

                            return (
                                item.reservationNumber ===
                                reservation.reservationNumber
                            );

                        }
                    );


                if (
                    !exists
                ) {

                    reservations.push(
                        reservation
                    );


                    saveReservations();

                }

            } catch (error) {

                return;

            }

        }



        function saveReservations() {

            localStorage.setItem(
                getReservationHistoryKey(),
                JSON.stringify(
                    reservations
                )
            );

        }



        function sortReservations() {

            reservations.sort(
                function (
                    first,
                    second
                ) {

                    return (
                        new Date(
                            second.createdAt ||
                            second.date ||
                            0
                        ) -
                        new Date(
                            first.createdAt ||
                            first.date ||
                            0
                        )
                    );

                }
            );

        }



        /* =================================================
           FORMAT
        ================================================= */

        function escapeHTML(
            value
        ) {

            const element =
                document.createElement(
                    "div"
                );


            element.textContent =
                String(
                    value || ""
                );


            return element.innerHTML;

        }



        function formatDate(
            value
        ) {

            if (
                !value
            ) {

                return "—";

            }


            const date =
                new Date(
                    value
                );


            if (
                Number.isNaN(
                    date.getTime()
                )
            ) {

                return value;

            }


            return date.toLocaleDateString(
                "en-AE",
                {
                    day:
                        "2-digit",

                    month:
                        "short",

                    year:
                        "numeric"
                }
            );

        }



        function formatCreatedDate(
            value
        ) {

            if (
                !value
            ) {

                return "Booking date unavailable";

            }


            const date =
                new Date(
                    value
                );


            if (
                Number.isNaN(
                    date.getTime()
                )
            ) {

                return "Booking date unavailable";

            }


            return date.toLocaleString(
                "en-AE",
                {
                    day:
                        "2-digit",

                    month:
                        "short",

                    year:
                        "numeric",

                    hour:
                        "2-digit",

                    minute:
                        "2-digit"
                }
            );

        }



        function getReservationStatus(
            reservation
        ) {

            if (
                reservation.status
            ) {

                return reservation.status;

            }


            if (
                !reservation.date
            ) {

                return "Confirmed";

            }


            const reservationDate =
                new Date(
                    reservation.date
                );


            const today =
                new Date();


            today.setHours(
                0,
                0,
                0,
                0
            );


            if (
                reservationDate < today
            ) {

                return "Completed";

            }


            return "Confirmed";

        }



        function getFilterStatus(
            reservation
        ) {

            const status =
                getReservationStatus(
                    reservation
                )
                    .toLowerCase();


            if (
                status.includes(
                    "cancel"
                )
            ) {

                return "cancelled";

            }


            if (
                status.includes(
                    "complete"
                )
            ) {

                return "completed";

            }


            return "upcoming";

        }



        /* =================================================
           SUMMARY
        ================================================= */

        function updateSummary() {

            document
                .getElementById(
                    "totalReservations"
                )
                .textContent =
                reservations.length;


            const upcoming =
                reservations.filter(
                    function (reservation) {

                        return (
                            getFilterStatus(
                                reservation
                            ) === "upcoming"
                        );

                    }
                )
                .length;


            document
                .getElementById(
                    "upcomingReservations"
                )
                .textContent =
                upcoming;


            document
                .getElementById(
                    "lastReservationDate"
                )
                .textContent =
                reservations.length > 0
                    ? formatDate(
                        reservations[0].createdAt ||
                        reservations[0].date
                    )
                    : "—";

        }



        /* =================================================
           FILTER
        ================================================= */

        function getFilteredReservations() {

            const search =
                reservationSearch.value
                    .trim()
                    .toLowerCase();


            const filter =
                reservationFilter.value;


            return reservations.filter(
                function (reservation) {

                    const status =
                        getFilterStatus(
                            reservation
                        );


                    const filterMatch =
                        filter === "all" ||
                        status === filter;


                    const text =
                        [
                            reservation.reservationNumber,
                            reservation.name,
                            reservation.email,
                            reservation.phone,
                            reservation.date,
                            reservation.time,
                            reservation.occasion,
                            getReservationStatus(
                                reservation
                            )
                        ]
                            .join(
                                " "
                            )
                            .toLowerCase();


                    const searchMatch =
                        search === "" ||
                        text.includes(
                            search
                        );


                    return (
                        filterMatch &&
                        searchMatch
                    );

                }
            );

        }



        /* =================================================
           RENDER
        ================================================= */

        function renderReservations() {

            reservationList.innerHTML =
                "";


            if (
                reservations.length === 0
            ) {

                emptyHistory.classList.add(
                    "active"
                );


                noResults.classList.remove(
                    "active"
                );


                return;

            }


            emptyHistory.classList.remove(
                "active"
            );


            const filtered =
                getFilteredReservations();


            if (
                filtered.length === 0
            ) {

                noResults.classList.add(
                    "active"
                );


                return;

            }


            noResults.classList.remove(
                "active"
            );


            filtered.forEach(
                function (reservation) {

                    reservationList.appendChild(
                        createReservationCard(
                            reservation
                        )
                    );

                }
            );

        }



        function createReservationCard(
            reservation
        ) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "reservation-card";


            const status =
                getReservationStatus(
                    reservation
                );


            const statusClass =
                getFilterStatus(
                    reservation
                );


            const guests =
                Number(
                    reservation.guests || 1
                );


            card.innerHTML =
                `
                <div class="reservation-card-top">


                    <div class="reservation-number">

                        <p>
                            RESERVATION NUMBER
                        </p>

                        <h3>
                            ${escapeHTML(
                                reservation.reservationNumber ||
                                "VR-2026-0000"
                            )}
                        </h3>

                        <span class="reservation-created">

                            Booked
                            ${escapeHTML(
                                formatCreatedDate(
                                    reservation.createdAt ||
                                    reservation.bookingDate
                                )
                            )}

                        </span>

                    </div>


                    <div class="reservation-info-small">

                        <span>
                            DATE
                        </span>

                        <strong>
                            ${escapeHTML(
                                formatDate(
                                    reservation.date
                                )
                            )}
                        </strong>

                    </div>


                    <div class="reservation-info-small">

                        <span>
                            TIME
                        </span>

                        <strong>
                            ${escapeHTML(
                                reservation.time ||
                                "—"
                            )}
                        </strong>

                    </div>


                    <div class="reservation-info-small">

                        <span>
                            GUESTS
                        </span>

                        <strong>

                            ${guests}

                            ${
                                guests === 1
                                    ? "Guest"
                                    : "Guests"
                            }

                        </strong>

                    </div>


                    <div class="reservation-status-area">

                        <span class="reservation-status ${statusClass}">

                            ${escapeHTML(
                                status
                            )}

                        </span>

                    </div>


                </div>


                <div class="reservation-card-bottom">


                    <div class="guest-preview">

                        <div class="guest-icon">
                            V
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(
                                    reservation.name ||
                                    "Veloura Guest"
                                )}
                            </strong>

                            <span>

                                ${
                                    reservation.occasion
                                        ? escapeHTML(
                                            reservation.occasion
                                        )
                                        : "Veloura Café · Al Ain"
                                }

                            </span>

                        </div>

                    </div>


                    <div class="reservation-actions">

                        <button
                            type="button"
                            class="view-button"
                            data-reservation="${escapeHTML(
                                reservation.reservationNumber
                            )}"
                        >
                            VIEW DETAILS
                        </button>


                        <button
                            type="button"
                            class="book-again-button-small"
                            data-book-again="${escapeHTML(
                                reservation.reservationNumber
                            )}"
                        >
                            BOOK AGAIN
                        </button>

                    </div>


                </div>
                `;


            return card;

        }



        /* =================================================
           DETAILS
        ================================================= */

        function openReservation(
            reservationNumber
        ) {

            const reservation =
                reservations.find(
                    function (item) {

                        return (
                            item.reservationNumber ===
                            reservationNumber
                        );

                    }
                );


            if (
                !reservation
            ) {

                return;

            }


            selectedReservation =
                reservation;


            document
                .getElementById(
                    "detailReservationNumber"
                )
                .textContent =
                reservation.reservationNumber;


            document
                .getElementById(
                    "detailStatus"
                )
                .textContent =
                getReservationStatus(
                    reservation
                );


            document
                .getElementById(
                    "detailDate"
                )
                .textContent =
                formatDate(
                    reservation.date
                );


            document
                .getElementById(
                    "detailTime"
                )
                .textContent =
                reservation.time ||
                "—";


            const guests =
                Number(
                    reservation.guests || 1
                );


            document
                .getElementById(
                    "detailGuests"
                )
                .textContent =
                guests +
                (
                    guests === 1
                        ? " Guest"
                        : " Guests"
                );


            document
                .getElementById(
                    "detailOccasion"
                )
                .textContent =
                reservation.occasion ||
                "Not specified";


            document
                .getElementById(
                    "detailName"
                )
                .textContent =
                reservation.name ||
                "—";


            document
                .getElementById(
                    "detailPhone"
                )
                .textContent =
                reservation.phone ||
                "—";


            document
                .getElementById(
                    "detailEmail"
                )
                .textContent =
                reservation.email ||
                "—";


            document
                .getElementById(
                    "detailRequest"
                )
                .textContent =
                reservation.message ||
                reservation.request ||
                reservation.specialRequest ||
                "No special request added.";


            reservationModal.classList.add(
                "active"
            );


            document.body.classList.add(
                "modal-open"
            );

        }



        function closeReservation() {

            reservationModal.classList.remove(
                "active"
            );


            selectedReservation =
                null;


            if (
                !bookAgainModal.classList.contains(
                    "active"
                )
            ) {

                document.body.classList.remove(
                    "modal-open"
                );

            }

        }



        document
            .getElementById(
                "reservationClose"
            )
            .addEventListener(
                "click",
                closeReservation
            );


        document
            .getElementById(
                "reservationBackdrop"
            )
            .addEventListener(
                "click",
                closeReservation
            );


        document
            .getElementById(
                "detailCloseButton"
            )
            .addEventListener(
                "click",
                closeReservation
            );



        /* =================================================
           BOOK AGAIN
        ================================================= */

        function openBookAgain(
            reservationNumber
        ) {

            const reservation =
                reservations.find(
                    function (item) {

                        return (
                            item.reservationNumber ===
                            reservationNumber
                        );

                    }
                );


            if (
                !reservation
            ) {

                return;

            }


            bookAgainReservation =
                reservation;


            document
                .getElementById(
                    "bookAgainNumber"
                )
                .textContent =
                reservation.reservationNumber;


            bookAgainModal.classList.add(
                "active"
            );


            document.body.classList.add(
                "modal-open"
            );

        }



        function closeBookAgain() {

            bookAgainModal.classList.remove(
                "active"
            );


            bookAgainReservation =
                null;


            if (
                !reservationModal.classList.contains(
                    "active"
                )
            ) {

                document.body.classList.remove(
                    "modal-open"
                );

            }

        }



        document
            .getElementById(
                "cancelBookAgain"
            )
            .addEventListener(
                "click",
                closeBookAgain
            );


        document
            .getElementById(
                "bookAgainBackdrop"
            )
            .addEventListener(
                "click",
                closeBookAgain
            );


        document
            .getElementById(
                "detailBookAgain"
            )
            .addEventListener(
                "click",
                function () {

                    if (
                        selectedReservation
                    ) {

                        openBookAgain(
                            selectedReservation.reservationNumber
                        );

                    }

                }
            );



        document
            .getElementById(
                "confirmBookAgain"
            )
            .addEventListener(
                "click",
                function () {

                    if (
                        !bookAgainReservation
                    ) {

                        return;

                    }


                    const repeatData =
                        {
                            name:
                                bookAgainReservation.name ||
                                "",

                            email:
                                bookAgainReservation.email ||
                                "",

                            phone:
                                bookAgainReservation.phone ||
                                "",

                            guests:
                                bookAgainReservation.guests ||
                                2,

                            occasion:
                                bookAgainReservation.occasion ||
                                "",

                            message:
                                bookAgainReservation.message ||
                                bookAgainReservation.request ||
                                bookAgainReservation.specialRequest ||
                                ""
                        };


                    localStorage.setItem(
                        "velouraRepeatReservation",
                        JSON.stringify(
                            repeatData
                        )
                    );


                    showToast(
                        "Reservation details ready",
                        "Your previous guest details have been saved."
                    );


                    setTimeout(
                        function () {

                            window.location.href =
                                "reservation.html";

                        },
                        700
                    );

                }
            );



        /* =================================================
           CARD ACTIONS
        ================================================= */

        reservationList.addEventListener(
            "click",
            function (event) {

                const viewButton =
                    event.target.closest(
                        ".view-button"
                    );


                const bookAgainButton =
                    event.target.closest(
                        ".book-again-button-small"
                    );


                if (
                    viewButton
                ) {

                    openReservation(
                        viewButton.dataset.reservation
                    );


                    return;

                }


                if (
                    bookAgainButton
                ) {

                    openBookAgain(
                        bookAgainButton.dataset.bookAgain
                    );

                }

            }
        );



        /* =================================================
           SEARCH
        ================================================= */

        reservationSearch.addEventListener(
            "input",
            renderReservations
        );


        reservationFilter.addEventListener(
            "change",
            renderReservations
        );



        /* =================================================
           TOAST
        ================================================= */

        function showToast(
            title,
            text
        ) {

            const toast =
                document.getElementById(
                    "historyToast"
                );


            document
                .getElementById(
                    "toastTitle"
                )
                .textContent =
                title;


            document
                .getElementById(
                    "toastText"
                )
                .textContent =
                text;


            toast.classList.add(
                "active"
            );


            setTimeout(
                function () {

                    toast.classList.remove(
                        "active"
                    );

                },
                2300
            );

        }



        /* =================================================
           ESCAPE KEY
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key !== "Escape"
                ) {

                    return;

                }


                if (
                    bookAgainModal.classList.contains(
                        "active"
                    )
                ) {

                    closeBookAgain();

                    return;

                }


                if (
                    reservationModal.classList.contains(
                        "active"
                    )
                ) {

                    closeReservation();

                }

            }
        );



        /* =================================================
           INITIAL LOAD
        ================================================= */

        updateCustomer();

        loadReservations();

        updateSummary();

        renderReservations();


    }
);