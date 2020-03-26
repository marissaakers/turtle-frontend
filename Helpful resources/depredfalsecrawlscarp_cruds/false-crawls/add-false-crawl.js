import React from "react";

export class AddFalseCrawl extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const falseCrawl = {
            "date": this.dateInput.value,
            "species": this.speciesInput.value,
            "project_area": this.projectAreaInput.value === "Yes" ? true : false,
            "hit_scarp_over_18": this.hitScarpOver18Input.value === "Yes" ? true : false,
            "type": this.typeInput.value,
            "distance_to_dune": this.distToDuneInput.value,
            "distance_to_high_tide": this.distToHighTideInput.value,
            "location": this.locationInput.value,
            "latitude": this.latitudeInput.value,
            "longitude": this.longitudeInput.value
        }
        this.props.onAdd(falseCrawl);

        this.dateInput.value = '';
        this.speciesInput.value = '';
        this.projectAreaInput.value = '';
        this.hitScarpOver18Input.value = '';
        this.typeInput.value = '';
        this.distToDuneInput.value = '';
        this.distToHighTideInput.value = '';
        this.locationInput.value = '';
        this.latitudeInput.value = '';
        this.longitudeInput.value = '';
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Add Entry</h3>
                <input placeholder="Date" ref={dateInput => this.dateInput = dateInput}/>
                <input placeholder="Species" ref={speciesInput => this.speciesInput = speciesInput}/>
                <select placeholder="Project Area?" ref={projectAreaInput => this.projectAreaInput = projectAreaInput}
                        defaultValue="Project area?">
                    <option disabled>Project area?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <select placeholder="Hit Scarp over 18?" ref={hitScarpOver18Input => this.hitScarpOver18Input = hitScarpOver18Input}
                        defaultValue="Hit scarp over 18?">
                    <option disabled>Hit scarp over 18?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>    
                </select>
                <input placeholder="Type" ref={typeInput => this.typeInput = typeInput}/>
                <input placeholder="Distance to Dune" ref={distToDuneInput => this.distToDuneInput = distToDuneInput}/>
                <input placeholder="Distance to High Tide" ref={distToHighTideInput => this.distToHighTideInput = distToHighTideInput}/>
                <input placeholder="Location" ref={locationInput => this.locationInput = locationInput}/>
                <input placeholder="Latitude" ref={latitudeInput => this.latitudeInput = latitudeInput}/>
                <input placeholder="Longitude" ref={longitudeInput => this.longitudeInput = longitudeInput}/>
                <button>Add</button>
                <hr />
            </form>
        );
    }
}

export default AddFalseCrawl;