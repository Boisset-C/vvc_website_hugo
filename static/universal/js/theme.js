"use strict";

document.addEventListener("DOMContentLoaded", function () {
    /* =====================================================
        PARTNERS SLIDER
    ===================================================== */
    var partnersSlider = new Swiper(".partners-slider", {
        slidesPerView: 2,
        spaceBetween: 10,

        breakpoints: {
            481: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            991: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 6,
            },
        },

        // If we need pagination
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
    });

    /* =============================================
        TRIGGER COUNTER UP FUNCTION USING WAYPOINTS
    ================================================ */
    const counterElem = document.getElementById("counterUp");
    if (counterElem) {
        const counterWaypoint = new Waypoint({
            element: counterElem,
            handler: function () {
                vanillaCounterUp(".counter", 100);
            },
            offset: "75%",
        });
    }

    /* =============================================
        COUNTER UP FUNCTION
    ================================================ */

    function vanillaCounterUp(counterTarget, counterSpeed) {
        const counters = document.querySelectorAll(counterTarget);
        const speed = counterSpeed;

        counters.forEach((counter) => {
            function updateCount() {
                const target = +counter.getAttribute("data-counter");
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.trunc(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = Math.trunc(target);
                }
            }
            updateCount();
        });
    }

    /* ==============================================
     CUSTOM SELECT
    ============================================== */
    const sizes = document.querySelector(".js-sizes");

    if (sizes) {
        const sizeschoices = new Choices(sizes, {
            placeholder: true,
            searchEnabled: false,
            itemSelectText: "Select",
            callbackOnInit: function () {
                let pickerCustomClass = sizes.dataset.customclass;
                let pickerSevClasses = pickerCustomClass.split(" ");
                sizes.parentNode.classList.add.apply(sizes.parentNode.classList, pickerSevClasses);
            },
        });
    }

    /* ==============================================
        GET COUNTRIES FROM AJAX REQUEST
    ============================================== */
    const countries = document.getElementById("country");
    const states = document.getElementById("state");

    let countriesRequest = new XMLHttpRequest();
    countriesRequest.open("GET", "/universal/js/countries.json");
    countriesRequest.onload = function () {
        let requestData = JSON.parse(countriesRequest.responseText);
        renderCountries(requestData);
    };
    countriesRequest.send();

    function renderCountries(data) {
        let htmlString = "";
        for (let i = 0; i < data.length; i++) {
            htmlString += `<option value='${data[i].countryShortCode}'>${data[i].countryName}</option>`;
        }

        if (countries) {
            countries.insertAdjacentHTML("beforeend", htmlString);
            /* =====================================================
                CUSTOM SELECT
            ===================================================== */
            const countrieschoices = new Choices(countries, {
                placeholder: true,
                searchEnabled: false,
                itemSelectText: "",
                callbackOnInit: function () {
                    let pickerCustomClass = countries.dataset.customclass;
                    let pickerSevClasses = pickerCustomClass.split(" ");
                    countries.parentNode.classList.add.apply(countries.parentNode.classList, pickerSevClasses);
                },
            });
        }
    }

    /* =====================================================
        CUSTOM SELECT
    ===================================================== */
    window.onload = function () {
        if (states) {
            const stateschoices = new Choices(states, {
                placeholder: true,
                searchEnabled: false,
                itemSelectText: "",
                callbackOnInit: function () {
                    let pickerCustomClass = states.dataset.customclass;
                    let pickerSevClasses = pickerCustomClass.split(" ");
                    states.parentNode.classList.add.apply(states.parentNode.classList, pickerSevClasses);
                },
            });
        }
    };

    /* =====================================================
        NAVBAR BEHAVIOR
    ===================================================== */

    window.addEventListener("scroll", function () {
        navBarBehavior();
    });
    window.addEventListener("resize", function () {
        navBarBehavior();
    });


});
