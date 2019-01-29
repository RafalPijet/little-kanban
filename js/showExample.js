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