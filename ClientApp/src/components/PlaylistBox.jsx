import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import playlistDefaultImage from '../images/playlist.jpg'

export function Loading() {
  return (
    <div>
      <p>Loading</p>
    </div>
  )
}

export function PlayListsBox() {
  const [playlists, setPlaylists] = useState([])
  const accessToken = localStorage.getItem('SpotifyAccessToken')

  useEffect(() => {
    if (!accessToken) {
      return
    }

    async function fetchPlaylists() {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if (response.status === 401) {
        localStorage.setItem('SpotifyAccessToken', '')
        // localStorage.setItem('SpotifyRefreshToken', '')
      }
      const json = await response.json()
      console.log(json)
      if (json.items) {
        setPlaylists(json.items)
      }
    }

    fetchPlaylists()
  }, [accessToken])

  if (!accessToken) {
    return <p>You aren't logged in</p>
  }
  console.log(playlists)
  return (
    <div className="playlistContainer">
      {playlists.length > 0 &&
        playlists.map((playlist) => (
          <article className="PlaylistBox">
            <span
              key={playlist.name}
              className="playlistTitle"
              title={playlist.name}
            >
              <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
            </span>
            <img
              src={
                playlist.images.length > 0
                  ? playlist.images[0].url
                  : playlistDefaultImage
              }
              height="400px"
              width="400px"
            />
          </article>
        ))}
      {playlists.length === 0 && <h1>LOADING...</h1>}
    </div>
  )
}