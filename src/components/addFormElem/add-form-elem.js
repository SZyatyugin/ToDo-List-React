import React from "react";
import "./add-form-elem.css";

export default class AddFormElem extends React.Component {
    constructor() {
        super();
        this.state = {
            label: ""
        };
    }

    getElemsToDo = (e) => {
        this.setState(({ label }) => {
            return { label: e.target.value };
        });
    };
    saveElemsToDo = (e) => {
        e.preventDefault();
        if (document.querySelector(".form-control").value === "") {
            e.preventDefault();
            return;
        }
        this.props.addElem(this.state.label);
        this.setState(({ label }) => {
            return { label: "" };
        });
    };

    render() {
        return (
            <form className="item-add-form" onSubmit={this.saveElemsToDo}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="What need to be done?"
                    onChange={this.getElemsToDo}
                    value={this.state.label}
                ></input>
                <button className="btn btn-outline-secondary">Add Item</button>
            </form>
        );
    }
}
