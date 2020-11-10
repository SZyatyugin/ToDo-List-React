import React from "react";
import ToDoListItem from "../todo-list-item";
import "./todo-list.css";

let ToDoList = ({ todos, onDeleted, onToggleDone, onToggleImportant }) => {
    let elems = todos.map((item) => {
        let { id, ...itemProps } = item;
        return (
            <li key={id} className="list-group-item">
                <ToDoListItem
                    {...itemProps}
                    onDeleted={() => onDeleted(id)}
                    onToggleDone={() => {
                        onToggleDone(id);
                    }}
                    onToggleImportant={() => {
                        onToggleImportant(id);
                    }}
                />
            </li>
        );
    });
    return <ul className="list-group todo-list">{elems}</ul>;
};
export default ToDoList;
