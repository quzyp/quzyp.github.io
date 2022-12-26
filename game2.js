// This is where the magic happens

const lang = 'de'

main().then();

async function getData(filename) {
    // Get the json file and return it's contents as a json object.
    let response = await fetch(`./data/${filename}.json`);
    if (response.ok) {
        return await response.json();
    }
}

async function main() {
    // All the ingredients go into the first div box.
    let ingredients = await getData('ingredients');
    let container1 = document.getElementById("container-card");

    for (const element of ingredients) {
        let name = element["name"];
        let nameDisplayed = element["i18n"][lang];
        let buttons = `<button id="buy-${name}-1" class="btn btn-primary btn-sm" onClick="reply_click(this.id)">Kaufen</button>
                       <button id="buy-${name}-10" class="btn btn-primary btn-sm" onClick="reply_click(this.id)">+10</button>
                       <button id="buy-${name}-100" class="btn btn-primary btn-sm" onClick="reply_click(this.id)">+100</button>`

        addChildCard(container1, nameDisplayed); // Name
        addChildCard(container1, element["qty"], "item-card-center"); // Current quantity
        addChildCard(container1, buttons, "item-card-center"); // Buy buttons
        addChildCard(container1, `${element["cost"]}€ / ${element["pack"]}`); // Buying cost
    }
}

/**
 * Does something
 * 
 * @param {Element} container
 * @param {String} innerHTML
 * @param {Array[String]} args
 */
function addChildCard(container, innerHTML, ...args) {
    let newChild = document.createElement("div");
    newChild.classList.add("item-card");
    newChild.classList.add(...args)
    newChild.innerHTML = innerHTML;
    container.appendChild(newChild);
}