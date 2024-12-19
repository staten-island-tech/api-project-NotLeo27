import "../CSS/style.css"
import { DOMSelectors } from "./DOMSelectors";

let Cards = [];

function clearCards() {
    DOMSelectors.container.innerHTML = "";
}

async function getData() {
  //fetch returns a promise
  try {
    const response = await fetch("https://api.magicthegathering.io/v1/cards?page=1");
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      Cards = data.cards;
      addCards(Cards)
    }
    } catch (error) {
    console.log(error);
    alert("sorry");
    }
}

function addCards(Cards) {
    Cards.forEach((card) => {
        if (card.imageUrl) {
            container.insertAdjacentHTML(
                "beforeend",
                `<div class="card w-[300px] bg-white text-black rounded-lg p-6 border-2 border-black shadow-lg m-4" 
                      style="background-color: white; border: 2px solid black; padding: 1.5rem; margin: 1rem; border-radius: 0.5rem;">
                    <img src="${card.imageUrl}" alt="Image of ${card.name}" class="w-full h-auto rounded-md" />
                    <button class="read-more-btn text-white bg-black w-[80%] mx-auto mt-4 py-2 transition-all duration-300 hover:bg-blue-500 hover:scale-110; border-radius:0.5rem; id="${card.name}">
                        Read More
                    </button>
                </div>`
            );
        }
    });
    
    document.querySelectorAll(".read-more-btn").forEach((button) => {
        button.addEventListener("click", ReadMoreClick);
    });
}

function sortCards(cards, criterion) {
    return [...cards].sort((a, b) => {
        if (criterion === "name") {
            return a.name.localeCompare(b.name);
        } else {
            return a[criterion] - b[criterion];
        }
    });
}

function handleTabClick(event) {
    const tabId = event.target.id; // Returns the ID of the clicked tab
    let criterion;

    if (tabId === "sort-abc") {
        criterion = "name";
    } else if (tabId === "sort-mana-cost") {
        criterion = "cmc";
    } else if (tabId === "sort-id") {
        criterion = "multiverseid";
    }

    const sortedCards = sortCards(Cards, criterion); 

    clearCards();
    addCards(sortedCards);
}

DOMSelectors.criteria.forEach((tab) =>
    tab.addEventListener("click", handleTabClick)
);

async function ReadMoreClick(event) {
    const cardName = event.target.id;
    try {
        const response = await fetch(`https://api.magicthegathering.io/v1/cards?name=${encodeURIComponent(cardName)}`);
        if (response.status !== 200) {
            throw new Error(response);
        }
        const data = await response.json();
        const cardDetails = data.cards[0]; 

        clearCards();
        displayCardDetails(cardDetails);

    } catch (error) {
        console.error(error);
        alert("Sorry, failed to fetch card details.");
    }
}

function displayCardDetails(card) {
    DOMSelectors.container.insertAdjacentHTML(
        "beforeend",
        `
        <div 
            class="card-details w-full max-w-3xl mx-auto text-black rounded-lg p-8 shadow-lg" 
            style="
                background: linear-gradient(135deg, #f3e9dd, #d9c1a4); 
                border: 2px solid #8a6a44; 
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); 
                border-radius: 0.75rem;
            "
        >
            <h2 class="text-4xl font-bold mb-4">${card.name}</h2>
            <img src="${card.imageUrl || ''}" alt="Image of ${card.name}" class="w-full h-auto rounded-md mb-4 shadow-md" />
            <p class="mb-4"><strong>Type:</strong> ${card.type || "N/A"}</p>
            <p class="mb-4"><strong>Set:</strong> ${card.setName || "N/A"}</p>
            <p class="mb-4"><strong>Text:</strong> ${card.text || "N/A"}</p>
            <p class="mb-4"><strong>Mana Cost:</strong> ${card.manaCost || "N/A"}</p>
            <p class="mb-4"><strong>Power / Toughness:</strong> ${card.power || "N/A"} / ${card.toughness || "N/A"}</p>
            <button 
                id="back-button" 
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
                Back to All Cards
            </button>
        </div>
        `
    );

    document.getElementById("back-button").addEventListener("click", () => {
        clearCards();
        addCards(Cards);
    });
}

document.querySelectorAll(".read-more-btn").forEach((button) => {
    button.addEventListener("click", ReadMoreClick);
});

getData();