function Board(id, name) {
    var self = this;
    this.name = name;
    this.id = id;
    this.element = generateTemplate("board-template", {name: this.name, id: this.id});

    this.element.querySelector(".board").addEventListener("click", function (event) {

        if (event.target.classList.contains("create-column")) {
            var name = prompt("Enter the column name");
            var data = new FormData();

            if (name.length) {
                imBusy(true);
                data.append("name", name);

                fetch(baseUrl + "/column", {
                    method: "POST",
                    headers: myHeaders,
                    body: data
                })
                    .then(function (resp) {
                        return resp.json();
                    })
                    .then(function (resp) {
                        var column = new Column(resp.id, name);
                        self.addColumn(column);
                        imBusy(false);
                    })
            }
        }
    });
}

Board.prototype = {

    addColumn: function (column) {
        this.element.querySelector(".column-container").appendChild(column.element);
        initSortable(column.id, "task");
    }
};