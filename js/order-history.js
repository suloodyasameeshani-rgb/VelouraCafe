/* =========================================================
   VELOURA CAFE
   ORDER HISTORY
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


        const ordersList =
            document.getElementById(
                "ordersList"
            );


        const emptyHistory =
            document.getElementById(
                "emptyHistory"
            );


        const noSearchResults =
            document.getElementById(
                "noSearchResults"
            );


        const historySearch =
            document.getElementById(
                "historySearch"
            );


        const historyFilter =
            document.getElementById(
                "historyFilter"
            );


        const orderModal =
            document.getElementById(
                "orderModal"
            );


        const reorderModal =
            document.getElementById(
                "reorderModal"
            );


        let orders =
            [];


        let selectedOrder =
            null;


        let reorderTarget =
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
                    threshold: 0.1
                }
            );


        document
            .querySelectorAll(
                ".reveal"
            )
            .forEach(
                function (element) {

                    revealObserver.observe(
                        element
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


        function updateCustomerInformation() {

            const user =
                getLoggedInUser();


            const customerName =
                document.getElementById(
                    "customerName"
                );


            const customerEmail =
                document.getElementById(
                    "customerEmail"
                );


            const customerInitial =
                document.getElementById(
                    "customerInitial"
                );


            const accountButton =
                document.getElementById(
                    "accountButton"
                );


            if (
                user
            ) {

                customerName.textContent =
                    user.name;


                customerEmail.textContent =
                    user.email;


                customerInitial.textContent =
                    user.name
                        .charAt(0)
                        .toUpperCase();


                accountButton.textContent =
                    user.name
                        .split(" ")[0]
                        .toUpperCase();

            } else {

                customerName.textContent =
                    "Veloura Guest";


                customerEmail.textContent =
                    "Sign in from the menu to view your account";


                customerInitial.textContent =
                    "V";


                accountButton.textContent =
                    "MY ACCOUNT";

            }

        }



        /* =================================================
           STORAGE KEY
        ================================================= */

        function getHistoryStorageKey() {

            const user =
                getLoggedInUser();


            if (
                user &&
                user.email
            ) {

                return (
                    "velouraOrderHistory_" +
                    user.email
                        .trim()
                        .toLowerCase()
                );

            }


            return "velouraOrderHistory";

        }



        /* =================================================
           LOAD ORDER HISTORY
        ================================================= */

        function loadOrders() {

            orders =
                [];


            const historyKey =
                getHistoryStorageKey();


            const savedHistory =
                localStorage.getItem(
                    historyKey
                );


            if (
                savedHistory
            ) {

                try {

                    const parsed =
                        JSON.parse(
                            savedHistory
                        );


                    if (
                        Array.isArray(
                            parsed
                        )
                    ) {

                        orders =
                            parsed;

                    }

                } catch (error) {

                    orders =
                        [];

                }

            }


            /*
               CURRENT MENU SYSTEM COMPATIBILITY

               Your present menu.js saves the latest completed
               order as "velouraLastOrder".

               Until menu.js is updated to save EVERY order,
               this code automatically imports that last order
               into the history without creating duplicates.
            */

            importLastOrder();


            sortOrdersNewestFirst();

        }



        function importLastOrder() {

            const savedLastOrder =
                localStorage.getItem(
                    "velouraLastOrder"
                );


            if (
                !savedLastOrder
            ) {

                return;

            }


            try {

                const lastOrder =
                    JSON.parse(
                        savedLastOrder
                    );


                if (
                    !lastOrder ||
                    !lastOrder.orderNumber
                ) {

                    return;

                }


                const alreadyExists =
                    orders.some(
                        function (order) {

                            return (
                                order.orderNumber ===
                                lastOrder.orderNumber
                            );

                        }
                    );


                if (
                    !alreadyExists
                ) {

                    if (
                        !lastOrder.status
                    ) {

                        lastOrder.status =
                            lastOrder.type ===
                            "delivery"
                                ? "Preparing for delivery"
                                : "Preparing for collection";

                    }


                    orders.push(
                        lastOrder
                    );


                    saveOrders();

                }

            } catch (error) {

                /*
                    Ignore invalid old data.
                */

            }

        }



        function saveOrders() {

            localStorage.setItem(
                getHistoryStorageKey(),
                JSON.stringify(
                    orders
                )
            );

        }



        function sortOrdersNewestFirst() {

            orders.sort(
                function (
                    first,
                    second
                ) {

                    return (
                        new Date(
                            second.date || 0
                        ) -
                        new Date(
                            first.date || 0
                        )
                    );

                }
            );

        }



        /* =================================================
           FORMAT HELPERS
        ================================================= */

        function formatDateTime(
            dateString
        ) {

            if (
                !dateString
            ) {

                return "Date unavailable";

            }


            const date =
                new Date(
                    dateString
                );


            if (
                Number.isNaN(
                    date.getTime()
                )
            ) {

                return "Date unavailable";

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



        function formatShortDate(
            dateString
        ) {

            if (
                !dateString
            ) {

                return "—";

            }


            const date =
                new Date(
                    dateString
                );


            if (
                Number.isNaN(
                    date.getTime()
                )
            ) {

                return "—";

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



        function escapeHTML(
            value
        ) {

            const div =
                document.createElement(
                    "div"
                );


            div.textContent =
                String(
                    value || ""
                );


            return div.innerHTML;

        }



        function getOrderItemCount(
            order
        ) {

            if (
                !Array.isArray(
                    order.items
                )
            ) {

                return 0;

            }


            return order.items.reduce(
                function (
                    total,
                    item
                ) {

                    return (
                        total +
                        Number(
                            item.quantity || 0
                        )
                    );

                },
                0
            );

        }



        function getOrderStatus(
            order
        ) {

            if (
                order.status
            ) {

                return order.status;

            }


            return order.type ===
                "delivery"
                    ? "Preparing for delivery"
                    : "Preparing for collection";

        }



        function getPaymentText(
            order
        ) {

            if (
                order.payment === "card"
            ) {

                return "Card Online";

            }


            if (
                order.payment === "cash" &&
                order.type === "delivery"
            ) {

                return "Cash on Delivery";

            }


            if (
                order.payment === "cash" &&
                order.type === "pickup"
            ) {

                return "Pay at Café";

            }


            return order.payment ||
                "Not specified";

        }



        /* =================================================
           SUMMARY
        ================================================= */

        function updateSummary() {

            document
                .getElementById(
                    "totalOrders"
                )
                .textContent =
                orders.length;


            const spent =
                orders.reduce(
                    function (
                        total,
                        order
                    ) {

                        return (
                            total +
                            Number(
                                order.total || 0
                            )
                        );

                    },
                    0
                );


            document
                .getElementById(
                    "totalSpent"
                )
                .textContent =
                spent;


            document
                .getElementById(
                    "lastOrderDate"
                )
                .textContent =
                orders.length > 0
                    ? formatShortDate(
                        orders[0].date
                    )
                    : "—";

        }



        /* =================================================
           FILTER HISTORY
        ================================================= */

        function getFilteredOrders() {

            const search =
                historySearch.value
                    .trim()
                    .toLowerCase();


            const filter =
                historyFilter.value;


            return orders.filter(
                function (order) {

                    const typeMatch =
                        filter === "all" ||
                        order.type ===
                        filter;


                    const itemNames =
                        Array.isArray(
                            order.items
                        )
                            ? order.items
                                .map(
                                    function (item) {

                                        return item.name;

                                    }
                                )
                                .join(
                                    " "
                                )
                            : "";


                    const searchText =
                        [
                            order.orderNumber,
                            order.customer,
                            order.type,
                            getPaymentText(
                                order
                            ),
                            getOrderStatus(
                                order
                            ),
                            itemNames
                        ]
                            .join(
                                " "
                            )
                            .toLowerCase();


                    const searchMatch =
                        search === "" ||
                        searchText.includes(
                            search
                        );


                    return (
                        typeMatch &&
                        searchMatch
                    );

                }
            );

        }



        /* =================================================
           RENDER HISTORY
        ================================================= */

        function renderOrders() {

            ordersList.innerHTML =
                "";


            if (
                orders.length === 0
            ) {

                emptyHistory.classList.add(
                    "active"
                );


                noSearchResults.classList.remove(
                    "active"
                );


                return;

            }


            emptyHistory.classList.remove(
                "active"
            );


            const filteredOrders =
                getFilteredOrders();


            if (
                filteredOrders.length === 0
            ) {

                noSearchResults.classList.add(
                    "active"
                );


                return;

            }


            noSearchResults.classList.remove(
                "active"
            );


            filteredOrders.forEach(
                function (order) {

                    const card =
                        createOrderCard(
                            order
                        );


                    ordersList.appendChild(
                        card
                    );

                }
            );

        }



        function createOrderCard(
            order
        ) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "order-card";


            const typeText =
                order.type === "delivery"
                    ? "Delivery"
                    : "Pickup";


            const typeIcon =
                order.type === "delivery"
                    ? "⌖"
                    : "V";


            const items =
                Array.isArray(
                    order.items
                )
                    ? order.items
                    : [];


            const previewImages =
                items
                    .slice(
                        0,
                        3
                    )
                    .map(
                        function (item) {

                            return `
                                <div class="preview-image">

                                    <img
                                        src="${escapeHTML(
                                            item.image ||
                                            ""
                                        )}"
                                        alt="${escapeHTML(
                                            item.name ||
                                            "Veloura item"
                                        )}"
                                    >

                                </div>
                            `;

                        }
                    )
                    .join(
                        ""
                    );


            const extraCount =
                items.length > 3
                    ? `
                        <div class="preview-extra">
                            +${items.length - 3}
                        </div>
                      `
                    : "";


            const itemNames =
                items
                    .slice(
                        0,
                        2
                    )
                    .map(
                        function (item) {

                            return item.name;

                        }
                    )
                    .join(
                        " · "
                    );


            const moreText =
                items.length > 2
                    ? " + more"
                    : "";


            card.innerHTML =
                `
                <div class="order-card-top">


                    <div class="order-number-area">

                        <p>
                            ORDER NUMBER
                        </p>

                        <h3>
                            ${escapeHTML(
                                order.orderNumber
                            )}
                        </h3>

                        <span class="order-date">
                            ${escapeHTML(
                                formatDateTime(
                                    order.date
                                )
                            )}
                        </span>

                    </div>


                    <div class="order-type-area">

                        <div class="order-type-icon">
                            ${typeIcon}
                        </div>

                        <div>

                            <span>
                                ORDER TYPE
                            </span>

                            <strong>
                                ${typeText}
                            </strong>

                        </div>

                    </div>


                    <div class="order-card-right">

                        <span class="order-status">

                            ${escapeHTML(
                                getOrderStatus(
                                    order
                                )
                            )}

                        </span>


                        <div class="order-card-total">

                            <strong>
                                ${Number(
                                    order.total || 0
                                )}
                            </strong>

                            <span>
                                AED
                            </span>

                        </div>

                    </div>


                </div>


                <div class="order-card-body">


                    <div class="order-preview-items">


                        <div class="preview-images">

                            ${previewImages}

                            ${extraCount}

                        </div>


                        <div class="preview-item-text">

                            <strong>
                                ${escapeHTML(
                                    itemNames ||
                                    "Veloura order"
                                )}
                                ${moreText}
                            </strong>

                            <span>
                                ${getOrderItemCount(
                                    order
                                )}
                                ${
                                    getOrderItemCount(
                                        order
                                    ) === 1
                                        ? "item"
                                        : "items"
                                }
                                ·
                                ${escapeHTML(
                                    getPaymentText(
                                        order
                                    )
                                )}
                            </span>

                        </div>


                    </div>


                    <div class="order-card-actions">

                        <button
                            type="button"
                            class="view-order-button"
                            data-order-number="${escapeHTML(
                                order.orderNumber
                            )}"
                        >
                            VIEW DETAILS
                        </button>


                        <button
                            type="button"
                            class="order-again-button"
                            data-reorder-number="${escapeHTML(
                                order.orderNumber
                            )}"
                        >
                            ORDER AGAIN
                        </button>

                    </div>


                </div>
                `;


            return card;

        }



        /* =================================================
           OPEN RECEIPT
        ================================================= */

        function openOrderDetails(
            orderNumber
        ) {

            const order =
                orders.find(
                    function (item) {

                        return (
                            item.orderNumber ===
                            orderNumber
                        );

                    }
                );


            if (
                !order
            ) {

                return;

            }


            selectedOrder =
                order;


            document
                .getElementById(
                    "detailOrderNumber"
                )
                .textContent =
                order.orderNumber;


            document
                .getElementById(
                    "detailOrderDate"
                )
                .textContent =
                formatDateTime(
                    order.date
                );


            document
                .getElementById(
                    "detailOrderType"
                )
                .textContent =
                order.type ===
                "delivery"
                    ? "Delivery"
                    : "Pickup";


            document
                .getElementById(
                    "detailPayment"
                )
                .textContent =
                getPaymentText(
                    order
                );


            document
                .getElementById(
                    "detailStatus"
                )
                .textContent =
                getOrderStatus(
                    order
                );


            const locationContainer =
                document.getElementById(
                    "receiptLocation"
                );


            if (
                order.type === "delivery" &&
                order.location
            ) {

                locationContainer.classList.add(
                    "active"
                );


                document
                    .getElementById(
                        "detailLocationName"
                    )
                    .textContent =
                    order.location.label ||
                    "Delivery location";


                document
                    .getElementById(
                        "detailLocationAddress"
                    )
                    .textContent =
                    [
                        order.location.area,
                        order.location.street,
                        order.location.unit
                    ]
                        .filter(
                            Boolean
                        )
                        .join(
                            ", "
                        );


                document
                    .getElementById(
                        "detailLocationPhone"
                    )
                    .textContent =
                    order.location.phone ||
                    "";

            } else {

                locationContainer.classList.remove(
                    "active"
                );

            }


            renderReceiptItems(
                order
            );


            const subtotal =
                Number(
                    order.subtotal !== undefined
                        ? order.subtotal
                        : calculateSubtotal(
                            order
                        )
                );


            const fee =
                Number(
                    order.deliveryFee || 0
                );


            document
                .getElementById(
                    "detailSubtotal"
                )
                .textContent =
                subtotal;


            document
                .getElementById(
                    "detailDeliveryFee"
                )
                .textContent =
                fee > 0
                    ? fee + " AED"
                    : "FREE";


            document
                .getElementById(
                    "detailTotal"
                )
                .textContent =
                Number(
                    order.total || 0
                );


            orderModal.classList.add(
                "active"
            );


            document.body.classList.add(
                "modal-open"
            );

        }



        function calculateSubtotal(
            order
        ) {

            if (
                !Array.isArray(
                    order.items
                )
            ) {

                return 0;

            }


            return order.items.reduce(
                function (
                    total,
                    item
                ) {

                    return (
                        total +
                        Number(
                            item.price || 0
                        ) *
                        Number(
                            item.quantity || 0
                        )
                    );

                },
                0
            );

        }



        function renderReceiptItems(
            order
        ) {

            const receiptItems =
                document.getElementById(
                    "receiptItems"
                );


            receiptItems.innerHTML =
                "";


            const items =
                Array.isArray(
                    order.items
                )
                    ? order.items
                    : [];


            document
                .getElementById(
                    "detailItemCount"
                )
                .textContent =
                getOrderItemCount(
                    order
                ) +
                (
                    getOrderItemCount(
                        order
                    ) === 1
                        ? " ITEM"
                        : " ITEMS"
                );


            items.forEach(
                function (item) {

                    const row =
                        document.createElement(
                            "div"
                        );


                    row.className =
                        "receipt-item";


                    const quantity =
                        Number(
                            item.quantity || 0
                        );


                    const price =
                        Number(
                            item.price || 0
                        );


                    row.innerHTML =
                        `
                        <div class="receipt-item-image">

                            <img
                                src="${escapeHTML(
                                    item.image || ""
                                )}"
                                alt="${escapeHTML(
                                    item.name ||
                                    "Veloura item"
                                )}"
                            >

                        </div>


                        <div>

                            <h4>
                                ${escapeHTML(
                                    item.name ||
                                    "Veloura Item"
                                )}
                            </h4>

                            <p>
                                ${quantity}
                                ×
                                ${price}
                                AED
                            </p>

                        </div>


                        <div class="receipt-item-price">

                            <strong>
                                ${quantity * price}
                            </strong>

                            <span>
                                AED
                            </span>

                        </div>
                        `;


                    receiptItems.appendChild(
                        row
                    );

                }
            );

        }



        function closeOrderDetails() {

            orderModal.classList.remove(
                "active"
            );


            document.body.classList.remove(
                "modal-open"
            );


            selectedOrder =
                null;

        }



        document
            .getElementById(
                "orderModalClose"
            )
            .addEventListener(
                "click",
                closeOrderDetails
            );


        document
            .getElementById(
                "orderModalBackdrop"
            )
            .addEventListener(
                "click",
                closeOrderDetails
            );


        document
            .getElementById(
                "closeReceiptButton"
            )
            .addEventListener(
                "click",
                closeOrderDetails
            );



        /* =================================================
           ORDER AGAIN
        ================================================= */

        function openReorderModal(
            orderNumber
        ) {

            const order =
                orders.find(
                    function (item) {

                        return (
                            item.orderNumber ===
                            orderNumber
                        );

                    }
                );


            if (
                !order
            ) {

                return;

            }


            reorderTarget =
                order;


            document
                .getElementById(
                    "reorderOrderNumber"
                )
                .textContent =
                order.orderNumber;


            reorderModal.classList.add(
                "active"
            );


            document.body.classList.add(
                "modal-open"
            );

        }



        function closeReorderModal() {

            reorderModal.classList.remove(
                "active"
            );


            if (
                !orderModal.classList.contains(
                    "active"
                )
            ) {

                document.body.classList.remove(
                    "modal-open"
                );

            }


            reorderTarget =
                null;

        }



        function addPreviousOrderToBag() {

            if (
                !reorderTarget ||
                !Array.isArray(
                    reorderTarget.items
                )
            ) {

                return;

            }


            let cart =
                [];


            const savedCart =
                localStorage.getItem(
                    "velouraCart"
                );


            if (
                savedCart
            ) {

                try {

                    const parsedCart =
                        JSON.parse(
                            savedCart
                        );


                    if (
                        Array.isArray(
                            parsedCart
                        )
                    ) {

                        cart =
                            parsedCart;

                    }

                } catch (error) {

                    cart =
                        [];

                }

            }


            reorderTarget.items.forEach(
                function (oldItem) {

                    const existing =
                        cart.find(
                            function (cartItem) {

                                return (
                                    cartItem.name ===
                                    oldItem.name
                                );

                            }
                        );


                    if (
                        existing
                    ) {

                        existing.quantity =
                            Number(
                                existing.quantity || 0
                            ) +
                            Number(
                                oldItem.quantity || 0
                            );

                    } else {

                        cart.push(
                            {
                                name:
                                    oldItem.name,

                                price:
                                    Number(
                                        oldItem.price || 0
                                    ),

                                quantity:
                                    Number(
                                        oldItem.quantity || 1
                                    ),

                                image:
                                    oldItem.image || ""
                            }
                        );

                    }

                }
            );


            localStorage.setItem(
                "velouraCart",
                JSON.stringify(
                    cart
                )
            );


            const orderNumber =
                reorderTarget.orderNumber;


            closeReorderModal();


            closeOrderDetails();


            showToast(
                "Order added to bag",
                orderNumber +
                " items are ready in your Veloura bag."
            );


            setTimeout(
                function () {

                    window.location.href =
                        "menu.html";

                },
                1000
            );

        }



        document
            .getElementById(
                "cancelReorder"
            )
            .addEventListener(
                "click",
                closeReorderModal
            );


        document
            .getElementById(
                "reorderBackdrop"
            )
            .addEventListener(
                "click",
                closeReorderModal
            );


        document
            .getElementById(
                "confirmReorder"
            )
            .addEventListener(
                "click",
                addPreviousOrderToBag
            );


        document
            .getElementById(
                "detailOrderAgain"
            )
            .addEventListener(
                "click",
                function () {

                    if (
                        selectedOrder
                    ) {

                        openReorderModal(
                            selectedOrder.orderNumber
                        );

                    }

                }
            );



        /* =================================================
           CARD BUTTON EVENTS
        ================================================= */

        ordersList.addEventListener(
            "click",
            function (event) {

                const viewButton =
                    event.target.closest(
                        ".view-order-button"
                    );


                const reorderButton =
                    event.target.closest(
                        ".order-again-button"
                    );


                if (
                    viewButton
                ) {

                    openOrderDetails(
                        viewButton.dataset.orderNumber
                    );


                    return;

                }


                if (
                    reorderButton
                ) {

                    openReorderModal(
                        reorderButton.dataset.reorderNumber
                    );

                }

            }
        );



        /* =================================================
           SEARCH
        ================================================= */

        historySearch.addEventListener(
            "input",
            renderOrders
        );


        historyFilter.addEventListener(
            "change",
            renderOrders
        );



        /* =================================================
           TOAST
        ================================================= */

        function showToast(
            title,
            message
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
                    "toastMessage"
                )
                .textContent =
                message;


            toast.classList.add(
                "active"
            );


            setTimeout(
                function () {

                    toast.classList.remove(
                        "active"
                    );

                },
                2500
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
                    reorderModal.classList.contains(
                        "active"
                    )
                ) {

                    closeReorderModal();

                    return;

                }


                if (
                    orderModal.classList.contains(
                        "active"
                    )
                ) {

                    closeOrderDetails();

                }

            }
        );



        /* =================================================
           INITIAL LOAD
        ================================================= */

        updateCustomerInformation();


        loadOrders();


        updateSummary();


        renderOrders();


    }
);