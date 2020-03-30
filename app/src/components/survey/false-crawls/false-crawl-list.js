import React from "react";
import axios from "axios";
import AddFalseCrawl from "./add-false-crawl";
import FalseCrawlItem from "./false-crawl-item";

const BASE_URL = 'https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/survey/falsecrawl';

export class FalseCrawlList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            falseCrawls: []
        }
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        const falseCrawls = await this.getFalseCrawls();
        this.setState({ falseCrawls: falseCrawls.data });
        this.setState( { isLoading: false });
    }

    async getFalseCrawls() {
        return axios.get(BASE_URL);
    }

    async onDelete(false_crawl_id) {
        const url = BASE_URL + '/' + false_crawl_id;
        await axios.delete(url);
        const falseCrawls = await this.getFalseCrawls();
        this.setState({ falseCrawls: falseCrawls.data });
    }

    async onAdd(falseCrawl) {
        await axios.post(BASE_URL, JSON.stringify(falseCrawl));
        const falseCrawls = await this.getFalseCrawls();
        this.setState({ falseCrawls: falseCrawls.data });
    }

    async onEditSubmit(falseCrawl) {
        const url = BASE_URL;
        await axios.put(url, JSON.stringify(falseCrawl));
        const falseCrawls = await this.getFalseCrawls();
        this.setState({ falseCrawls: falseCrawls.data });
    }

    render() {
        if (this.state.isLoading) return (
            <div>
            <h2>Loading...</h2>
        </div>
        );
        else if (!this.state.falseCrawls) return (
            <div className="false-crawl-list">
                <AddFalseCrawl
                    onAdd={this.onAdd}
                />
            </div>
        );
        else return (
            <div className="false-crawl-list">
                <h1>False Crawls</h1>
                <AddFalseCrawl
                    onAdd={this.onAdd}
                />

                <div>
                    <span>Date</span>
                    <span>Species</span>
                    <span>Project Area</span>
                    <span>Hit Scarp Over 18?</span>
                    <span>Type</span>
                    <span>Distance to Dune</span>
                    <span>Distance to High Tide</span>
                    <span>Location</span>
                    <span>Latitude</span>
                    <span>Longitude</span>
                </div>

                {
                    this.state.falseCrawls.map(entry => {
                        return (
                            <FalseCrawlItem
                                key={entry.false_crawl_id}
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
