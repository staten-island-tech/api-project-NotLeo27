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
      <div class="name"> <p>${card.name}</p> </div>
      <div class="cmc"> <p>${card.cmc}</p> </div>
      <div class="rarity"> <p>${card.rarity}</p> </p> </div>
      <div class="id"> <p>${card.multiverseid}</p> </div>
      
      <div class="image">
        <img src=${card.imageUrl} alt="${card.name}"/>
      </div>

      </div> `
    )
  );
}

function cardPacks() {}

getData();
