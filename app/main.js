import "./style.css";

async function getData() {
  //fetch returns a promise

  try {
    const response = await fetch(/* URL */);
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      document.querySelector("h1").textContent = data.name;
    }
  } catch (error) {
    console.log(error);
    alert("sorry could not find that pocket onster");
  }

  console.log(response);
  const data = await response.json();
}
