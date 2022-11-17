var locale = 'de-DE';

var ingredients = {
    yeast: [0, 0.99, 1, document.getElementById("dis_yeast"), document.getElementById("buy-yeast-1")],
    sugar: [0, 1.29, 1, document.getElementById("dis_sugar"), document.getElementById("buy-sugar-1")],
    butter: [0, 2.29, 0.25, document.getElementById("dis_butter"), document.getElementById("buy-butter-1")],
    eggs: [0, 2.29, 10, document.getElementById("dis_eggs"), document.getElementById("buy-eggs-1")]
};

var recipes = {
    default: [0.25, 0.1, 0.125, 2]
}

var dis_money = document.getElementById("dis_money");
var dis_cookies = document.getElementById("dis_cookies");
var dis_yeast = document.getElementById("dis_yeast");
var dis_sugar = document.getElementById("dis_sugar");
var dis_butter = document.getElementById("dis_butter");
var dis_eggs = document.getElementById("dis_eggs");

var btn_bake = document.getElementById("bake-default");
var progress = document.getElementById("file");

var money = 10.00;
var cookies = 0;
var prc_cookies = 0.5;
var demand = 0.1;
var count = 0;

var baking = false;
var baking_progress = 0;
var baking_speed = 0.25

function mainloop() {
    progress.setAttribute("value", baking_progress);
    if (baking) {
        baking_progress += baking_speed;
        if (baking_progress >= 100) {
            baking = false;
            baking_progress = 0;
            cookies += 40;
        }
    }
    
    count += demand;
    if (count >= 1) {
        let amount = Math.round(count);
        if (amount <= cookies) {
            count -= amount;
            cookies -= amount;
            money += (amount * prc_cookies);
        }
        else if (cookies > 0) {
            money += (cookies * prc_cookies);
            count = 0;
            cookies = 0;
        }
    }
    setDisValues();
    setButtons();
}

function setDisValues() {
    dis_money.innerText = money.toLocaleString(locale, {minimumFractionDigits: 2});
    dis_cookies.innerText = cookies.toLocaleString(locale);

    for (const [key, value] of Object.entries(ingredients)) {
        value[3].innerText = value[0].toLocaleString(locale);
    }
}

function setButtons() {
    let i = 0;
    btn_bake.disabled = false;
    if (baking) {
        btn_bake.disabled = true;
    }
    for (const [key, value] of Object.entries(ingredients)) {
        value[4].disabled = false;
        if (money < value[1]) {
            value[4].disabled = true;
        }
        if (value[0] < recipes['default'][i]) {
            btn_bake.disabled = true;
        }
        i += 1;
    }   
}

function reply_click(clicked_id){
    let senderinfo = clicked_id.split('-');
    if (senderinfo[0] == 'buy') {
        let ing = senderinfo[1];
        money -= ingredients[senderinfo[1]][1];
        ingredients[ing][0] += parseInt(senderinfo[2]) * ingredients[ing][2];
    }
    if (senderinfo[0] == 'bake') {
        let i = 0;
        for (const [key, value] of Object.entries(ingredients)) {
            value[0] -= recipes['default'][i];
            i += 1;
        }
        baking = true;
    }
}

setInterval(mainloop, 30);
