import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useHistory } from 'react-router-dom'

export function CreateAPlaylist() {
  const history = useHistory()
  const [recommendation, setRecommendation] = useState([])
  const [chartArtistMonth, setChartArtistMonth] = useState([])
  const [chartTrackMonth, setChartTrackMonth] = useState([])
  const accessToken = localStorage.getItem('SpotifyAccessToken')
  const [seedArtist, setSeedArtist] = useState('')
  const [seedTrack, setSeedTrack] = useState('')
  const [seedGenre, setSeedGenre] = useState('')
  const [newPlaylistName, setNewPlaylistName] = useState('')
  const [userInfo, setUserInfo] = useState([])
  const [newPlaylistId, setNewPlaylistId] = useState('')

  async function PopulatePlaylist() {
    const uris = recommendation.map((uri) => uri.uri)
    console.log(uris)

    const response = await fetch('/api/SpotifyProxy', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        uris,
        accessToken,
        playlistId: newPlaylistId.id,
      }),
    })
    history.push('/')
  }

  async function CreateAPlaylist() {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userInfo.id}/playlists`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name: newPlaylistName }),
      }
    )
    const json = await response.json()
    setNewPlaylistId(json)
  }

  async function fetchUserInfo() {
    const response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const json = await response.json()

    setUserInfo(json)
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])
  console.log(userInfo)

  async function fetchRecommendation(event) {
    event.preventDefault()
    CreateAPlaylist()

    const response = await fetch(
      `https://api.spotify.com/v1/recommendations?limit=20&market=ES&seed_artists=${seedArtist}&seed_genres=${seedGenre}&seed_tracks=${seedTrack}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const json = await response.json()

    setRecommendation(json.tracks)
  }
  useEffect(() => {
    if (!accessToken) {
      return
    }

    async function fetchChartArtistMonth() {
      const response = await fetch(
        'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      const json = await response.json()

      setChartArtistMonth(json.items)
    }

    fetchChartArtistMonth()
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) {
      return
    }

    async function fetchChartTrackMonth() {
      const response = await fetch(
        'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      const json = await response.json()

      setChartTrackMonth(json.items)
    }

    fetchChartTrackMonth()
  }, [accessToken])

  console.log(seedArtist)
  console.log(seedTrack)
  console.log(seedGenre)
  console.log(recommendation.id)
  console.log(newPlaylistName)
  console.log(newPlaylistId)
  console.log(newPlaylistId.id)

  return (
    <div className="createPlaylist">
      <section className="creatorContainer">
        <form onSubmit={fetchRecommendation} className="creator">
          <p>
            <label>Name your playlist:</label>
            <input
              type="text"
              onChange={(event) => {
                setNewPlaylistName(event.target.value)
                console.log(event.target)
              }}
            ></input>
          </p>
          <p>
            <label>Pick one of your Top Artists:</label>
            <select
              className="seedArtist"
              value={seedArtist}
              onChange={(event) => {
                setSeedArtist(event.target.value)
                console.log(event.target)
              }}
            >
              {chartArtistMonth.map((seedArtist) => (
                <option value={seedArtist.id}>{seedArtist.name}</option>
              ))}
            </select>
          </p>
          <p>
            <label>Pick one of your Top Tracks:</label>
            <select
              className="seedTrack"
              value={seedTrack}
              onChange={(event) => {
                setSeedTrack(event.target.value)
              }}
            >
              {chartTrackMonth.map((seedTrack) => (
                <option value={seedTrack.id}>{seedTrack.name}</option>
              ))}
            </select>
          </p>
          <p>
            <label>Pick one of your Top Genres:</label>
            <select
              className="seedGenre"
              value={seedGenre}
              onChange={(event) => {
                setSeedGenre(event.target.value)
              }}
            >
              {chartArtistMonth.map((seedGenre) => (
                <option>{seedGenre.genres[0]}</option>
              ))}
            </select>
          </p>
          <p>
            <button className="recommendationButton" type="submit">
              Recommend a Playlist
            </button>
          </p>
        </form>

        <article className="newPlaylist">
          <h2>{newPlaylistName}</h2>

          <div className="tableContainer">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr className="categoryList">
                  <th className="trackCategory">Track</th>
                  <th className="artistCategory">Artist</th>
                  <th className="albumCategory">Album</th>
                </tr>
              </thead>
              {recommendation.map((track) => (
                <tbody>
                  <tr className="track">
                    <td>{track.name}</td>
                    <td>
                      {track.artists.map((artist) => (
                        <span>{artist.name + ' '} </span>
                      ))}
                    </td>

                    <td>{track.album.name}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </div>
          <div className="buttonDiv">
            {recommendation.length === 0 ? null : (
              <button onClick={PopulatePlaylist}>Create this Playlist</button>
            )}
          </div>
        </article>
      </section>
    </div>
  )
}
