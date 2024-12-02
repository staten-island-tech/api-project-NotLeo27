import "/style.css";
import { DOMSelectors } from "./DOMSelectors.js";

async function getData() {
  /*fetch returns a promise */

  try {
    const response = await fetch(
      "https://api.magicthegathering.io/v1/cards?page=1"
    );
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
    }
  } catch (error) {
    console.log(error);
    alert("couldn't find the card lol");
  }
}

function clearCards() {
  DOMSelectors.personaList.innerHTML = "";
}

function addCards(cards) {
  // Card adding
  cards.forEach((card) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="card">

      <div class="image">
        <img src=${card.imageUrl} alt="${card.name}"/>
      </div>

      </div>`
    )
  );
}

function handleTabClick(event) {
  const tabId = event.target.id; //returns the id of the detected event
  let criterion;

  if (tabId === "name") {
    criterion = "name";
  } else if (tabId === "ID") {
    criterion = "ID";
  } else if (tabId === "cost") {
    criterion = "cost";
  }
}

getData();
