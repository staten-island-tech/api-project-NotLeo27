import "/style.css";
import "./DOMSelectors.js";

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

      const array = data.cards;

      /* array.forEach((x) => {
        console.log(x.name);
      }); */
    }
  } catch (error) {
    console.log(error);
    alert("couldn't fit the card lol");
  }
}

function addCards(cards) {
  // Card adding
  cards.forEach((card) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="card">
      <div class=""></div>
      </div> `
    )
  );
}

getData();
