var baseUrl = "https://cors-anywhere.herokuapp.com/https://kodilla.com/pl/bootcamp-api";
var myHeaders = {
    'X-Client-Id': 3667,
    "X-Auth-Token": "1c84e562cacd1d7bbdc02ef320618dec"
};
var myHeadersForPUT = {
    'X-Client-Id': 3667,
    "X-Auth-Token": "1c84e562cacd1d7bbdc02ef320618dec",
    'Content-Type': 'application/json'
};

fetch(baseUrl + "/board", {headers: myHeaders})
    .then(function (resp) {
        return resp.json();
    })
    .then(function (resp) {
        var board = new Board(resp.id, resp.name);
        document.querySelector(".insert").appendChild(board.element);
        setupColumns(board, resp.columns);
    });

function setupColumns(board, columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
    cards.forEach(function (card) {
        var cardObj = new Card(card.id, card.name);
        col.addCard(cardObj);
    });
}

function generateTemplate(name, data, basicElement) {
    var template = document.getElementById(name).innerHTML;
    var element = document.createElement(basicElement || 'div');
    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);
    return element;
}

function initSortable(id, group) {
    var el = document.getElementById(id);
    Sortable.create(el, {
        group: group,
        sort: true
    });
}

function imBusy(condidtion) {
    var buttons = document.querySelectorAll("button");
    var icons = document.querySelectorAll("img");
    var container = document.querySelector(".container");

    if (condidtion) {

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }

        for (var i = 0; i < icons.length; i++) {
            icons[i].classList.add("display-off");
        }
        container.classList.add("cursor-progress");

    } else {

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
        }

        for (var i = 0; i < icons.length; i++) {
            icons[i].classList.remove("display-off");
        }
        container.classList.remove("cursor-progress");
    }
}





