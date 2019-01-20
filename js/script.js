"use strict";
(function () {
    document.addEventListener("DOMContentLoaded", function () {

        function randomString() {
            var chars = "0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";
            var string = "";

            for (var i = 0; i < 10; i++) {
                string += chars[Math.floor(Math.random() * chars.length)];
            }
            return string;
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

        function Board(name) {
            var self = this;
            this.name = name;
            this.id = randomString();
            this.element = generateTemplate("board-template", {name: this.name, id: this.id});

            this.element.querySelector(".board").addEventListener("click", function (event) {

                if (event.target.classList.contains("create-column")) {
                    self.addColumn(new Column(prompt("Enter the column name")));
                }
            });
        }

        Board.prototype = {

            addColumn: function (column) {
                this.element.querySelector(".column-container").appendChild(column.element);
                initSortable(column.id, "task");
            }
        };

        function Column(name) {
            var self = this;
            this.name = name;
            this.id = randomString();
            this.element = generateTemplate("column-template", {name: this.name, id: this.id});

            this.element.querySelector(".column").addEventListener("click", function (event) {

                if (event.target.classList.contains("btn-delete")) {
                    self.removeColumn();
                }

                if (event.target.classList.contains("add-card")) {
                    self.addCard(new Card(prompt("Enter the name of the card")));
                }
            });
        }

        Column.prototype = {

            removeColumn: function () {
                this.element.parentNode.removeChild(this.element);
            },

            addCard: function (card) {
                this.element.querySelector("ul").appendChild(card.element);
            }
        };

        function Card(description) {
            var self = this;
            this.id = randomString();
            this.description = description;
            this.element = generateTemplate("card-template", {description: this.description}, "li");

            this.element.querySelector(".card").addEventListener("click", function (event) {
                event.stopPropagation();

                if (event.target.classList.contains("btn-delete")) {
                    self.removeCard();
                }
            });
        }

        Card.prototype = {

            removeCard: function () {
                this.element.parentNode.removeChild(this.element);
            }
        };

        function showExample() {
            var firstBoard = new Board("Bootcamp");
            var secondBoard = new Board("Second board");
            var toDoColumn = new Column("To do");
            var inProgressColumn = new Column("In progress");
            var doneColumn = new Column("Done");
            var first = new Column("First");
            var second = new Column("Second");
            var third = new Column("Third");
            var fourth = new Column("Fourth");
            var fifth = new Column("Fifth");
            var sixth = new Column("Sixth");

            document.querySelector(".insert").appendChild(firstBoard.element);
            document.querySelector(".insert").appendChild(secondBoard.element);
            initSortable(firstBoard.id, "column");
            initSortable(secondBoard.id, "column");
            firstBoard.addColumn(toDoColumn);
            firstBoard.addColumn(inProgressColumn);
            firstBoard.addColumn(doneColumn);
            secondBoard.addColumn(first);
            secondBoard.addColumn(second);
            secondBoard.addColumn(third);
            secondBoard.addColumn(fourth);
            secondBoard.addColumn(fifth);
            secondBoard.addColumn(sixth);
            doneColumn.addCard(new Card("Tasks 14"));
            doneColumn.addCard(new Card("Task 15.4"));
            doneColumn.addCard(new Card("Task 15.5"));
            inProgressColumn.addCard(new Card("Task 15.6"));
            toDoColumn.addCard(new Card("Tasks from 16 module"));
            toDoColumn.addCard(new Card("Tasks from 17 module"));
            toDoColumn.addCard(new Card("Tasks from 18 module"));
            toDoColumn.addCard(new Card("Tasks from 19 module"));
            toDoColumn.addCard(new Card("Tasks from 20 module"));
            toDoColumn.addCard(new Card("Tasks from 21 module and more and more ..."));

            for (var i = 1; i < 6; i++) {
                first.addCard(new Card("Example" + i + " from first column"));
                second.addCard(new Card("Example" + i + " from second column"));
                third.addCard(new Card("Example" + i + " from third column"));
                fourth.addCard(new Card("Example" + i + " from fourth column"));
                fifth.addCard(new Card("Example" + i + " from fifth column"));
                sixth.addCard(new Card("Example" + i + " from sixth column"));
            }
        }

        document.querySelector(".add-board").addEventListener("click", function () {
            var newBoard = new Board(prompt("Enter the name of board"));
            document.querySelector(".insert").appendChild(newBoard.element);
            initSortable(newBoard.id, "column");
        });

        showExample();
    })
})();