main();

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
        let buttons = `<button id="buy-${name}-1" class="btn btn-primary btn-sm" onClick="reply_click(this.id)">Kaufen</button>
                       <button id="buy-${name}-10" class="btn btn-primary btn-sm" onClick="reply_click(this.id)">+10</button>
                       <button id="buy-${name}-100" class="btn btn-primary btn-sm" onClick="reply_click(this.id)">+100</button>`

        addChildCard(container1, name); // Name
        addChildCard(container1, element["qty"], "item-card-center"); // Current quantity
        addChildCard(container1, buttons, "item-card-center"); // Buy buttons
        addChildCard(container1, `${element["cost"]}€ / ${element["pack"]}`); // Buying cost
    }
}

function addChildCard(container, innerHTML, ...args) {
    // Programatically add a line in the interface from a data source.
    let newChild = document.createElement("div");
    newChild.classList.add("item-card");
    newChild.classList.add(...args)
    newChild.innerHTML = innerHTML;
    container.appendChild(newChild);
}