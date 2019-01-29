function Card(id, name) {
    var self = this;
    this.id = id;
    this.name = name || "No name";
    this.element = generateTemplate("card-template", {description: this.name}, "li");

    this.element.querySelector(".card").addEventListener("click", function (event) {
        event.stopPropagation();

        if (event.target.classList.contains("btn-delete")) {
            self.removeCard();
        }

        if (event.target.classList.contains("edit-card")) {
            self.updateCard();
        }
    });

    this.element.querySelector(".card").addEventListener("drop", function (event) {
        event.stopPropagation();
        var data = new FormData();
        var newColumn = self.element.parentElement.id;
        imBusy(true);
        data.append("name", self.name);
        data.append("bootcamp_kanban_column_id", newColumn);

        fetch(baseUrl + "/card", {method: "POST", headers: myHeaders, body: data})
            .then(function (resp) {
                return resp.json();
            });

        fetch(baseUrl + "/card/" + self.id, {method: "DELETE", headers: myHeaders})
            .then(function (resp) {
                return resp.json();
            })
            .then(function (resp) {
                imBusy(false);
            })
    })
}

Card.prototype = {

    removeCard: function () {
        var self = this;
        imBusy(true);

        fetch(baseUrl + "/card/" + self.id, {method: "DELETE", headers: myHeaders})
            .then(function (resp) {
                return resp.json();
            })
            .then(function (resp) {
                self.element.parentNode.removeChild(self.element);
                imBusy(false);
            })
    },

    updateCard: function () {
        var self = this;
        var newDescription = prompt("Enter new description of the card");

        if (newDescription.length) {
            var data = {"name": newDescription};
            imBusy(true);

            fetch(baseUrl + "/card/" + self.id, {method: "PUT", headers: myHeadersForPUT, body: JSON.stringify(data)})
                .then(function (resp) {
                    return resp.json();
                })
                .then(function (resp) {
                    self.name = newDescription;
                    self.element.querySelector(".card-description").innerText = newDescription;
                    imBusy(false);
                })
        }
    }
};