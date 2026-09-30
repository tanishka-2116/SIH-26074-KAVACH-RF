/* =========================================================
   KAVACH-RF
   Panchayat Weather Intelligence Dashboard
   Smart India Hackathon 2026 — PS 26074
========================================================= */


/* =========================================================
   1. DEMO DATA
========================================================= */

const panchayatData = {

    "panchayat-a": {
        name: "Panchayat A",
        temperature: "27.4°",
        rainfall: "18.2",
        humidity: "72%",
        confidence: "87%",
        risk: "MODERATE",
        riskClass: "moderate",

        forecast: [45, 30, 68, 82, 50],

        fingerprint: {
            historical: "86%",
            terrain: "74%",
            landUse: "81%",
            seasonality: "92%"
        }
    },

    "panchayat-b": {
        name: "Panchayat B",
        temperature: "26.8°",
        rainfall: "12.6",
        humidity: "68%",
        confidence: "91%",
        risk: "LOW",
        riskClass: "low",

        forecast: [32, 28, 45, 38, 42],

        fingerprint: {
            historical: "89%",
            terrain: "78%",
            landUse: "84%",
            seasonality: "90%"
        }
    },

    "panchayat-c": {
        name: "Panchayat C",
        temperature: "28.1°",
        rainfall: "26.8",
        humidity: "76%",
        confidence: "83%",
        risk: "HIGH",
        riskClass: "high",

        forecast: [62, 75, 88, 70, 65],

        fingerprint: {
            historical: "82%",
            terrain: "71%",
            landUse: "79%",
            seasonality: "88%"
        }
    },

    "panchayat-d": {
        name: "Panchayat D",
        temperature: "25.9°",
        rainfall: "9.4",
        humidity: "61%",
        confidence: "94%",
        risk: "LOW",
        riskClass: "low",

        forecast: [22, 35, 30, 28, 34],

        fingerprint: {
            historical: "93%",
            terrain: "86%",
            landUse: "88%",
            seasonality: "95%"
        }
    }

};


/* =========================================================
   2. DOM ELEMENTS
========================================================= */

const stateSelect =
    document.getElementById("state");

const districtSelect =
    document.getElementById("district");

const blockSelect =
    document.getElementById("block");

const panchayatSelect =
    document.getElementById("panchayat");

const applyButton =
    document.getElementById("applyLocation");


/* =========================================================
   WEATHER METRIC CARDS
========================================================= */

const metricCards =
    document.querySelectorAll(".metric-card");


const temperatureValue =
    metricCards[0]?.querySelector(".metric-value");


const rainfallValue =
    metricCards[1]?.querySelector(".metric-value");


const humidityValue =
    metricCards[2]?.querySelector(".metric-value");


const confidenceValue =
    metricCards[3]?.querySelector(".metric-value");


/* =========================================================
   FORECAST ELEMENTS
========================================================= */

const forecastBars =
    document.querySelectorAll(".bar");


/* =========================================================
   WEATHER FINGERPRINT
========================================================= */

const fingerprintItems =
    document.querySelectorAll(
        ".fingerprint-item strong"
    );


/* =========================================================
   RISK ELEMENTS
========================================================= */

const riskPanel =
    document.querySelector(".risk-panel");

const riskHeading =
    document.querySelector(".risk-content h3");

const riskDescription =
    document.querySelector(".risk-content p");

const riskValue =
    document.querySelector(".risk-value");


/* =========================================================
   PANCHAYAT NAME ELEMENTS
========================================================= */

const forecastPanel =
    document.querySelector(".forecast-panel");

const forecastLocation =
    forecastPanel?.querySelector(
        ".panel-header > span"
    );


const advisoryPanel =
    document.querySelector(".advisory-panel");

const advisoryLocation =
    advisoryPanel?.querySelector(
        ".panel-header > span"
    );


/* =========================================================
   3. APPLY LOCATION
========================================================= */

function applyLocation() {

    const selectedPanchayat =
        panchayatSelect.value;

    const data =
        panchayatData[selectedPanchayat];

    if (!data) {

        console.warn(
            "No demo data found for selected Panchayat."
        );

        return;
    }


    /* ---------------------------------------------
       UPDATE METRICS
    --------------------------------------------- */

    updateMetrics(data);


    /* ---------------------------------------------
       UPDATE FORECAST
    --------------------------------------------- */

    updateForecast(data.forecast);


    /* ---------------------------------------------
       UPDATE FINGERPRINT
    --------------------------------------------- */

    updateFingerprint(data.fingerprint);


    /* ---------------------------------------------
       UPDATE RISK
    --------------------------------------------- */

    updateRisk(
        data.risk,
        data.riskClass
    );


    /* ---------------------------------------------
       UPDATE PANCHAYAT LABELS
    --------------------------------------------- */

    if (forecastLocation) {

        forecastLocation.textContent =
            data.name;
    }


    if (advisoryLocation) {

        advisoryLocation.textContent =
            data.name;
    }


    /* ---------------------------------------------
       UPDATE MAP
    --------------------------------------------- */

    highlightPanchayat(
        selectedPanchayat
    );


    /* ---------------------------------------------
       USER FEEDBACK
    --------------------------------------------- */

    showUpdateMessage(
        `${data.name} forecast updated`
    );

}


/* =========================================================
   4. UPDATE WEATHER METRICS
========================================================= */

function updateMetrics(data) {

    if (temperatureValue) {

        temperatureValue.textContent =
            data.temperature;
    }


    if (rainfallValue) {

        rainfallValue.textContent =
            data.rainfall;
    }


    if (humidityValue) {

        humidityValue.textContent =
            data.humidity;
    }


    if (confidenceValue) {

        confidenceValue.textContent =
            data.confidence;
    }


    /* Also update confidence progress bar */

    const confidenceProgress =
        document.querySelector(
            ".confidence-progress"
        );

    if (confidenceProgress) {

        confidenceProgress.style.width =
            data.confidence;
    }

}


/* =========================================================
   5. UPDATE FORECAST
========================================================= */

function updateForecast(values) {

    forecastBars.forEach(
        (bar, index) => {

            if (values[index] !== undefined) {

                bar.style.height =
                    `${values[index]}%`;
            }

        }
    );

}


/* =========================================================
   6. UPDATE WEATHER FINGERPRINT
========================================================= */

function updateFingerprint(data) {

    if (fingerprintItems.length < 4) {
        return;
    }


    fingerprintItems[0].textContent =
        data.historical;


    fingerprintItems[1].textContent =
        data.terrain;


    fingerprintItems[2].textContent =
        data.landUse;


    fingerprintItems[3].textContent =
        data.seasonality;

}


/* =========================================================
   7. UPDATE RISK
========================================================= */

function updateRisk(
    risk,
    riskClass
) {

    if (!riskHeading ||
        !riskValue ||
        !riskPanel) {

        return;
    }


    riskValue.textContent =
        risk;


    riskHeading.textContent =
        `${risk.charAt(0) +
        risk.slice(1).toLowerCase()}
        Rainfall Risk`;


    /* ---------------------------------------------
       Risk description
    --------------------------------------------- */

    if (riskClass === "low") {

        riskDescription.textContent =
            "Localized rainfall conditions "
            + "are currently expected to remain "
            + "relatively stable. Continue "
            + "monitoring the forecast.";

    }


    else if (riskClass === "high") {

        riskDescription.textContent =
            "Higher localized rainfall is "
            + "expected during the forecast "
            + "window. Weather-sensitive "
            + "field operations should be "
            + "monitored closely.";

    }


    else {

        riskDescription.textContent =
            "Localized rainfall is expected "
            + "to increase during the next "
            + "forecast window. Monitor "
            + "Panchayat-level rainfall updates.";

    }


    /* ---------------------------------------------
       Risk visual class
    --------------------------------------------- */

    riskPanel.classList.remove(
        "risk-low",
        "risk-moderate",
        "risk-high"
    );

    riskPanel.classList.add(
        `risk-${riskClass}`
    );

}


/* =========================================================
   8. PANCHAYAT MAP
========================================================= */

function highlightPanchayat(
    selectedPanchayat
) {

    const mapCells =
        document.querySelectorAll(
            ".map-cell"
        );


    mapCells.forEach(
        (cell, index) => {

            cell.style.outline =
                "none";

            cell.style.transform =
                "rotate(0deg)";

            const panchayatNumber =
                index + 1;

            const cellId =
                `panchayat-${
                    String.fromCharCode(
                        96 + panchayatNumber
                    )
                }`;

            if (cellId === selectedPanchayat) {

                cell.style.outline =
                    "3px solid #ffffff";

                cell.style.boxShadow =
                    "0 0 0 3px #5b4bdb";

                cell.style.zIndex =
                    "5";

                cell.style.transform =
                    "scale(1.05)";

            }

        }
    );

}


/* =========================================================
   9. MAP CELL CLICK
========================================================= */

const mapCells =
    document.querySelectorAll(
        ".map-cell"
    );


mapCells.forEach(
    (cell, index) => {

        cell.addEventListener(
            "click",
            () => {

                const panchayatId =
                    `panchayat-${
                        String.fromCharCode(
                            97 + index
                        )
                    }`;


                /* Set dropdown */

                if (panchayatSelect) {

                    panchayatSelect.value =
                        panchayatId;

                }


                /* Apply data */

                applyLocation();


                /* Scroll to top of dashboard */

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }
);


/* =========================================================
   10. APPLY BUTTON
========================================================= */

if (applyButton) {

    applyButton.addEventListener(
        "click",
        applyLocation
    );

}


/* =========================================================
   11. DROPDOWN CHANGE
========================================================= */

if (panchayatSelect) {

    panchayatSelect.addEventListener(
        "change",
        () => {

            const selected =
                panchayatSelect.value;

            highlightPanchayat(
                selected
            );

        }
    );

}


/* =========================================================
   12. SIDEBAR NAVIGATION
========================================================= */

const navItems =
    document.querySelectorAll(
        ".nav-item"
    );


navItems.forEach(
    item => {

        item.addEventListener(
            "click",
            () => {

                navItems.forEach(
                    nav => {

                        nav.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add(
                    "active"
                );

            }
        );

    }
);


/* =========================================================
   13. SCROLL SPY
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id], main article[id]"
    );


window.addEventListener(
    "scroll",
    () => {

        let currentSection = "";

        sections.forEach(
            section => {

                const sectionTop =
                    section.offsetTop;

                if (
                    window.scrollY >=
                    sectionTop - 180
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navItems.forEach(
            nav => {

                nav.classList.remove(
                    "active"
                );


                const href =
                    nav.getAttribute(
                        "href"
                    );


                if (
                    href ===
                    `#${currentSection}`
                ) {

                    nav.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================================
   14. UPDATE MESSAGE
========================================================= */

function showUpdateMessage(
    message
) {

    let messageBox =
        document.querySelector(
            ".update-message"
        );


    if (!messageBox) {

        messageBox =
            document.createElement(
                "div"
            );

        messageBox.className =
            "update-message";


        document.body.appendChild(
            messageBox
        );

    }


    messageBox.textContent =
        message;


    messageBox.classList.add(
        "show"
    );


    setTimeout(
        () => {

            messageBox.classList.remove(
                "show"
            );

        },
        2200
    );

}


/* =========================================================
   15. ADD UPDATE MESSAGE STYLES
========================================================= */

const updateMessageStyles =
    document.createElement(
        "style"
    );


updateMessageStyles.textContent = `

    .update-message {

        position: fixed;

        bottom: 24px;

        right: 24px;

        background: #171b2b;

        color: #ffffff;

        padding: 11px 16px;

        border-radius: 8px;

        font-size: 11px;

        font-weight: 700;

        box-shadow:
            0 10px 30px
            rgba(0,0,0,0.18);

        transform:
            translateY(20px);

        opacity: 0;

        pointer-events: none;

        transition:
            opacity 0.25s ease,
            transform 0.25s ease;

        z-index: 9999;
    }


    .update-message.show {

        opacity: 1;

        transform:
            translateY(0);
    }


    .risk-low {

        background: #eef8f3 !important;

        border-color: #ccebdd !important;
    }


    .risk-low .risk-icon {

        background: #c8ebdb !important;

        color: #17613f !important;
    }


    .risk-low .risk-content .eyebrow,
    .risk-low .risk-value {

        color: #16835b !important;
    }


    .risk-high {

        background: #fff0f0 !important;

        border-color: #f0cccc !important;
    }


    .risk-high .risk-icon {

        background: #f0c2c2 !important;

        color: #8c2929 !important;
    }


    .risk-high .risk-content .eyebrow,
    .risk-high .risk-value {

        color: #c44747 !important;
    }

`;


document.head.appendChild(
    updateMessageStyles
);


/* =========================================================
   16. INITIAL DASHBOARD LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* Load Panchayat A */

        if (panchayatSelect) {

            panchayatSelect.value =
                "panchayat-a";

        }


        applyLocation();


        /* Highlight first map cell */

        highlightPanchayat(
            "panchayat-a"
        );

    }
);


/* =========================================================
   17. CONSOLE INFORMATION
========================================================= */

console.log(
    "%cKAVACH-RF Dashboard",
    "font-size:18px;font-weight:bold;"
);


console.log(
    "SIH Problem Statement: 26074"
);


console.log(
    "Prototype dashboard initialized."
);


/* =========================================================
   END OF SCRIPT
========================================================= */
