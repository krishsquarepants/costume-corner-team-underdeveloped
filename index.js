function showSidebar() {
    document.querySelector(".sidebar").classList.add('visible');
}

function hideSidebar() {
    document.querySelector(".sidebar").classList.remove('visible');
}

function startDictation() {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
        var recognition = new webkitSpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = function (e) {
            document.getElementById('search-bar').value = e.results[0][0].transcript;
            recognition.stop();
        };

        recognition.onerror = function (e) {
            recognition.stop();
        }
    }
}
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper svg");
const firstCardWidth = carousel.querySelector(".card").offsetWidth + 16; 

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

let isDragging = false;
let startX;
let startScrollLeft;

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);