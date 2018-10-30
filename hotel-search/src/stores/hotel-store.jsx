import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/action-constants';
import hotelData from '../hotel-data';
import _ from 'lodash';

const CHANGE = 'CHANGE';
let hotelStoreState = [];
let facilities =[];
let orderState = {name:true,starRating:false};
//If i wanted to put more time into to it I would have put in combined sorting

let sortByName = () => {
    orderState.name = !orderState.name;
    console.log(orderState);
    hotelStoreState = _.orderBy(hotelStoreState,["name"],[orderState.name ?'asc':'desc'])
};
let sortByRating = () => {
    orderState.starRating = !orderState.starRating;
    hotelStoreState = _.orderBy(hotelStoreState, ['starRating'],[orderState.starRating ?'asc':'desc']);
};
let filterByFacilities = (facilities) => {
    if (facilities === undefined || facilities.length == 0) {
        return hotelData;
    }
    let filtered = hotelStoreState.filter((hotel)=>{
        let t = _.intersection(hotel.facilities,facilities);
        console.log(t.length)
        return t.length >0;

    });
    hotelStoreState = filtered;
};
let initializeFacilities = () =>{
    hotelData.map((hotel)=>{
        facilities = _.uniq(_.union(hotel.facilities,facilities));
    });

};

class HotelStore extends EventEmitter {
    constructor() {
        super();
        hotelStoreState = hotelData;
        initializeFacilities();
        Dispatcher.register(this.registerToActions)
    }

    registerToActions = (actions) => {
        console.log('Action', actions)
        switch (actions.actionType) {
            case Constants.STORE_CONSTANTS.SORT_BY_RATING:
                sortByRating();
                console.log("sort by rating", hotelStoreState)
                this.emit('CHANGE', hotelStoreState);
                break;
            case Constants.STORE_CONSTANTS.SORT_BY_NAME:
                sortByName();
                console.log("sort by rating", hotelStoreState)
                this.emit('CHANGE', hotelStoreState);
                break;
            case Constants.STORE_CONSTANTS.FILTER_BY_FACILITIES:
                filterByFacilities(actions.payload);
                this.emit('CHANGE', hotelStoreState);
                break;
            case Constants.STORE_CONSTANTS.GET_HOTEL:
                let hotel = _.find(hotelData,actions.payload);
                console.log(hotel)
                this.emit('CHANGE',[hotel]);
                break;

        }
    };

    addChangeListener(cb) {
        this.on(CHANGE, cb);
    }

    removeChangeListener(cb) {
        this.removeListener(CHANGE, cb);
    }

    getAllHotels() {
        return hotelStoreState;
    }
    getFacilities(){
        return facilities;
    }
}

export default new HotelStore();
