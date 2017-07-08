'use strict';

const Promise = require("bluebird");
const cheerio = require('cheerio');
const bhttp = require("bhttp");
const fs = require('fs');
const readline = require('readline');
const items = require('./out.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

Object.defineProperty(Array.prototype, "distinct", {
    enumerable: false,
    value: function() {
        return this.filter(function(value, index, self) { 
            return self.indexOf(value) === index;
        });
    }
});

let order = {
    category: 0,
    food: 0,
    options: []
};

const CATEGORY = 0;
const FOOD = 1;
const OPTIONS = 2;
const LOADING = 3;

let state = CATEGORY;
let state_options_index = 0;

let categories = [];
let foods = [];
let options = [];

function print_category(){
    state = CATEGORY;
    categories = items.map(i => i.category).distinct();
    console.log('Select a category:');
    for(const index in categories) {
        console.log(index + ') ' + categories[index]);
    }
    console.log('q) Quit');
}
function print_foods(){
    state = FOOD;
    foods = items.filter(i => i.category == categories[order.category]);
    console.log('Select a food:');
    for(const index in foods) {
        console.log(index + ') ' + foods[index].name + ' (' + foods[index].price + ')');
    }
    console.log('b) Back');
    console.log('q) Quit');
}
function print_options() {
    state = OPTIONS;
    var food = foods[order.food];
    if(!food.options) {
        state = LOADING;
        parseOptions(food.name, food.sidedish_form).then(options => {
            food.options = options;
            fs.writeFile('options.json', JSON.stringify(options, null, 2), () => {});
            print_options();
        });
        return;
    }
    if(state_options_index >= food.options.length) {
        console.log("Food order placed!");
        console.log("You want " + food.name);
        for(const index in food.options) {
            const option = food.options[index];
            const value = order.options[index];
            let str = option.name + ' ';
            let first = true;
            for(const val of value) {
                if(first) first = false;
                else str += ", ";
                str += option.options[val].name;
            }
            console.log(str);
        }
        rl.close();
        return;
    }
    let option = food.options[state_options_index];
    console.log(option.name + (option.type == 'checkbox' ? ' (combine multiple options, e.g. \'1, 2, 5\'' : ''));

    for(const index in option.options){
        console.log(index + ") " + option.options[index].name);
    }
    console.log('b) Back');
    console.log('q) Quit');
}

print_category();

rl.on('line', line => {
    let index;
    switch(state) {
        case CATEGORY:
            index = parseInt(line);
            if(isNaN(index)) {
                if(line == 'q') {
                    rl.close();
                    return;
                }
                console.log('Invalid number');
                return;
            }
            if(index < 0 || index >= categories.length) {
                console.log('Number needs to be between 0 and ' + (categories.length - 1));
                return;
            }
            order.category = index;
            print_foods();
            break;
        case FOOD:
            index = parseInt(line);
            if(isNaN(index)) {
                if(line == 'q') {
                    rl.close();
                    return;
                }
                if(line == 'b') {
                    state = CATEGORY;
                    print_category();
                    return;
                }
                console.log('Invalid number');
                return;
            }
            if(index < 0 || index >= foods.length) {
                console.log('Number needs to be between 0 and ' + (foods.length - 1));
                return;
            }
            order.food = index;
            state_options_index = 0;
            print_options();
            break;
        case OPTIONS:
            const food = foods[order.food];
            const option = food.options[state_options_index];
            let split = line.split(',').map(s => parseInt(s.trim()));
            if(split.some(isNaN)) {
                if(line == 'q') {
                    rl.close();
                    return;
                }
                if(line == 'b') {
                    state = CATEGORY;
                    print_foods();
                    return;
                }
                if(line.trim().length == 0){
                    split = [];
                } else {
                    console.log('Invalid options');
                    return;
                }
            }
            order.options[state_options_index] = split;
            state_options_index++;
            print_options();
            break;
    }
});
/*
Promise.try(() => {
    return bhttp.get('https://www.thuisbezorgd.nl/subway-rotterdam-teilingerstraat');
}).then((response) => {
    const $ = cheerio.load(response.body);
    let last_category = "";
    let promises = [];
    $('.meal,.menu-category-head').each((i, elem) => {
        const e = $(elem);
        if(e.hasClass('menu-category-head')) {
            last_category = e.find('span').text();
        } else {
            const id = e.attr('id');
            const name = e.find('.meal-name').text();
            const price = e.find('.menu-meal-add span').text();
            const form = e.find('form').serialize();

            const item = {
                category: last_category,
                id: id,
                name: name,
                price: price,
                sidedish_form: form
            };
            promises.push(item);
        }
    });

    return promises;
}).then((items) => {
    console.log(JSON.stringify(items, null, 2));
});
*/

function parseOptions(name, formData) {
    return Promise.try(() => {
        return bhttp.post("https://www.thuisbezorgd.nl/xHttp/showSidedishes.php", "action=add&product=5R515QO3N&domid=productformpopular5R515QO3N&menucat=5NP77O0N&rest=5P71353", { headers: {"content-type": "application/x-www-form-urlencoded"}});
    }).then((response) => {
        const $ = cheerio.load(response.body);
        let meal_options = [];
        $('.sidedish').each((index, _e) => {
            const elem = $(_e);
            const name = elem.find('h3').text();
            let type;
            let options = null;
            if(elem.hasClass('sidedish-select')) {
                type = 'select';
                options = elem.find('option').toArray().map(_e => {
                    const elem = $(_e);
                    const name = elem.text();
                    const index = name.indexOf('(+€');
                    let price = 0;
                    if(index > -1){
                        price = parseFloat(name.substring(index + 3).trim().replace(',','.'));
                    }
                    
                    return { name: name, price: price };
                });
            } else if(elem.hasClass('sidedish-checkboxgroup')) {
                type = 'checkbox';
                options = elem.find('span').toArray().map(_e => {
                    const elem = $(_e);
                    const name = elem.text();
                    const index = name.indexOf('(+€');
                    let price = 0;
                    if(index > -1){
                        price = parseFloat(name.substring(index + 3).trim().replace(',','.'));
                    }
                    
                    return { name: name, price: price };
                });
            } else {
                console.log('Unknown class: ', elem.attr('class'));
                return;
            }
            meal_options.push({
                name: name,
                options: options,
                type: type
            })
        });
        return meal_options;
    });
}
