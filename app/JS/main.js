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
                    <button class="text-white bg-black w-[80%] mx-auto mt-4 py-2 transition-all duration-300 hover:bg-blue-500 hover:scale-110; border-radius:0.5rem; id="${card.name}">
                        Read More
                    </button>
                </div>`
            );
        }
    });

    const readMoreButtons = document.querySelectorAll("button[id^='read-more-']");
    readMoreButtons.forEach(button => {
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

async function handleReadMoreClick(event) {
    
    try {
        const response = await fetch("https://api.magicthegathering.io/v1/cards?page=1");
        if (response.status != 200) {
          throw new Error(response);
        } else {
            const data = await response.json();
            Cards = data.cards;
            const cardId = event.target.id.replace('read-more-', ''); 
            const card = Cards.find(card => card.id === cardId); 
        
            if (card) {
            clearCards();     
            showCardDetails(card); 
        }
        }
        } catch (error) {
        console.log(error);
        alert("sorry");
        }

    /* const cardId = event.target.id.replace('read-more-', ''); 
    const card = Cards.find(card => card.id === cardId); 
  
    if (card) {
      clearCards();     
      showCardDetails(card); 
    } */
}

async function showCardDetails(card) {
    DOMSelectors.container.insertAdjacentHTML("beforeend",
    ``)
}


DOMSelectors.criteria.forEach((tab) =>
    tab.addEventListener("click", handleTabClick)
);


getData();