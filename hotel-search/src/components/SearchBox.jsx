import React, {Component} from 'react';
import SearchBox from 'react-search-box';
import HotelActions from '../actions/store-actions';
import Hotel from "./Hotel";

export default class Search extends Component {
    constructor() {
        super();
        this.state = {data: []}
    }

    componentWillMount() {
        this.setState({data:this.props.data})
    }

    handleChange = (selection) => {
        console.log(selection)
        HotelActions.getHotel(selection);
    };
    render() {
        console.log(this.state);
        return (<div>
            <SearchBox
                data={this.state.data}
                searchKey='name'
                onChange={this.handleChange}
                placeholder={'Search for hotel'}
                class={'search-class'}
            />

        </div>)
    }
}
