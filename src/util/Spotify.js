const clientId = '4f691e3787b74fdbbcf6c2292946e688';
const redirectURI = 'https://dynamic-cheesecake-dd375c.netlify.app/';
let accessToken;

const Spotify = {
    getAccesToken() {
        if (accessToken) { return accessToken };

        // check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenMatch && expiresInMatch) {
            //console.log(accessToken);
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            window.location = accessUrl;
        }
    },
    search(searchTerm) {
        const accessToke = this.getAccesToken();
        let urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
        let authHeader = { Authorization: `Bearer ${accessToke}` };

        return fetch(urlToFetch, { headers: authHeader }
        ).then((response) => response.json()
        ).then((jsonResponse) => {
            if (!jsonResponse.tracks) { return [] }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },
    savePlaylist(name, tracksUris) {
        //console.log(tracksUris);
        if (!name || !tracksUris.length) { return };
        const accessToke = this.getAccesToken();
        const authHeader = { Authorization: `Bearer ${accessToke}` };
        let userId;

        return fetch(`https://api.spotify.com/v1/me`, { headers: authHeader }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: authHeader,
                method: 'POST',
                body: JSON.stringify({ name: name })
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                //console.log(jsonResponse)
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: authHeader,
                    method: 'POST',
                    body: JSON.stringify({ uris: tracksUris })
                });
            });
        });


    }
};

export default Spotify;
