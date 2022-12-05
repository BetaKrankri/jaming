import './Tracklist.css';
import React from 'react';

import Track from '../Track/Track';

class Tracklist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map(track => (
                    <Track track={track}
                        key={track.id} 
                        onAdd={this.props.onAdd}
                        onRemove={this.props.onRemove}
                        isRemoval={this.props.isRemoval}/>))}
            </div>
        );
    }
}

export default Tracklist;