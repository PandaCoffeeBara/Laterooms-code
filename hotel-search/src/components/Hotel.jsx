import React, {Component} from 'react';
import Rating from 'react-rating';

export default class Hotel extends Component {
    constructor() {
        super();
        this.state = {starRating: 0, name: '', facilities: [], timesRated:0}
    }

    componentWillMount() {
        this.setState(this.props.data)
    }

    ratingChangeHandler = (val) => {
        this.setState({rating:val});
    };
    mapFacilities =()=>{
       return this.state.facilities.map((facility,idx)=>{
            return (<div key={idx}>
                {facility}
            </div>)
        })
    };
    render() {
        let facilities = this.mapFacilities();
        return (<div>
            <div>Name:{this.state.name}</div>
            <Rating
                start={0}
                stop={5}
                step={1}
                onClick={this.ratingChangeHandler}
                initialRating={this.state.starRating}
            />
            {facilities}
        </div>)
    }
}
