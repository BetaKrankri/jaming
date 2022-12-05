import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    Spotify.getAccesToken();
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) { return };
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(newName) {
    this.setState({ playlistName: newName })
  }

  savePlaylist() {
    const tracksURIs = this.state.playlistTracks.map(currentTrack => currentTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, tracksURIs
    ).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    }
    );
    //console.log(tracksURIs);
  }

  search(term) {
    Spotify.search(term).then(spotifySearchResults => {
      this.setState({ searchResults: spotifySearchResults });
    });
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing whith <span className='highlight'>Quike</span></h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
              onNameChange={this.updatePlaylistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;