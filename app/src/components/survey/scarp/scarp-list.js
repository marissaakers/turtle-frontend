import React from "react";
import axios from "axios";
import AddScarp from "./add-scarp";
import ScarpItem from "./scarp-item";

const BASE_URL = 'https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/survey/scarp';

export class ScarpList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            scarps: []
        }
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        const scarps = await this.getScarps();
        this.setState({ scarps: scarps.data });
        this.setState( { isLoading: false });
    }

    async getScarps() {
        return axios.get(BASE_URL);
    }

    async onDelete(scarp_id) {
        const url = BASE_URL + '/' + scarp_id;
        await axios.delete(url);
        const scarps = await this.getScarps();
        this.setState({ scarps: scarps.data });
    }

    async onAdd(scarp) {
        await axios.post(BASE_URL, JSON.stringify(scarp));
        const scarps = await this.getScarps();
        this.setState({ scarps: scarps.data });
    }

    async onEditSubmit(scarp) {
        const url = BASE_URL;
        await axios.put(url, JSON.stringify(scarp));
        const scarps = await this.getScarps();
        this.setState({ scarps: scarps.data });
    }

    render() {
        if (this.state.isLoading) return (
            <div>
            <h2>Loading...</h2>
        </div>
        );
        else if (!this.state.scarps) return (
            <div className="scarp-list">
                <AddScarp
                    onAdd={this.onAdd}
                />
            </div>
        );
        else return (
            <div className="scarp-list">
                <h1>Scarps</h1>
                <AddScarp
                    onAdd={this.onAdd}
                />

                <div>
                    <span>Date</span>
                    <span>Beginning Location</span>
                    <span>End Location</span>
                    <span>Location</span>
                    <span>North/South</span>
                    <span>Height of Scarp</span>
                    <span>Length of Scarp</span>
                    <span>Placement</span>
                </div>

                {
                    this.state.scarps.map(entry => {
                        return (
                            <ScarpItem
                                key={entry.scarp_id}
                                {...entry}
                                onDelete={this.onDelete}
                                onEditSubmit={this.onEditSubmit}
                            />
                        );
                    })
                }
            </div>
        );
    }
}
