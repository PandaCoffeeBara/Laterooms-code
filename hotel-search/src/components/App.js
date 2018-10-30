import React, {Component} from 'react';
import logo from '../assets/logo.svg';
import '../css/App.css';
import HotelData from '../hotel-data'
import SearchBox from './SearchBox';
import Hotel from './Hotel';


class App extends Component {
    constructor() {
        super();

    }

    mapHotels = () => {
        return HotelData.map((hotel,idx) => {
            return <Hotel key={idx} data={hotel}></Hotel>
        })
    };
    searchChangeHandler =(val) =>{
        val ? console.log(val.name) : console.log('reverted')
    };
    render() {
        let hotels = this.mapHotels();
        return (
            <div className="instantSearch">
                <div className="filters-bar">
                    <FilterBar></FilterBar>
                </div>
                <div>
                    <SearchBox data={HotelData} />
                    {hotels}
                </div>

            </div>
        );
    }
}

export default App;
