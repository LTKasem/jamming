
import React from 'react';
import './App.css';
// Importing other files
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: [{name:'potato',artist:'potato',album:'potato',id:'01'}],
      playlistName: 'Hi',
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this)
  };

  addTrack(track) {
    let newplaylist = this.state.playlistTracks
    if (newplaylist.find(current => current.id === track.id)) { return }
    newplaylist.push(track);
    this.setState({ playlistTracks: newplaylist })
  }
  removeTrack(track) {
    let newplaylist = this.state.playlistTracks
    newplaylist = newplaylist.filter(list => list.id !== track.id)
    this.setState({ playlistTracks: newplaylist })
  }
  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }
  savePlaylist(){
    const truckUris = this.state.playlistTracks.map(track=>track.uri)
    Spotify.savePlaylist(this.state.playlistName,truckUris)
    this.setState({playlistName:'New Playlist',playlistTracks:[]})
  }
  search(term){
    Spotify.search(term).then(result=>{
      this.setState({SearchResults: result})
    })
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.SearchResults} onAdd={this.addTrack} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>)
  };
}
export default App;
