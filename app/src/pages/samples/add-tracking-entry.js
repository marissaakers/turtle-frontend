import React from "react";

export class AddTrackingEntry extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onAdd(this.dateInput.value, this.notesInput.value);

        this.dateInput.value = '';
        this.notesInput.value = '';
    }

    render() {

        return (
            <form onSubmit={this.onSubmit}>
                <h3>Add Entry</h3>
                <input placeholder="Date" ref={dateInput => this.dateInput = dateInput}/>
                <input placeholder="Notes" ref={notesInput => this.notesInput = notesInput}/>
                <button>Add</button>
                <hr />
            </form>
        );
    }
}

export default AddTrackingEntry;