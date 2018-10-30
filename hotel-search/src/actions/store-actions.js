
import Constants from '../constants/action-constants';
import Dispatcher from '../dispatcher/dispatcher';
 class HotelStoreActions {
    addHotel(item){
        console.log('new item added')
    }
    removeHotel(item){

    }
    sortByRating(){
        Dispatcher.dispatch({
            actionType: Constants.STORE_CONSTANTS.SORT_BY_RATING
        });
    }
    sortByName(){
        Dispatcher.dispatch({
            actionType: Constants.STORE_CONSTANTS.SORT_BY_NAME
        });
    }
    filterByFacilities(facilitiesArray){
        console.log(facilitiesArray);
        Dispatcher.dispatch({
            actionType: Constants.STORE_CONSTANTS.FILTER_BY_FACILITIES,
            payload:facilitiesArray
        });
    }
    filterByName(partialString){
        Dispatcher.dispatch({
            actionType: Constants.STORE_CONSTANTS.FILTER_BY_NAME,
            payload:partialString
        });
    }
     getHotel(obj){
         Dispatcher.dispatch({
             actionType: Constants.STORE_CONSTANTS.GET_HOTEL,
             payload:obj
         });
     }
}
export default new HotelStoreActions();
