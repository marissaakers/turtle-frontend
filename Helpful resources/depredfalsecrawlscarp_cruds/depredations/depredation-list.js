import React from "react";
import axios from "axios";
import AddDepredation from "./add-depredation";
import DepredationItem from "./depredation-item";

const BASE_URL = 'https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/survey/depredation';

export class DepredationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            depredations: []
        }
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        const depredations = await this.getDepredations();
        this.setState({ depredations: depredations.data });
        this.setState( { isLoading: false });
    }

    async getDepredations() {
        return axios.get(BASE_URL);
    }

    async onDelete(depredation_id) {
        const url = BASE_URL + '/' + depredation_id;
        await axios.delete(url);
        const depredations = await this.getDepredations();
        this.setState({ depredations: depredations.data });
    }

    async onAdd(depredation) {
        await axios.post(BASE_URL, JSON.stringify(depredation));
        const depredations = await this.getDepredations();
        this.setState({ depredations: depredations.data });
    }

    async onEditSubmit(depredation) {
        const url = BASE_URL;
        await axios.put(url, JSON.stringify(depredation));
        const depredations = await this.getDepredations();
        this.setState({ depredations: depredations.data });
    }

    render() {
        if (this.state.isLoading) return (
            <div>
            <h2>Loading...</h2>
        </div>
        );
        else if (!this.state.depredations) return (
            <div className="depredation-list">
                <AddDepredation
                    onAdd={this.onAdd}
                />
            </div>
        );
        else return (
            <div className="depredation-list">
                <h1>Depredations</h1>
                <AddDepredation
                    onAdd={this.onAdd}
                />

                <div>
                    <span>Date</span>
                    <span>Species</span>
                    <span>Location</span>
                    <span>North/South</span>
                    <span>Predator</span>
                    <span>Eggs Destroyed</span>
                    <span>Marked Nest Number</span>
                    <span>Notes</span>
                </div>

                {
                    this.state.depredations.map(entry => {
                        return (
                            <DepredationItem
                                key={entry.depredation_id}
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
};
