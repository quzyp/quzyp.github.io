var locale = 'de-DE';

var ingredients = {
    yeast:      [0, 0.99, 1, 
                 document.getElementById("dis_yeast"), 
                 document.getElementById("buy-yeast-1"), 
                 document.getElementById("buy-yeast-10"),
                 document.getElementById("buy-yeast-100")],

    sugar:      [0, 1.29, 1,
                 document.getElementById("dis_sugar"),
                 document.getElementById("buy-sugar-1"),
                 document.getElementById("buy-sugar-10"),
                 document.getElementById("buy-sugar-100")],

    butter:     [0, 2.29, 0.25,
                 document.getElementById("dis_butter"),
                 document.getElementById("buy-butter-1"),
                 document.getElementById("buy-butter-10"),
                 document.getElementById("buy-butter-100")],

    eggs:       [0, 2.29, 10,
                 document.getElementById("dis_eggs"),
                 document.getElementById("buy-eggs-1"),
                 document.getElementById("buy-eggs-10"),
                 document.getElementById("buy-eggs-100")]
};

var recipes = {
    default: { yeast: 0.25, sugar: 0.1, butter: 0.125, eggs: 2}
}

var dis_money = document.getElementById("dis_money");
var dis_cookies = document.getElementById("dis_cookies");
var dis_prc_cookies = document.getElementById("dis_prc_cookies");
var dis_demand = document.getElementById("dis_demand");


var dis_yeast = document.getElementById("dis_yeast");
var dis_sugar = document.getElementById("dis_sugar");
var dis_butter = document.getElementById("dis_butter");
var dis_eggs = document.getElementById("dis_eggs");

var btn_bake = document.getElementById("bake-default");
var progress = document.getElementById("progress-bake");

var money = 10.00;
var cookies = 0;
var prc_cookie = 0.3;
var demand_base = 0.0125
var demand = 0.05;
var count = 0;

var baking = false;
var baking_progress = 0;
var baking_speed = 0.25

function mainloop() {
    demand = demand_base * (1/prc_cookie)
    progress_display = Math.ceil(baking_progress)
    progress.setAttribute("aria-valuenow", progress_display);
    progress.style.width = `${progress_display}%`;
    if (baking) {
        baking_progress += baking_speed;
        if (baking_progress >= 100) {
            baking = false;
            baking_progress = 0;
            cookies += 40;
        }
    }
    
    if (cookies > 0) {
        count += demand;
    }
    
    if (count >= 1) {
        let amount = Math.round(count);
        if (amount <= cookies) {
            count -= amount;
            cookies -= amount;
            money += (amount * prc_cookie);
        }
        else if (cookies > 0) {
            money += (cookies * prc_cookie);
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
    dis_prc_cookies.innerText = prc_cookie.toLocaleString(locale, {minimumFractionDigits: 2});
    dis_demand.innerText = toFixed((demand * 30), 1, 1);

    for (const [key, value] of Object.entries(ingredients)) {
        value[3].innerText = toFixed(value[0], 2, 2);
    }
}

function toFixed(n, min, max) {
    return n.toLocaleString(locale, {minimumFractionDigits: min, 
                                     maximumFractionDigits: max});
}

function setButtons() {
    btn_bake.disabled = false;
    if (baking) {
        btn_bake.disabled = true;
    }
    for (const [key, value] of Object.entries(ingredients)) {
        let quantity = value[0]
        value[3].classList.remove('warning')
        value[4].disabled = false;
        value[5].hidden = false;
        value[6].hidden = false;
        if (money < value[1]) {
            value[4].disabled = true;
        }
        if (money < (value[1] * 10)) {
            value[5].hidden = true;
        }
        if (money < (value[1] * 100)) {
            value[6].hidden = true;
        }       
        if (quantity < recipes['default'][key]) {
            value[3].classList.add('warning')
            btn_bake.disabled = true;
        }
    }   
}

function reply_click(clicked_id){
    let senderinfo = clicked_id.split('-');
    let [action, prod, n] = senderinfo;
    n = parseFloat(n)
    switch(action) {
        case 'buy':
            money -= n * ingredients[prod][1];
            ingredients[prod][0] += n * ingredients[prod][2];
            break;
        case 'bake':
            for (const [key, value] of Object.entries(ingredients)) {
                value[0] -= recipes['default'][key];
                value[3].classList.add('highlight');
                setTimeout(highlight, 1000, value[3]);
            }
            baking = true;
            break;
        case 'inc':
            eval(prod + " += " + n);
            break;
        case 'dec':
            value = n
            if ((window[prod] - value) > 0) {
                window[prod] -= value;            
            }
            break;
    }
}

function highlight(elem) {
    elem.classList.remove('highlight');
}

setInterval(mainloop, 30);
