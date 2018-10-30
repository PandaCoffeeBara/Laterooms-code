import React, {Component} from 'react';
import SearchBox from 'react-search-box';

export default class Search extends Component {
    constructor() {
        super();
        this.state = {data: []}
    }

    componentWillMount() {
        console.log('mounting',this.props.data)
        this.setState({data:this.props.data})
    }

    handleChange = (selection) => {
        console.log(selection)
    };
    sortByRating =(selection)=>{
        selection.sort((a,b)=>{
            return a.rating - b.rating;
        })
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
