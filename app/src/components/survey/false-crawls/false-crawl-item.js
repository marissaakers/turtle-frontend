import React from "react";

export class FalseCrawlItem extends React.Component {
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
        const { onDelete, false_crawl_id } = this.props;

        onDelete(false_crawl_id);
    }

    onEdit() {
        this.setState({ editMode: true });
    }

    onEditSubmit(event) {
        event.preventDefault();
        const falseCrawl = {
            "false_crawl_id": this.idInput.value,
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
        this.props.onEditSubmit(falseCrawl);
        this.setState({ editMode: false });
    }

    onCancel() {
        this.setState({ editMode: false });
    }

    render() {
        const { false_crawl_id,
                date,
                species,
                project_area,
                hit_scarp_over_18,
                type,
                distance_to_dune,
                distance_to_high_tide,
                location,
                latitude,
                longitude } = this.props;

        return (
            <div>
                {
                    this.state.editMode
                    ? (
                        <form onSubmit={this.onEditSubmit}>
                            <input type="hidden" ref={idInput => this.idInput = idInput}
                                defaultValue={false_crawl_id} />
                            <input placeholder="Date" ref={dateInput => this.dateInput = dateInput}
                                defaultValue={date} />
                            <input placeholder="Species" ref={speciesInput => this.speciesInput = speciesInput}
                                defaultValue={species} />
                            <select placeholder="Project Area?" ref={projectAreaInput => this.projectAreaInput = projectAreaInput}
                                    defaultValue={project_area == true ? "Yes" : "No"}>
                                <option disabled>Project area?</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <select placeholder="Hit Scarp over 18?" ref={hitScarpOver18Input => this.hitScarpOver18Input = hitScarpOver18Input}
                                defaultValue={hit_scarp_over_18 === true ? "Yes" : "No"}>
                                <option disabled>Hit scarp over 18?</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>    
                            </select>
                            <input placeholder="Type" ref={typeInput => this.typeInput = typeInput}
                                defaultValue={type} />
                            <input placeholder="Distance to Dune" ref={distToDuneInput => this.distToDuneInput = distToDuneInput}
                                defaultValue={distance_to_dune} />
                            <input placeholder="Distance to High Tide" ref={distToHighTideInput => this.distToHighTideInput = distToHighTideInput}
                                defaultValue={distance_to_high_tide} />
                            <input placeholder="Location" ref={locationInput => this.locationInput = locationInput}
                                defaultValue={location} />
                            <input placeholder="Latitude" ref={latitudeInput => this.latitudeInput = latitudeInput}
                                defaultValue={latitude} />
                            <input placeholder="Longitude" ref={longitudeInput => this.longitudeInput = longitudeInput}
                                defaultValue={longitude} />

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
                            <span>{project_area}</span>
                            {` | `}
                            <span>{hit_scarp_over_18 ? "Yes" : "No"}</span>
                            {` | `}
                            <span>{type}</span>
                            {` | `}
                            <span>distance_to_dune</span>
                            {` | `}
                            <span>distance_to_high_tide</span>
                            {` | `}
                            <span>{location}</span>
                            {` | `}
                            <span>{latitude}</span>
                            {` | `}
                            <span>{longitude}</span>
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

export default FalseCrawlItem;