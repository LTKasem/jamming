import React from 'react';
import './SearchBar.css';
class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state={term:''}
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this)
    }
    search(){
        const term = this.state.term
        this.props.onSearch(term)
    }
    handleTermChange(e){
     const result = e.target.value
     this.setState({term:result})
     this.search()
    }
    render() {
        return (
            <div className="SearchBar">
                <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
            </div>
        );
    }
}
export default SearchBar
