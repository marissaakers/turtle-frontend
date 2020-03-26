import React from "react";

export class AddDepredation extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const depredation = {
            "date": this.dateInput.value,
            "species": this.speciesInput.value,
            "location": this.locationInput.value,
            "ns": this.northSouthInput.value === "North" ? "N" : "S",
            "predator": this.predatorInput.value,
            "eggs_destroyed": this.eggsDestroyedInput.value,
            "marked_nest_number": this.markedNestNumberInput.value,
            "notes": this.notesInput.value
        }
        this.props.onAdd(depredation);

        this.dateInput.value = '';
        this.speciesInput.value = '';
        this.locationInput.value = '';
        this.northSouthInput.value = '';
        this.predatorInput.value = '';
        this.eggsDestroyedInput.value = '';
        this.markedNestNumberInput.value = '';
        this.notesInput.value = '';
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Add Entry</h3>
                <input placeholder="Date" ref={dateInput => this.dateInput = dateInput}/>
                <input placeholder="Species" ref={speciesInput => this.speciesInput = speciesInput}/>
                <input placeholder="Location" ref={locationInput => this.locationInput = locationInput}/>
                <select placeholder="North/South" ref={northSouthInput => this.northSouthInput = northSouthInput}
                        defaultValue="North/South">
                    <option disabled>North/South</option>
                    <option value="Yes">North</option>
                    <option value="No">South</option>
                </select>
                <input placeholder="Predator" ref={predatorInput => this.predatorInput = predatorInput}/>
                <input placeholder="Eggs Destroyed" ref={eggsDestroyedInput => this.eggsDestroyedInput = eggsDestroyedInput}/>
                <input placeholder="Marked Nest Number" ref={markedNestNumberInput => this.markedNestNumberInput = markedNestNumberInput}/>
                <textarea placeholder="Notes" ref={notesInput => this.notesInput = notesInput}/>
                <button>Add</button>
                <hr />
            </form>
        );
    }
}

export default AddDepredation;