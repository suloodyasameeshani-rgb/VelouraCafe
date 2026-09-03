/* =========================================================
   VELOURA CAFE
   MENU PAGE
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           NAVBAR
        ================================================= */

        const header =
            document.getElementById(
                "menuHeader"
            );


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
           MENU VIEW + FILTER
        ================================================= */

        const menuItems =
            document.getElementById(
                "menuItems"
            );


        const menuCards =
            document.querySelectorAll(
                ".menu-card"
            );


        const gridButton =
            document.getElementById(
                "gridViewButton"
            );


        const listButton =
            document.getElementById(
                "listViewButton"
            );


        const categoryButtons =
            document.querySelectorAll(
                ".category-button"
            );


        const searchInput =
            document.getElementById(
                "menuSearch"
            );


        const noResults =
            document.getElementById(
                "noResults"
            );


        let activeCategory =
            "all";


        gridButton.addEventListener(
            "click",
            function () {

                menuItems.classList.remove(
                    "list-view"
                );

                menuItems.classList.add(
                    "grid-view"
                );

                gridButton.classList.add(
                    "active"
                );

                listButton.classList.remove(
                    "active"
                );

            }
        );


        listButton.addEventListener(
            "click",
            function () {

                menuItems.classList.remove(
                    "grid-view"
                );

                menuItems.classList.add(
                    "list-view"
                );

                listButton.classList.add(
                    "active"
                );

                gridButton.classList.remove(
                    "active"
                );

            }
        );


        function filterMenu() {

            const search =
                searchInput.value
                    .trim()
                    .toLowerCase();


            let visible =
                0;


            menuCards.forEach(
                function (card) {

                    const categoryMatch =
                        activeCategory === "all" ||
                        card.dataset.category ===
                        activeCategory;


                    const searchMatch =
                        (
                            card.dataset.name +
                            " " +
                            card.textContent
                        )
                            .toLowerCase()
                            .includes(
                                search
                            );


                    card.classList.toggle(
                        "hidden",
                        !(
                            categoryMatch &&
                            searchMatch
                        )
                    );


                    if (
                        categoryMatch &&
                        searchMatch
                    ) {

                        visible++;

                    }

                }
            );


            noResults.classList.toggle(
                "active",
                visible === 0
            );

        }


        categoryButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        categoryButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        activeCategory =
                            button.dataset.category;


                        filterMenu();

                    }
                );

            }
        );


        searchInput.addEventListener(
            "input",
            filterMenu
        );



        /* =================================================
           PRODUCT POPUP
        ================================================= */

        const productModal =
            document.getElementById(
                "productModal"
            );


        const popupImage =
            document.getElementById(
                "popupImage"
            );


        const popupName =
            document.getElementById(
                "popupName"
            );


        const popupPrice =
            document.getElementById(
                "popupPrice"
            );


        const popupCategory =
            document.getElementById(
                "popupCategory"
            );


        const popupDescription =
            document.getElementById(
                "popupDescription"
            );


        const popupTags =
            document.getElementById(
                "popupTags"
            );


        const popupTotal =
            document.getElementById(
                "popupTotal"
            );


        const quantityValue =
            document.getElementById(
                "quantityValue"
            );


        let selectedProduct =
            "";


        let selectedPrice =
            0;


        let selectedImage =
            "";


        let quantity =
            1;


        function updatePopupTotal() {

            quantityValue.textContent =
                quantity;


            popupTotal.textContent =
                selectedPrice *
                quantity +
                " AED";

        }


        document
            .querySelectorAll(
                ".add-button"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const card =
                                button.closest(
                                    ".menu-card"
                                );


                            selectedProduct =
                                card.dataset.name;


                            selectedPrice =
                                Number(
                                    card.dataset.price
                                );


                            selectedImage =
                                card.dataset.image;


                            quantity =
                                1;


                            popupImage.src =
                                selectedImage;


                            popupName.textContent =
                                selectedProduct;


                            popupPrice.textContent =
                                selectedPrice;


                            popupCategory.textContent =
                                card
                                    .querySelector(
                                        ".item-category"
                                    )
                                    .textContent
                                    .trim();


                            popupDescription.textContent =
                                card.dataset.description;


                            popupTags.innerHTML =
                                "";


                            card.dataset.tags
                                .split(",")
                                .forEach(
                                    function (tag) {

                                        const element =
                                            document.createElement(
                                                "span"
                                            );


                                        element.className =
                                            "popup-tag";


                                        element.textContent =
                                            tag.trim();


                                        popupTags.appendChild(
                                            element
                                        );

                                    }
                                );


                            updatePopupTotal();


                            productModal.classList.add(
                                "active"
                            );


                            document.body.classList.add(
                                "modal-open"
                            );

                        }
                    );

                }
            );


        function closeProduct() {

            productModal.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "modal-open"
            );

        }


        document
            .getElementById(
                "popupClose"
            )
            .addEventListener(
                "click",
                closeProduct
            );


        document
            .getElementById(
                "productBackdrop"
            )
            .addEventListener(
                "click",
                closeProduct
            );


        document
            .getElementById(
                "quantityMinus"
            )
            .addEventListener(
                "click",
                function () {

                    if (
                        quantity > 1
                    ) {

                        quantity--;

                        updatePopupTotal();

                    }

                }
            );


        document
            .getElementById(
                "quantityPlus"
            )
            .addEventListener(
                "click",
                function () {

                    if (
                        quantity < 20
                    ) {

                        quantity++;

                        updatePopupTotal();

                    }

                }
            );



        /* =================================================
           CART
        ================================================= */

        const cart =
            [];


        const bagCount =
            document.getElementById(
                "bagCount"
            );


        const cartPanel =
            document.getElementById(
                "cartPanel"
            );


        const cartItems =
            document.getElementById(
                "cartItems"
            );


        const emptyCart =
            document.getElementById(
                "emptyCart"
            );


        const cartFooter =
            document.getElementById(
                "cartFooter"
            );


        const cartSubtotal =
            document.getElementById(
                "cartSubtotal"
            );


        const cartItemCount =
            document.getElementById(
                "cartItemCount"
            );


        function loadCart() {

            const saved =
                localStorage.getItem(
                    "velouraCart"
                );


            if (
                !saved
            ) {

                return;

            }


            try {

                const savedCart =
                    JSON.parse(
                        saved
                    );


                savedCart.forEach(
                    function (item) {

                        cart.push(
                            item
                        );

                    }
                );

            } catch (error) {

                localStorage.removeItem(
                    "velouraCart"
                );

            }

        }


        function saveCart() {

            localStorage.setItem(
                "velouraCart",
                JSON.stringify(
                    cart
                )
            );

        }


        function getCartCount() {

            return cart.reduce(
                function (
                    total,
                    item
                ) {

                    return total +
                        item.quantity;

                },
                0
            );

        }


        function getCartTotal() {

            return cart.reduce(
                function (
                    total,
                    item
                ) {

                    return total +
                        (
                            item.price *
                            item.quantity
                        );

                },
                0
            );

        }


        function renderCart() {

            cartItems.innerHTML =
                "";


            bagCount.textContent =
                getCartCount();


            cartItemCount.textContent =
                getCartCount();


            cartSubtotal.textContent =
                getCartTotal();


            emptyCart.classList.toggle(
                "active",
                cart.length === 0
            );


            cartFooter.classList.toggle(
                "hidden",
                cart.length === 0
            );


            cart.forEach(
                function (
                    item,
                    index
                ) {

                    const element =
                        document.createElement(
                            "div"
                        );


                    element.className =
                        "cart-item";


                    element.innerHTML =
                        `
                        <div class="cart-item-image">

                            <img
                                src="${item.image}"
                                alt="${item.name}"
                            >

                        </div>


                        <div>

                            <h3 class="cart-item-name">
                                ${item.name}
                            </h3>


                            <div class="cart-item-price">
                                ${item.price * item.quantity} AED
                            </div>


                            <div class="cart-item-controls">

                                <button
                                    type="button"
                                    class="cart-minus"
                                    data-index="${index}"
                                >
                                    −
                                </button>

                                <span>
                                    ${item.quantity}
                                </span>

                                <button
                                    type="button"
                                    class="cart-plus"
                                    data-index="${index}"
                                >
                                    +
                                </button>

                            </div>


                            <button
                                type="button"
                                class="cart-remove"
                                data-index="${index}"
                            >
                                ×
                            </button>

                        </div>
                        `;


                    cartItems.appendChild(
                        element
                    );

                }
            );


            saveCart();

        }



        document
            .getElementById(
                "popupAddButton"
            )
            .addEventListener(
                "click",
                function () {

                    const existing =
                        cart.find(
                            function (item) {

                                return item.name ===
                                    selectedProduct;

                            }
                        );


                    if (
                        existing
                    ) {

                        existing.quantity +=
                            quantity;

                    } else {

                        cart.push(
                            {
                                name:
                                    selectedProduct,

                                price:
                                    selectedPrice,

                                quantity:
                                    quantity,

                                image:
                                    selectedImage
                            }
                        );

                    }


                    renderCart();


                    showToast(
                        "Added to your order",
                        quantity +
                        " × " +
                        selectedProduct
                    );


                    closeProduct();

                }
            );


        function openCart() {

            renderCart();

            cartPanel.classList.add(
                "active"
            );

            document.body.classList.add(
                "modal-open"
            );

        }


        function closeCart() {

            cartPanel.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "modal-open"
            );

        }


        document
            .getElementById(
                "bagButton"
            )
            .addEventListener(
                "click",
                openCart
            );


        document
            .getElementById(
                "cartClose"
            )
            .addEventListener(
                "click",
                closeCart
            );


        document
            .getElementById(
                "cartBackdrop"
            )
            .addEventListener(
                "click",
                closeCart
            );


        document
            .getElementById(
                "continueShopping"
            )
            .addEventListener(
                "click",
                closeCart
            );


        cartItems.addEventListener(
            "click",
            function (event) {

                const index =
                    Number(
                        event.target.dataset.index
                    );


                if (
                    Number.isNaN(
                        index
                    )
                ) {

                    return;

                }


                if (
                    event.target.classList.contains(
                        "cart-plus"
                    )
                ) {

                    cart[index].quantity++;

                }


                if (
                    event.target.classList.contains(
                        "cart-minus"
                    )
                ) {

                    cart[index].quantity--;


                    if (
                        cart[index].quantity <= 0
                    ) {

                        cart.splice(
                            index,
                            1
                        );

                    }

                }


                if (
                    event.target.classList.contains(
                        "cart-remove"
                    )
                ) {

                    cart.splice(
                        index,
                        1
                    );

                }


                renderCart();

            }
        );


        document
            .getElementById(
                "clearCartButton"
            )
            .addEventListener(
                "click",
                function () {

                    cart.length =
                        0;

                    renderCart();

                }
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
                    "cartToast"
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
                2200
            );

        }



        /* =================================================
           ACCOUNT
        ================================================= */

        const signButton =
            document.getElementById(
                "signButton"
            );


        const authModal =
            document.getElementById(
                "authModal"
            );


        let checkoutWaiting =
            false;


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


        function updateAccountButton() {

            const user =
                getLoggedInUser();


            if (
                user
            ) {

                signButton.textContent =
                    user.name
                        .split(" ")[0]
                        .toUpperCase();


                signButton.classList.add(
                    "logged-in"
                );

            } else {

                signButton.textContent =
                    "SIGN IN";


                signButton.classList.remove(
                    "logged-in"
                );

            }

        }


        function showSignup() {

            document
                .getElementById(
                    "signupTab"
                )
                .classList.add(
                    "active"
                );


            document
                .getElementById(
                    "signinTab"
                )
                .classList.remove(
                    "active"
                );


            document
                .getElementById(
                    "signupForm"
                )
                .classList.remove(
                    "hidden"
                );


            document
                .getElementById(
                    "signinForm"
                )
                .classList.add(
                    "hidden"
                );

        }


        function showSignin() {

            document
                .getElementById(
                    "signinTab"
                )
                .classList.add(
                    "active"
                );


            document
                .getElementById(
                    "signupTab"
                )
                .classList.remove(
                    "active"
                );


            document
                .getElementById(
                    "signinForm"
                )
                .classList.remove(
                    "hidden"
                );


            document
                .getElementById(
                    "signupForm"
                )
                .classList.add(
                    "hidden"
                );

        }


        function openAuth() {

            if (
                getSavedUser()
            ) {

                showSignin();

            } else {

                showSignup();

            }


            authModal.classList.add(
                "active"
            );


            document.body.classList.add(
                "modal-open"
            );

        }


        function closeAuth() {

            authModal.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "modal-open"
            );

        }


        document
            .getElementById(
                "signupTab"
            )
            .addEventListener(
                "click",
                showSignup
            );


        document
            .getElementById(
                "signinTab"
            )
            .addEventListener(
                "click",
                showSignin
            );


        document
            .getElementById(
                "authClose"
            )
            .addEventListener(
                "click",
                closeAuth
            );


        document
            .getElementById(
                "authBackdrop"
            )
            .addEventListener(
                "click",
                closeAuth
            );


        signButton.addEventListener(
            "click",
            function () {

                if (
                    getLoggedInUser()
                ) {

                    localStorage.setItem(
                        "velouraLoggedIn",
                        "false"
                    );


                    updateAccountButton();

                } else {

                    openAuth();

                }

            }
        );


        document
            .getElementById(
                "signupForm"
            )
            .addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const name =
                        document
                            .getElementById(
                                "signupName"
                            )
                            .value
                            .trim();


                    const email =
                        document
                            .getElementById(
                                "signupEmail"
                            )
                            .value
                            .trim();


                    const phone =
                        document
                            .getElementById(
                                "signupPhone"
                            )
                            .value
                            .trim();


                    const password =
                        document
                            .getElementById(
                                "signupPassword"
                            )
                            .value;


                    if (
                        name.length < 2 ||
                        !email.includes("@") ||
                        phone.length < 7 ||
                        password.length < 6
                    ) {

                        document
                            .getElementById(
                                "signupError"
                            )
                            .textContent =
                            "Please complete all fields correctly.";


                        return;

                    }


                    localStorage.setItem(
                        "velouraUser",
                        JSON.stringify(
                            {
                                name:
                                    name,

                                email:
                                    email,

                                phone:
                                    phone,

                                password:
                                    password
                            }
                        )
                    );


                    localStorage.setItem(
                        "velouraLoggedIn",
                        "true"
                    );


                    closeAuth();

                    updateAccountButton();


                    if (
                        checkoutWaiting
                    ) {

                        checkoutWaiting =
                            false;

                        openCheckout();

                    }

                }
            );


        document
            .getElementById(
                "signinForm"
            )
            .addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const savedUser =
                        getSavedUser();


                    const email =
                        document
                            .getElementById(
                                "signinEmail"
                            )
                            .value
                            .trim();


                    const password =
                        document
                            .getElementById(
                                "signinPassword"
                            )
                            .value;


                    if (
                        !savedUser ||
                        email !== savedUser.email ||
                        password !== savedUser.password
                    ) {

                        document
                            .getElementById(
                                "signinError"
                            )
                            .textContent =
                            "Email or password is incorrect.";


                        return;

                    }


                    localStorage.setItem(
                        "velouraLoggedIn",
                        "true"
                    );


                    closeAuth();

                    updateAccountButton();


                    if (
                        checkoutWaiting
                    ) {

                        checkoutWaiting =
                            false;

                        openCheckout();

                    }

                }
            );



        /* =================================================
           SAVED LOCATIONS
        ================================================= */

        let savedLocations =
            [];


        let selectedLocationId =
            null;


        let editingLocationId =
            null;


        let pendingDeleteLocationId =
            null;


        let capturedLatitude =
            null;


        let capturedLongitude =
            null;


        function getLocationStorageKey() {

            const user =
                getLoggedInUser();


            if (
                !user
            ) {

                return "velouraSavedLocations";

            }


            return "velouraSavedLocations_" +
                user.email
                    .toLowerCase();

        }


        function loadSavedLocations() {

            savedLocations =
                [];


            const saved =
                localStorage.getItem(
                    getLocationStorageKey()
                );


            if (
                saved
            ) {

                try {

                    savedLocations =
                        JSON.parse(
                            saved
                        );

                } catch (error) {

                    savedLocations =
                        [];

                }

            }


            const lastSelected =
                localStorage.getItem(
                    getLocationStorageKey() +
                    "_selected"
                );


            if (
                savedLocations.some(
                    function (location) {

                        return location.id ===
                            lastSelected;

                    }
                )
            ) {

                selectedLocationId =
                    lastSelected;

            } else if (
                savedLocations.length > 0
            ) {

                selectedLocationId =
                    savedLocations[0].id;

            } else {

                selectedLocationId =
                    null;

            }


            renderSavedLocations();

        }


        function saveSavedLocations() {

            localStorage.setItem(
                getLocationStorageKey(),
                JSON.stringify(
                    savedLocations
                )
            );


            if (
                selectedLocationId
            ) {

                localStorage.setItem(
                    getLocationStorageKey() +
                    "_selected",
                    selectedLocationId
                );

            } else {

                localStorage.removeItem(
                    getLocationStorageKey() +
                    "_selected"
                );

            }

        }


        function renderSavedLocations() {

            const list =
                document.getElementById(
                    "savedLocationsList"
                );


            const empty =
                document.getElementById(
                    "noSavedLocation"
                );


            list.innerHTML =
                "";


            empty.classList.toggle(
                "active",
                savedLocations.length === 0
            );


            savedLocations.forEach(
                function (location) {

                    const card =
                        document.createElement(
                            "div"
                        );


                    card.className =
                        "saved-location-card";


                    if (
                        location.id ===
                        selectedLocationId
                    ) {

                        card.classList.add(
                            "active"
                        );

                    }


                    const gpsText =
                        location.latitude &&
                        location.longitude
                            ? `
                                <span class="saved-location-gps">
                                    ◎ LIVE LOCATION SAVED
                                </span>
                              `
                            : "";


                    card.innerHTML =
                        `
                        <span class="saved-location-radio"></span>


                        <div class="saved-location-content">

                            <h4>
                                ${escapeHTML(location.label)}
                            </h4>

                            <p>
                                ${escapeHTML(location.area)}
                                ·
                                ${escapeHTML(location.street)}
                            </p>

                            <p>
                                ${escapeHTML(location.unit || "No unit added")}
                            </p>

                            <p class="saved-location-phone">
                                ${escapeHTML(location.phone)}
                            </p>

                            ${gpsText}

                        </div>


                        <div class="saved-location-actions">

                            <button
                                type="button"
                                class="edit-location"
                                data-location-id="${location.id}"
                            >
                                EDIT
                            </button>

                            <button
                                type="button"
                                class="delete-location"
                                data-location-id="${location.id}"
                            >
                                DELETE
                            </button>

                        </div>
                        `;


                    card.addEventListener(
                        "click",
                        function (event) {

                            if (
                                event.target.closest(
                                    ".saved-location-actions"
                                )
                            ) {

                                return;

                            }


                            selectedLocationId =
                                location.id;


                            saveSavedLocations();

                            renderSavedLocations();


                            showToast(
                                "Delivery location selected",
                                location.label +
                                " will be used for this order."
                            );

                        }
                    );


                    list.appendChild(
                        card
                    );

                }
            );

        }


        function escapeHTML(
            value
        ) {

            const div =
                document.createElement(
                    "div"
                );


            div.textContent =
                value || "";


            return div.innerHTML;

        }



        /* =================================================
           LOCATION EDITOR
        ================================================= */

        const locationEditor =
            document.getElementById(
                "locationEditor"
            );


        const locationLabel =
            document.getElementById(
                "locationLabel"
            );


        const deliveryArea =
            document.getElementById(
                "deliveryArea"
            );


        const deliveryStreet =
            document.getElementById(
                "deliveryStreet"
            );


        const deliveryUnit =
            document.getElementById(
                "deliveryUnit"
            );


        const deliveryPhone =
            document.getElementById(
                "deliveryPhone"
            );


        const deliveryNotes =
            document.getElementById(
                "deliveryNotes"
            );


        const locationResult =
            document.getElementById(
                "locationResult"
            );


        const locationFormError =
            document.getElementById(
                "locationFormError"
            );


        function clearLocationForm() {

            locationLabel.value =
                "";


            deliveryArea.value =
                "";


            deliveryStreet.value =
                "";


            deliveryUnit.value =
                "";


            deliveryNotes.value =
                "";


            const user =
                getLoggedInUser();


            deliveryPhone.value =
                user
                    ? user.phone || ""
                    : "";


            capturedLatitude =
                null;


            capturedLongitude =
                null;


            locationResult.textContent =
                "";


            locationFormError.textContent =
                "";

        }


        function openNewLocationEditor() {

            editingLocationId =
                null;


            clearLocationForm();


            document
                .getElementById(
                    "locationEditorKicker"
                )
                .textContent =
                "NEW LOCATION";


            document
                .getElementById(
                    "locationEditorTitle"
                )
                .textContent =
                "Add delivery address";


            document
                .getElementById(
                    "saveLocationText"
                )
                .textContent =
                "SAVE LOCATION";


            locationEditor.classList.add(
                "active"
            );


            setTimeout(
                function () {

                    locationEditor.scrollIntoView(
                        {
                            behavior:
                                "smooth",

                            block:
                                "nearest"
                        }
                    );

                },
                100
            );

        }


        function openEditLocation(
            id
        ) {

            const location =
                savedLocations.find(
                    function (item) {

                        return item.id ===
                            id;

                    }
                );


            if (
                !location
            ) {

                return;

            }


            editingLocationId =
                id;


            locationLabel.value =
                location.label;


            deliveryArea.value =
                location.area;


            deliveryStreet.value =
                location.street;


            deliveryUnit.value =
                location.unit || "";


            deliveryPhone.value =
                location.phone;


            deliveryNotes.value =
                location.notes || "";


            capturedLatitude =
                location.latitude || null;


            capturedLongitude =
                location.longitude || null;


            if (
                capturedLatitude &&
                capturedLongitude
            ) {

                locationResult.textContent =
                    "Saved GPS: " +
                    capturedLatitude +
                    ", " +
                    capturedLongitude;

            } else {

                locationResult.textContent =
                    "";

            }


            document
                .getElementById(
                    "locationEditorKicker"
                )
                .textContent =
                "EDIT LOCATION";


            document
                .getElementById(
                    "locationEditorTitle"
                )
                .textContent =
                "Update " +
                location.label;


            document
                .getElementById(
                    "saveLocationText"
                )
                .textContent =
                "SAVE CHANGES";


            locationFormError.textContent =
                "";


            locationEditor.classList.add(
                "active"
            );


            setTimeout(
                function () {

                    locationEditor.scrollIntoView(
                        {
                            behavior:
                                "smooth",

                            block:
                                "nearest"
                        }
                    );

                },
                100
            );

        }


        function closeLocationEditor() {

            locationEditor.classList.remove(
                "active"
            );


            editingLocationId =
                null;


            clearLocationForm();

        }


        document
            .getElementById(
                "addNewLocationButton"
            )
            .addEventListener(
                "click",
                openNewLocationEditor
            );


        document
            .getElementById(
                "cancelLocationButton"
            )
            .addEventListener(
                "click",
                closeLocationEditor
            );



        /* =================================================
           LIVE LOCATION
        ================================================= */

        document
            .getElementById(
                "useLocationButton"
            )
            .addEventListener(
                "click",
                function () {

                    if (
                        !navigator.geolocation
                    ) {

                        locationResult.textContent =
                            "Live location is not supported by this browser.";


                        return;

                    }


                    locationResult.textContent =
                        "Finding your current location...";


                    navigator.geolocation.getCurrentPosition(
                        function (position) {

                            capturedLatitude =
                                position.coords.latitude
                                    .toFixed(
                                        6
                                    );


                            capturedLongitude =
                                position.coords.longitude
                                    .toFixed(
                                        6
                                    );


                            locationResult.textContent =
                                "✓ Live location captured: " +
                                capturedLatitude +
                                ", " +
                                capturedLongitude;


                            showToast(
                                "Live location captured",
                                "Complete the address details and save it."
                            );

                        },
                        function () {

                            locationResult.textContent =
                                "Location permission was not available. You can enter the address manually.";

                        },
                        {
                            enableHighAccuracy:
                                true,

                            timeout:
                                10000
                        }
                    );

                }
            );



        /* =================================================
           SAVE NEW / EDIT LOCATION
        ================================================= */

        document
            .getElementById(
                "saveLocationButton"
            )
            .addEventListener(
                "click",
                function () {

                    const label =
                        locationLabel.value
                            .trim();


                    const area =
                        deliveryArea.value
                            .trim();


                    const street =
                        deliveryStreet.value
                            .trim();


                    const unit =
                        deliveryUnit.value
                            .trim();


                    const phone =
                        deliveryPhone.value
                            .trim();


                    const notes =
                        deliveryNotes.value
                            .trim();


                    locationFormError.textContent =
                        "";


                    if (
                        label.length < 2
                    ) {

                        locationFormError.textContent =
                            "Please give this location a name, for example Home or Work.";


                        return;

                    }


                    if (
                        area.length < 2
                    ) {

                        locationFormError.textContent =
                            "Please enter the delivery area.";


                        return;

                    }


                    if (
                        street.length < 3
                    ) {

                        locationFormError.textContent =
                            "Please enter the street or building.";


                        return;

                    }


                    if (
                        phone.length < 7
                    ) {

                        locationFormError.textContent =
                            "Please enter a valid phone number.";


                        return;

                    }


                    if (
                        editingLocationId
                    ) {

                        const index =
                            savedLocations.findIndex(
                                function (location) {

                                    return location.id ===
                                        editingLocationId;

                                }
                            );


                        if (
                            index !== -1
                        ) {

                            savedLocations[index] =
                                {
                                    ...savedLocations[index],

                                    label:
                                        label,

                                    area:
                                        area,

                                    street:
                                        street,

                                    unit:
                                        unit,

                                    phone:
                                        phone,

                                    notes:
                                        notes,

                                    latitude:
                                        capturedLatitude,

                                    longitude:
                                        capturedLongitude
                                };


                            selectedLocationId =
                                editingLocationId;


                            showToast(
                                "Location updated",
                                label +
                                " has been updated."
                            );

                        }

                    } else {

                        const id =
                            "LOC-" +
                            Date.now();


                        savedLocations.push(
                            {
                                id:
                                    id,

                                label:
                                    label,

                                area:
                                    area,

                                street:
                                    street,

                                unit:
                                    unit,

                                phone:
                                    phone,

                                notes:
                                    notes,

                                latitude:
                                    capturedLatitude,

                                longitude:
                                    capturedLongitude
                            }
                        );


                        selectedLocationId =
                            id;


                        showToast(
                            "Location saved",
                            label +
                            " is ready for future orders."
                        );

                    }


                    saveSavedLocations();

                    renderSavedLocations();

                    closeLocationEditor();

                }
            );



        /* =================================================
           EDIT / DELETE BUTTONS
        ================================================= */

        document
            .getElementById(
                "savedLocationsList"
            )
            .addEventListener(
                "click",
                function (event) {

                    const editButton =
                        event.target.closest(
                            ".edit-location"
                        );


                    const deleteButton =
                        event.target.closest(
                            ".delete-location"
                        );


                    if (
                        editButton
                    ) {

                        event.stopPropagation();


                        openEditLocation(
                            editButton.dataset.locationId
                        );


                        return;

                    }


                    if (
                        deleteButton
                    ) {

                        event.stopPropagation();


                        openDeleteLocationModal(
                            deleteButton.dataset.locationId
                        );

                    }

                }
            );



        /* =================================================
           DELETE LOCATION
        ================================================= */

        const deleteLocationModal =
            document.getElementById(
                "deleteLocationModal"
            );


        function openDeleteLocationModal(
            id
        ) {

            const location =
                savedLocations.find(
                    function (item) {

                        return item.id ===
                            id;

                    }
                );


            if (
                !location
            ) {

                return;

            }


            pendingDeleteLocationId =
                id;


            document
                .getElementById(
                    "deleteLocationName"
                )
                .textContent =
                location.label;


            deleteLocationModal.classList.add(
                "active"
            );

        }


        function closeDeleteLocationModal() {

            deleteLocationModal.classList.remove(
                "active"
            );


            pendingDeleteLocationId =
                null;

        }


        document
            .getElementById(
                "cancelDeleteLocation"
            )
            .addEventListener(
                "click",
                closeDeleteLocationModal
            );


        document
            .getElementById(
                "deleteLocationBackdrop"
            )
            .addEventListener(
                "click",
                closeDeleteLocationModal
            );


        document
            .getElementById(
                "confirmDeleteLocation"
            )
            .addEventListener(
                "click",
                function () {

                    if (
                        !pendingDeleteLocationId
                    ) {

                        return;

                    }


                    const location =
                        savedLocations.find(
                            function (item) {

                                return item.id ===
                                    pendingDeleteLocationId;

                            }
                        );


                    savedLocations =
                        savedLocations.filter(
                            function (item) {

                                return item.id !==
                                    pendingDeleteLocationId;

                            }
                        );


                    if (
                        selectedLocationId ===
                        pendingDeleteLocationId
                    ) {

                        selectedLocationId =
                            savedLocations.length > 0
                                ? savedLocations[0].id
                                : null;

                    }


                    saveSavedLocations();

                    renderSavedLocations();


                    showToast(
                        "Location deleted",
                        location
                            ? location.label +
                              " was removed."
                            : "Saved location removed."
                    );


                    closeDeleteLocationModal();

                }
            );



        /* =================================================
           CHECKOUT
        ================================================= */

        const checkoutModal =
            document.getElementById(
                "checkoutModal"
            );


        const pickupSection =
            document.getElementById(
                "pickupSection"
            );


        const deliverySection =
            document.getElementById(
                "deliverySection"
            );


        const pickupButton =
            document.getElementById(
                "pickupButton"
            );


        const deliveryButton =
            document.getElementById(
                "deliveryButton"
            );


        const paymentOptions =
            document.querySelectorAll(
                ".payment-option"
            );


        const cardPaymentForm =
            document.getElementById(
                "cardPaymentForm"
            );


        const checkoutSubtotal =
            document.getElementById(
                "checkoutSubtotal"
            );


        const checkoutFinalTotal =
            document.getElementById(
                "checkoutFinalTotal"
            );


        const deliveryFeeDisplay =
            document.getElementById(
                "deliveryFeeDisplay"
            );


        const checkoutError =
            document.getElementById(
                "checkoutError"
            );


        const placeOrderText =
            document.getElementById(
                "placeOrderText"
            );


        let orderType =
            "pickup";


        let paymentMethod =
            "card";


        const deliveryFee =
            8;


        function updateCheckoutTotal() {

            const subtotal =
                getCartTotal();


            const fee =
                orderType === "delivery"
                    ? deliveryFee
                    : 0;


            checkoutSubtotal.textContent =
                subtotal;


            checkoutFinalTotal.textContent =
                subtotal +
                fee;


            deliveryFeeDisplay.textContent =
                fee === 0
                    ? "FREE"
                    : fee +
                      " AED";

        }


        function updateOrderType() {

            pickupButton.classList.toggle(
                "active",
                orderType === "pickup"
            );


            deliveryButton.classList.toggle(
                "active",
                orderType === "delivery"
            );


            pickupSection.classList.toggle(
                "hidden",
                orderType !== "pickup"
            );


            deliverySection.classList.toggle(
                "hidden",
                orderType !== "delivery"
            );


            document
                .getElementById(
                    "cashPaymentTitle"
                )
                .textContent =
                orderType === "pickup"
                    ? "PAY AT CAFÉ"
                    : "CASH ON DELIVERY";


            document
                .getElementById(
                    "cashPaymentText"
                )
                .textContent =
                orderType === "pickup"
                    ? "Pay when collecting your order"
                    : "Pay when your order arrives";


            if (
                orderType === "delivery"
            ) {

                loadSavedLocations();


                if (
                    savedLocations.length === 0
                ) {

                    openNewLocationEditor();

                }

            }


            updateCheckoutTotal();

        }


        function updatePaymentMethod() {

            paymentOptions.forEach(
                function (option) {

                    option.classList.toggle(
                        "active",
                        option.dataset.payment ===
                        paymentMethod
                    );

                }
            );


            cardPaymentForm.classList.toggle(
                "hidden",
                paymentMethod !== "card"
            );


            placeOrderText.textContent =
                paymentMethod === "card"
                    ? "PAY & PLACE ORDER"
                    : "PLACE ORDER";

        }


        function openCheckout() {

            checkoutError.textContent =
                "";


            updateOrderType();

            updatePaymentMethod();

            updateCheckoutTotal();


            checkoutModal.classList.add(
                "active"
            );


            document.body.classList.add(
                "modal-open"
            );

        }


        function closeCheckout() {

            checkoutModal.classList.remove(
                "active"
            );


            locationEditor.classList.remove(
                "active"
            );


            document.body.classList.remove(
                "modal-open"
            );

        }


        pickupButton.addEventListener(
            "click",
            function () {

                orderType =
                    "pickup";

                updateOrderType();

            }
        );


        deliveryButton.addEventListener(
            "click",
            function () {

                orderType =
                    "delivery";

                updateOrderType();

            }
        );


        paymentOptions.forEach(
            function (option) {

                option.addEventListener(
                    "click",
                    function () {

                        paymentMethod =
                            option.dataset.payment;


                        updatePaymentMethod();

                    }
                );

            }
        );


        document
            .getElementById(
                "checkoutButton"
            )
            .addEventListener(
                "click",
                function () {

                    if (
                        cart.length === 0
                    ) {

                        return;

                    }


                    closeCart();


                    if (
                        !getLoggedInUser()
                    ) {

                        checkoutWaiting =
                            true;

                        openAuth();

                        return;

                    }


                    openCheckout();

                }
            );


        document
            .getElementById(
                "checkoutClose"
            )
            .addEventListener(
                "click",
                closeCheckout
            );


        document
            .getElementById(
                "checkoutBackdrop"
            )
            .addEventListener(
                "click",
                closeCheckout
            );



        /* =================================================
           CARD INPUT
        ================================================= */

        const cardNumber =
            document.getElementById(
                "cardNumber"
            );


        const cardExpiry =
            document.getElementById(
                "cardExpiry"
            );


        const cardCvv =
            document.getElementById(
                "cardCvv"
            );


        cardNumber.addEventListener(
            "input",
            function () {

                const digits =
                    cardNumber.value
                        .replace(
                            /\D/g,
                            ""
                        )
                        .slice(
                            0,
                            16
                        );


                cardNumber.value =
                    digits
                        .replace(
                            /(.{4})/g,
                            "$1 "
                        )
                        .trim();

            }
        );


        cardExpiry.addEventListener(
            "input",
            function () {

                let digits =
                    cardExpiry.value
                        .replace(
                            /\D/g,
                            ""
                        )
                        .slice(
                            0,
                            4
                        );


                if (
                    digits.length > 2
                ) {

                    digits =
                        digits.slice(
                            0,
                            2
                        ) +
                        "/" +
                        digits.slice(
                            2
                        );

                }


                cardExpiry.value =
                    digits;

            }
        );


        cardCvv.addEventListener(
            "input",
            function () {

                cardCvv.value =
                    cardCvv.value
                        .replace(
                            /\D/g,
                            ""
                        )
                        .slice(
                            0,
                            4
                        );

            }
        );



        /* =================================================
           VALIDATE CHECKOUT
        ================================================= */

        function validateCheckout() {

            checkoutError.textContent =
                "";


            if (
                orderType === "delivery"
            ) {

                if (
                    savedLocations.length === 0
                ) {

                    checkoutError.textContent =
                        "Please save a delivery location before placing your order.";


                    return false;

                }


                const selected =
                    savedLocations.find(
                        function (location) {

                            return location.id ===
                                selectedLocationId;

                        }
                    );


                if (
                    !selected
                ) {

                    checkoutError.textContent =
                        "Please choose one of your saved delivery locations.";


                    return false;

                }

            }


            if (
                paymentMethod === "card"
            ) {

                const cardName =
                    document
                        .getElementById(
                            "cardName"
                        )
                        .value
                        .trim();


                const number =
                    cardNumber.value
                        .replace(
                            /\s/g,
                            ""
                        );


                if (
                    cardName.length < 2 ||
                    number.length !== 16 ||
                    cardExpiry.value.length !== 5 ||
                    cardCvv.value.length < 3
                ) {

                    checkoutError.textContent =
                        "Please complete the demo card details correctly.";


                    return false;

                }

            }


            return true;

        }



        /* =================================================
           PLACE ORDER
        ================================================= */

        const confirmationModal =
            document.getElementById(
                "confirmationModal"
            );


        function createOrderNumber() {

            return "VL-2026-" +
                Math.floor(
                    1000 +
                    Math.random() *
                    9000
                );

        }


        document
            .getElementById(
                "placeOrderButton"
            )
            .addEventListener(
                "click",
                function () {

                    if (
                        !validateCheckout()
                    ) {

                        return;

                    }


                    const user =
                        getLoggedInUser();


                    const selectedLocation =
                        orderType === "delivery"
                            ? savedLocations.find(
                                function (location) {

                                    return location.id ===
                                        selectedLocationId;

                                }
                            )
                            : null;


                    const fee =
                        orderType === "delivery"
                            ? deliveryFee
                            : 0;


                    const finalTotal =
                        getCartTotal() +
                        fee;


                    const order =
                        {
                            orderNumber:
                                createOrderNumber(),

                            customer:
                                user.name,

                            type:
                                orderType,

                            pickupTime:
                                document
                                    .getElementById(
                                        "pickupTime"
                                    )
                                    .value,

                            payment:
                                paymentMethod,

                            subtotal:
                                getCartTotal(),

                            deliveryFee:
                                fee,

                            total:
                                finalTotal,

                            location:
                                selectedLocation,

                            items:
                                [...cart],

                            date:
                                new Date()
                                    .toISOString()
                        };


                    localStorage.setItem(
                        "velouraLastOrder",
                        JSON.stringify(
                            order
                        )
                    );


                    /*
                       CARD NUMBER, EXPIRY AND CVV
                       ARE NOT SAVED.
                    */


                    closeCheckout();


                    document
                        .getElementById(
                            "confirmationName"
                        )
                        .textContent =
                        user.name
                            .split(" ")[0];


                    document
                        .getElementById(
                            "confirmationOrderNumber"
                        )
                        .textContent =
                        order.orderNumber;


                    document
                        .getElementById(
                            "confirmationTotal"
                        )
                        .textContent =
                        finalTotal +
                        " AED";


                    document
                        .getElementById(
                            "confirmationType"
                        )
                        .textContent =
                        orderType === "pickup"
                            ? "Pickup"
                            : "Delivery";


                    document
                        .getElementById(
                            "confirmationPayment"
                        )
                        .textContent =
                        paymentMethod === "card"
                            ? "Card Online"
                            : orderType === "pickup"
                                ? "Pay at Café"
                                : "Cash on Delivery";


                    document
                        .getElementById(
                            "confirmationStatus"
                        )
                        .textContent =
                        orderType === "pickup"
                            ? "Preparing for collection"
                            : "Preparing for delivery";


                    const deliveryConfirmation =
                        document.getElementById(
                            "confirmationDeliveryAddress"
                        );


                    if (
                        selectedLocation
                    ) {

                        deliveryConfirmation.innerHTML =
                            `
                            <strong>
                                ${escapeHTML(selectedLocation.label)}
                            </strong>

                            ${escapeHTML(selectedLocation.area)},
                            ${escapeHTML(selectedLocation.street)}
                            <br>

                            ${escapeHTML(selectedLocation.unit || "")}
                            <br>

                            ${escapeHTML(selectedLocation.phone)}
                            `;


                        deliveryConfirmation.classList.add(
                            "active"
                        );

                    } else {

                        deliveryConfirmation.innerHTML =
                            "";


                        deliveryConfirmation.classList.remove(
                            "active"
                        );

                    }


                    cart.length =
                        0;


                    renderCart();


                    confirmationModal.classList.add(
                        "active"
                    );


                    document.body.classList.add(
                        "modal-open"
                    );

                }
            );



        document
            .getElementById(
                "backToMenu"
            )
            .addEventListener(
                "click",
                function () {

                    confirmationModal.classList.remove(
                        "active"
                    );


                    document.body.classList.remove(
                        "modal-open"
                    );


                    document
                        .getElementById(
                            "menuProducts"
                        )
                        .scrollIntoView(
                            {
                                behavior:
                                    "smooth"
                            }
                        );

                }
            );



        /* =================================================
           INITIAL LOAD
        ================================================= */

        loadCart();

        renderCart();

        updateAccountButton();

    }
);