import React from "react";
import axios from "axios";
import TrackingEntryItem from "./tracking-entry-item";
import AddTrackingEntry from "./add-tracking-entry";

const BASE_URL = 'https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/capture/sample';

export class TrackingEntryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            entries: [],
            sample_id: this.props.sample_id
        }
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        const sample = await this.getSample();
        const entries = sample.data.tracking_entries;
        const sample_id = sample.data.sample_id
        this.setState({ entries, sample_id });
        this.setState( { isLoading: false });
    }

    async getSample() {
        return axios.get(BASE_URL + "/" + this.state.sample_id);
    }

    async onDelete(sample_tracking_id) {
        const url = BASE_URL + '/tracking/' + sample_tracking_id;
        await axios.delete(url);
        const sample = await this.getSample();
        this.setState({ entries: sample.data.tracking_entries });
    }

    async onAdd(date, notes) {
        const newEntry = {
            sample_id: this.state.sample_id,
            date: date,
            notes: notes
        }
        const url = BASE_URL + '/tracking';
        await axios.post(url, JSON.stringify(newEntry));
        const sample = await this.getSample();
        this.setState({ entries: sample.data.tracking_entries });
    }

    async onEditSubmit(sample_tracking_id, date, notes) {
        const updatedEntry = {
            date: date,
            notes:notes
        }
        const url = BASE_URL + '/tracking/' + sample_tracking_id;
        await axios.put(url, updatedEntry);
        const sample = await this.getSample();
        this.setState({ entries: sample.data.tracking_entries });
    }

    render() {
        if (this.state.isLoading) return (
            <div>
            <h2>Loading...</h2>
        </div>
        );
        else if (!this.state.entries) return (
            <div className="tracking-list">
                <AddTrackingEntry
                    onAdd={this.onAdd}
                />
            </div>
        );
        else return (
            <div className="tracking-list">
                <h1>Entries</h1>
                <AddTrackingEntry
                    onAdd={this.onAdd}
                />

                {
                    this.state.entries.map(entry => {
                        return (
                            <TrackingEntryItem
                                key={entry.sample_tracking_id}
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

export default TrackingEntryList;
