import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


/* =====================================================
   FIREBASE
===================================================== */

const firebaseConfig = {
    apiKey: "AIzaSyBybGHHjSVGwIWFICvVL89dVaAo7umNIs0",
    authDomain: "project-lablab.firebaseapp.com",
    projectId: "project-lablab",
    storageBucket: "project-lablab.firebasestorage.app",
    messagingSenderId: "245379137510",
    appId: "1:245379137510:web:c17b94b60fb1c8fa1be027",
    measurementId: "G-SZXMFFXG29"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/* =====================================================
   MUSIC - ABOUT YOU
===================================================== */

/* =====================================================
   MUSIC - ABOUT YOU
===================================================== */

const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicState = document.getElementById("musicState");
const vinyl = document.getElementById("vinyl");

musicToggle.addEventListener("click", async function () {

    console.log("Music button clicked");

    if (music.paused) {

        try {
            await music.play();

            console.log("Music is playing");

            musicState.textContent = "Sound on";
            vinyl.classList.add("playing");

        } catch (error) {

            console.error("Music failed:", error);

            musicState.textContent = "Play failed";
        }

    } else {

        music.pause();

        console.log("Music paused");

        musicState.textContent = "Play song";
        vinyl.classList.remove("playing");
    }
});

music.addEventListener("play", function () {
    musicState.textContent = "Sound on";
    vinyl.classList.add("playing");
});

music.addEventListener("pause", function () {
    musicState.textContent = "Play song";
    vinyl.classList.remove("playing");
});

/* =====================================================
   FALLING PETALS
===================================================== */

const petalLayer =
    document.getElementById("petals");

const petalSymbols = [
    "✿",
    "❀",
    "·",
    "♡"
];

for (let i = 0; i < 18; i++) {

    const petal =
        document.createElement("span");

    petal.className = "petal";

    petal.textContent =
        petalSymbols[
            Math.floor(
                Math.random() *
                petalSymbols.length
            )
        ];

    petal.style.left =
        Math.random() * 100 + "%";

    petal.style.animationDuration =
        (12 + Math.random() * 17) + "s";

    petal.style.animationDelay =
        (-Math.random() * 25) + "s";

    petal.style.fontSize =
        (12 + Math.random() * 16) + "px";

    petalLayer.appendChild(petal);
}


/* =====================================================
   MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const menuPanel =
    document.getElementById("menuPanel");

menuToggle.addEventListener(
    "click",
    () => {

        const isOpen =
            menuPanel.classList.toggle(
                "open"
            );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    }
);

menuPanel
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                menuPanel.classList.remove(
                    "open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });


/* =====================================================
   MEMORY CARDS
===================================================== */

const memoryReveal =
    document.getElementById(
        "memoryReveal"
    );

document
    .querySelectorAll(".rose-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".rose-card"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });

                card.classList.add(
                    "active"
                );

                memoryReveal.textContent =
                    card.dataset.memory;

            }
        );

    });


/* =====================================================
   STAR REVEAL
===================================================== */

document
    .getElementById("starButton")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "starMessage"
                )
                .classList.toggle(
                    "show"
                );

        }
    );


/* =====================================================
   RESPONSE PANELS
===================================================== */

const responsePanels = {

    yes:
        document.getElementById(
            "responseYes"
        ),

    time:
        document.getElementById(
            "responseTime"
        ),

    no:
        document.getElementById(
            "responseNo"
        )

};

function hideResponses() {

    Object
        .values(responsePanels)
        .forEach(panel => {

            panel.classList.remove(
                "show"
            );

        });

}


/* =====================================================
   FIREBASE RESPONSE TRACKING
===================================================== */

async function saveResponse(response) {

    const responseStatus =
        document.getElementById(
            "responseStatus"
        );

    const responseNames = {

        yes: "YES",

        time: "NEEDS TIME",

        no: "NO"

    };

    responseStatus.textContent =
        "Saving your answer... 💜";

    try {

        await addDoc(
            collection(
                db,
                "lablabResponses"
            ),
            {

                answer:
                    responseNames[response],

                answerCode:
                    response,

                timestamp:
                    serverTimestamp(),

                website:
                    "Project Lablab"

            }
        );

        console.log(
            "Firebase response saved:",
            responseNames[response]
        );

        responseStatus.textContent =
            "Your answer has been received. 💜";

        return true;

    } catch (error) {

        console.error(
            "Firebase error:",
            error
        );

        responseStatus.textContent =
            "Your answer was shown, but it couldn't be saved. Please message Junvic directly. 💜";

        return false;
    }

}


/* =====================================================
   RESPONSE BUTTONS
===================================================== */

document
    .querySelectorAll(
        "[data-response]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const response =
                    button.dataset.response;

                const buttons =
                    document.querySelectorAll(
                        "[data-response]"
                    );

                buttons.forEach(btn => {

                    btn.disabled = true;

                });

                hideResponses();

                responsePanels[response]
                    .classList.add("show");

                responsePanels[response]
                    .scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                await saveResponse(
                    response
                );

                buttons.forEach(btn => {

                    btn.disabled = false;

                });

            }
        );

    });


/* =====================================================
   RESET RESPONSE
===================================================== */

document
    .querySelectorAll(
        "[data-reset]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                hideResponses();

                document
                    .getElementById(
                        "question"
                    )
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* =====================================================
   BACK TO TOP
===================================================== */

const toTop =
    document.getElementById(
        "toTop"
    );

window.addEventListener(
    "scroll",
    () => {

        toTop.classList.toggle(
            "show",
            window.scrollY > 550
        );

    }
);

toTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);