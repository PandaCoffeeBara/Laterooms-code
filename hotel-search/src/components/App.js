import React, {Component} from 'react';
import '../css/App.css';
import SearchBox from './SearchBox';
import HotelStore from '../stores/hotel-store';
import HotelActions from '../actions/store-actions';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import Hotel from './Hotel';
import _ from 'lodash'

;class App extends Component {
    constructor() {
        super();
        this.state = {
            data: HotelStore.getAllHotels(),
            facilities:HotelStore.getFacilities()
        }
    }

    onChangeHandler = (hotelArray) => {
        this.setState({data: hotelArray});
    };

    componentWillMount() {
        HotelStore.addChangeListener(this.onChangeHandler)
    }

    componentWillUnmount() {
        HotelStore.removeChangeListener(this.onChangeHandler)
    }

    mapHotels = () => {
        console.log(this.state)
        return this.state.data.map((hotel, idx) => {
            return <Hotel key={hotel.name} data={hotel}></Hotel>
        })
    };
    mapFacilityCheckBoxes = ()=>{

        return this.state.facilities.map((facility)=>{
            return (
                <label key={facility}>
                    <Checkbox value={facility} ></Checkbox>
                    {facility}
                </label>
            )
        })
    };
    sortByNameHandler = () => {
        HotelActions.sortByName();
    };
    sortByRatingHandler = () => {
        HotelActions.sortByRating();
    };
    groupChangedHandler = (newValueArray)=> {
        HotelActions.filterByFacilities(newValueArray);
    };
    render() {
        let hotels = this.mapHotels();
        let checkboxes = this.mapFacilityCheckBoxes();
        let searchBox = this.state != null ? <SearchBox data={this.state.data}/> : null;
        return (
            <div >
                <div className="filters-bar">
                    <div>
                        <div className="abs-right">
                            <button onClick={this.sortByNameHandler} className="button-toggle">
                                <i className="fa fa-fw fa-arrow-circle-up"></i>Name
                            </button>
                            <button onClick={this.sortByRatingHandler}className="button-toggle">
                                <i className="fa fa-fw fa-random"></i>Rating
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hotel-container">
                    {searchBox}
                    <CheckboxGroup checkboxDepth={2} name="facilities" onChange={this.groupChangedHandler}>
                        {checkboxes}
                    </CheckboxGroup>
                    {hotels}
                </div>

            </div>
        );
    }
}

export default App;
