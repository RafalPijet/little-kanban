function Column(id, name) {
    var self = this;
    this.name = name || "No name";
    this.id = id;
    this.element = generateTemplate("column-template", {name: this.name, id: this.id});

    this.element.querySelector(".column").addEventListener("click", function (event) {
        var data = new FormData();

        if (event.target.classList.contains("btn-delete")) {
            self.removeColumn();
        }

        if (event.target.classList.contains("edit-column")) {
            self.updateColumn();
        }

        if (event.target.classList.contains("add-card")) {
            var cardName = prompt("Enter the name of the card");
            event.preventDefault();

            if (cardName.length) {
                imBusy(true);
                data.append("name", cardName);
                data.append("bootcamp_kanban_column_id", self.id);

                fetch(baseUrl + "/card", {
                    method: "POST",
                    headers: myHeaders,
                    body: data
                })
                    .then(function (resp) {
                        return resp.json();
                    })
                    .then(function (resp) {
                        var card = new Card(resp.id, cardName);
                        self.addCard(card);
                        imBusy(false);
                    });
            }
        }
    });
}

Column.prototype = {

    removeColumn: function () {
        var self = this;
        imBusy(true);
        fetch(baseUrl + "/column/" + self.id, {method: "DELETE", headers: myHeaders})
            .then(function (resp) {
                return resp.json();
            })
            .then(function (resp) {
                self.element.parentNode.removeChild(self.element);
                imBusy(false);
            });
    },

    addCard: function (card) {
        this.element.querySelector("ul").appendChild(card.element);
    },

    updateColumn: function () {
        var self = this;
        var newName = prompt("Enter new name of this a column");

        if (newName.length) {
            var data = {"name": newName};
            imBusy(true);

            fetch(baseUrl + "/column/" + self.id, {method: "PUT", headers: myHeadersForPUT, body: JSON.stringify(data)})
                .then(function (resp) {
                    return resp.json();
                })
                .then(function (resp) {
                    self.name = newName;
                    self.element.querySelector(".column-title").innerText = newName;
                    imBusy(false);
                })
        }
    }
};