/**
 * @fileOverview What is this file for?
 * @author David Stille
 * @version 0.0.1
 * 
 * For local development in Firefox, set security.fileuri.strict_origin_policy to False
 */

const lang = 'de' // Main language for localization
    
/**
 * The main class of the game state.
 */
class Bakery {
    /**
     * 
     * @param {String} lang
     * @param {Array} settings
     * @param {String} state
     */
    constructor(lang, settings = [], state = '') {
        this.lang = lang;
        this.settings = settings;
        this.values = {};
        this.state = state;
        if (!this.state) {
            this.setDefaults().then();
        }
    }
    
    async setDefaults() {
        this.values = await getData('gameDefaults');
    }
}


/**
 * Get the json file and return it's contents as a json object.
 * @param {String} fileName The file name (excluding extension).
 * @returns {Promise<any>}
 */
async function getData(fileName) {
    let response = await fetch(`./data/${fileName}.json`);
    if (response.ok) {
        return await response.json();
    }
}

async function buildUI() {
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
 * @param {Element} container The containing element
 * @param {String} innerHTML The inner HTML
 * @param {String} args Additional classes
 */
function addChildCard(container, innerHTML, ...args) {
    let newChild = document.createElement("div");
    newChild.classList.add("item-card");
    newChild.classList.add(...args)
    newChild.innerHTML = innerHTML;
    container.appendChild(newChild);
}

/**
 * The main game loop.
 * @param {Object} gameObject
 */
function mainLoop(gameObject) {
    /* Set all displayed values from gameObject current values. */
    for (const [key, value] of Object.entries(gameObject.values)) {
        let idName = `dis_${key}`;
        let element = document.getElementById(idName);
        element.innerText = value;
    }
}

buildUI().then(); // Build the interface
bakery = new Bakery(lang);
setInterval(mainLoop, 30, bakery);
