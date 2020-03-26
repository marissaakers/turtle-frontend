import React from "react";

export class ScarpItem extends React.Component {
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
        const { onDelete, scarp_id } = this.props;

        onDelete(scarp_id);
    }

    onEdit() {
        this.setState({ editMode: true });
    }

    onEditSubmit(event) {
        event.preventDefault();
        const scarp = {
            "scarp_id": this.idInput.value,
            "date": this.dateInput.value,
            "beginning_location": this.beginningLocationInput.value,
            "end_location": this.endLocationInput.value,
            "location": this.locationInput.value,
            "ns": this.northSouthInput.value === "North" ? "N" : "S",
            "height_of_scarp": this.heightOfScarpInput.value,
            "length_of_scarp": this.lengthOfScarpInput.value,
            "placement": this.placementInput.value
        }
        this.props.onEditSubmit(scarp);
        this.setState({ editMode: false });
    }

    onCancel() {
        this.setState({ editMode: false });
    }

    render() {
        const { scarp_id,
                date,
                beginning_location,
                end_location,
                location,
                ns,
                height_of_scarp,
                length_of_scarp,
                placement } = this.props;

        return (
            <div>
                {
                    this.state.editMode
                    ? (
                        <form onSubmit={this.onEditSubmit}>
                            <input type="hidden" ref={idInput => this.idInput = idInput}
                                defaultValue={scarp_id} />
                            <input placeholder="Date" ref={dateInput => this.dateInput = dateInput}
                                defaultValue={date} />
                            <input placeholder="Beginning Location" ref={beginningLocationInput => this.beginningLocationInput = beginningLocationInput}
                                defaultValue={beginning_location} />
                            <input placeholder="End Location" ref={endLocationInput => this.endLocationInput = endLocationInput}
                                defaultValue={end_location} />
                            <input placeholder="Location (UCF km)" ref={locationInput => this.locationInput = locationInput}
                                defaultValue={location} />
                            <select placeholder="North/South" ref={northSouthInput => this.northSouthInput = northSouthInput}
                                    defaultValue={ns === "N" ? "N" : "S"}>
                                <option disabled>North/South</option>
                                <option value="N">North</option>
                                <option value="S">South</option>    
                            </select>
                            <select placeholder="Height of Scarp" ref={heightOfScarpInput => this.heightOfScarpInput = heightOfScarpInput}
                                    defaultValue={height_of_scarp}>
                                <option disabled>Height of Scarp</option>
                                <option value="0-2">0-2</option>
                                <option value="2-4">2-4</option>
                                <option value=">4">>4</option>
                            </select>
                            <input placeholder="Length of Scarp" ref={lengthOfScarpInput => this.lengthOfScarpInput = lengthOfScarpInput}
                                defaultValue={length_of_scarp} />
                            <select placeholder="Placement" ref={placementInput => this.placementInput = placementInput}
                                    defaultValue={placement}>
                                <option disabled>Placement</option>
                                <option value="Dune">Dune</option>
                                <option value="Mid Beach">Mid Beach</option>
                                <option value="High Tide Line">High Tide Line</option>
                            </select>
                            <button>Save</button>
                            <button type="button" onClick={this.onCancel}>Cancel</button>
                        </form>
                    )
                    : (
                        <div>
                            <span>{date}</span>
                            {` | `}
                            <span>{beginning_location}</span>
                            {` | `}
                            <span>{end_location}</span>
                            {` | `}
                            <span>{location}</span>
                            {` | `}
                            <span>{ns}</span>
                            {` | `}
                            <span>{height_of_scarp}</span>
                            {` | `}
                            <span>{length_of_scarp}</span>
                            {` | `}
                            <span>{placement}</span>
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

export default ScarpItem;