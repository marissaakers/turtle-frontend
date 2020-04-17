import React from "react";

export class TrackingEntryItem extends React.Component {
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
        const { onDelete, sample_tracking_id } = this.props;

        onDelete(sample_tracking_id);
    }

    onEdit() {
        this.setState({ editMode: true });
    }

    onEditSubmit(event) {
        event.preventDefault();
        this.props.onEditSubmit(this.idInput.value, this.dateInput.value,
            this.notesInput.value);
        this.setState({ editMode: false });
    }

    onCancel() {
        this.setState({ editMode: false });
    }

    render() {
        const { sample_tracking_id, date, notes } = this.props;

        return (
            <div>
                {
                    this.state.editMode
                    ? (
                        <form onSubmit={this.onEditSubmit}>
                            <input type="hidden" ref={idInput => this.idInput = idInput}
                                defaultValue={sample_tracking_id} />
                            <input placeholder="Date" ref={dateInput => this.dateInput = dateInput}
                                defaultValue={date} />
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

export default TrackingEntryItem;