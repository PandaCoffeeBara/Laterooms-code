import React, {Component} from 'react';
import Rating from 'react-rating';

export default class Hotel extends Component {
    constructor() {
        super();
        this.state = {starRating: 0, name: '', facilities: [], timesRated: 0}
    }

    componentWillMount() {
        this.setState(this.props.data)
    }

    ratingChangeHandler = (val) => {
        this.setState({rating: val});
    };
    mapFacilities = () => {
        return this.state.facilities.map((facility, idx) => {
            return (<li key={facility}>
                <span className={'sub-description'} key={idx}>
                {facility}
            </span>
            </li>)
        })
    };

    render() {
        let facilities = this.mapFacilities();
        return (<li className={"hotel-card card"}>
            <div>
                <h3 className={'label'}>Name:</h3>
                <span>{this.state.name}</span>
            </div>
            <div>
                <h3 className={'label'}>Rating:</h3>
                <Rating
                    className={'label'}
                    start={0}
                    stop={5}
                    step={1}
                    onClick={this.ratingChangeHandler}
                    initialRating={this.state.starRating}
                />
            </div>
            <div>
                <h3 className={'label'}>Facilities:</h3>
                <ul>{facilities}</ul>
            </div>
        </li>)
    }
}
