import React from "react";

export class DepredationItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false
        }

        this.onCancel = this.onCancel.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        const { onDelete, depredation_id } = this.props;

        onDelete(depredation_id);
    }

    onEdit() {
        this.setState({ editMode: true });
    }

    onEditSubmit(event) {
        event.preventDefault();
        const depredation = {
            "depredation_id": this.idInput.value,
            "date": this.dateInput.value,
            "species": this.speciesInput.value,
            "location": this.locationInput.value,
            "ns": this.northSouthInput.value === "North" ? "N" : "S",
            "predator": this.predatorInput.value,
            "eggs_destroyed": this.eggsDestroyedInput.value,
            "marked_nest_number": this.markedNestNumberInput.value,
            "notes": this.notesInput.value
        }
        this.props.onEditSubmit(depredation);
        this.setState({ editMode: false });
    }

    onCancel() {
        this.setState({ editMode: false });
    }

    render() {
        const { depredation_id,
                date,
                species,
                location,
                ns,
                predator,
                eggs_destroyed,
                marked_nest_number,
                notes } = this.props;

        return (
            <div>
                {
                    this.state.editMode
                    ? (
                        <form onSubmit={this.onEditSubmit}>
                            <input type="hidden" ref={idInput => this.idInput = idInput}
                                defaultValue={depredation_id} />
                            <input placeholder="Date" ref={dateInput => this.dateInput = dateInput}
                                defaultValue={date} />
                            <input placeholder="Species" ref={speciesInput => this.speciesInput = speciesInput}
                                defaultValue={species} />
                            <input placeholder="Location" ref={locationInput => this.locationInput = locationInput}
                                defaultValue={location} />
                            <select placeholder="North/South" ref={northSouthInput => this.northSouthInput = northSouthInput}
                                defaultValue={ns === "N" ? "N" : "S"}>
                                <option disabled>North/South</option>
                                <option value="N">North</option>
                                <option value="S">South</option>    
                            </select>
                            <input placeholder="Predator" ref={predatorInput => this.predatorInput = predatorInput}
                                defaultValue={predator} />
                            <input placeholder="Eggs Destroyed" ref={eggsDestroyedInput => this.eggsDestroyedInput = eggsDestroyedInput}
                                defaultValue={eggs_destroyed} />
                            <input placeholder="Marked Nest Number" ref={markedNestNumberInput => this.markedNestNumberInput = markedNestNumberInput}
                                defaultValue={marked_nest_number} />
                            <input placeholder="Notes" ref={notesInput => this.notesInput = notesInput}
                                defaultValue={notes} />
                            <button>Save</button>
                            <button type="button" onClick={this.onCancel}>Cancel</button>
                        </form>
                    )
                    : (
                        <div>
                            <span>{date}</span>
                            {` | `}
                            <span>{species}</span>
                            {` | `}
                            <span>{location}</span>
                            {` | `}
                            <span>{ns}</span>
                            {` | `}
                            <span>{predator}</span>
                            {` | `}
                            <span>{eggs_destroyed}</span>
                            {` | `}
                            <span>{marked_nest_number}</span>
                            {` | `}
                            <span>{notes}</span>
                            {` | `}
                            <button onClick={this.onEdit}>Edit</button>
                            <button onClick={this.onDelete}>Delete</button>
                        </div>
                    )
                }

            </div>
        );
    }
}

export default DepredationItem;