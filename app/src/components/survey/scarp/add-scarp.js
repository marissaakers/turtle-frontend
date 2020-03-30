import React from "react";

export class AddScarp extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const scarp = {
            "date": this.dateInput.value,
            "beginning_location": this.beginningLocationInput.value,
            "end_location": this.endLocationInput.value,
            "location": this.locationInput.value,
            "ns": this.northSouthInput.value === "North" ? "N" : "S",
            "height_of_scarp": this.heightOfScarpInput.value,
            "length_of_scarp": this.lengthOfScarpInput.value,
            "placement": this.placementInput.value
        }
        this.props.onAdd(scarp);

        this.dateInput.value = '';
        this.beginningLocationInput.value = '';
        this.endLocationInput.value = '';
        this.locationInput.value = '';
        this.northSouthInput.value = '';
        this.heightOfScarpInput.value = '';
        this.lengthOfScarpInput.value = '';
        this.placementInput.value = '';
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Add Entry</h3>
                <input placeholder="Date" ref={dateInput => this.dateInput = dateInput}/>
                <input placeholder="Beginning Location" ref={beginningLocationInput => this.beginningLocationInput = beginningLocationInput}/>
                <input placeholder="End Location" ref={endLocationInput => this.endLocationInput = endLocationInput}/>
                <input placeholder="Location (UCF km)" ref={locationInput => this.locationInput = locationInput}/>
                <select placeholder="North/South" ref={northSouthInput => this.northSouthInput = northSouthInput}
                        defaultValue="North/South">
                    <option disabled>North/South</option>
                    <option value="Yes">North</option>
                    <option value="No">South</option>
                </select>
                <select placeholder="Height of Scarp" ref={heightOfScarpInput => this.heightOfScarpInput = heightOfScarpInput}
                        defaultValue="Height of Scarp">
                    <option disabled>Height of Scarp</option>
                    <option value="0-2">0-2</option>
                    <option value="2-4">2-4</option>
                    <option value=">4">>4</option>
                </select>
                <input placeholder="Length of Scarp" ref={lengthOfScarpInput => this.lengthOfScarpInput = lengthOfScarpInput}/>
                <select placeholder="Placement" ref={placementInput => this.placementInput = placementInput}
                        defaultValue="Placement">
                    <option disabled>Placement</option>
                    <option value="Dune">Dune</option>
                    <option value="Mid Beach">Mid Beach</option>
                    <option value="High Tide Line">High Tide Line</option>
                </select>
                <button>Add</button>
                <hr />
            </form>
        );
    }
}

export default AddScarp;