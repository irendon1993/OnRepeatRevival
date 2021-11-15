import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { logoutOfSpotify, isLoggedInOnSpotify } from '../auth.js'
import playlistDefaultImage from '../images/playlist.jpg'
import { LoginButton } from '../LoginButton'

const isLoggedIn = isLoggedInOnSpotify()

export function Header() {
  const accessToken = localStorage.getItem('SpotifyAccessToken')
  const [userInfo, setUserInfo] = useState([])
  const [userImage, setUserImage] = useState([])

  async function fetchUserInfo() {
    const response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const json = await response.json()

    setUserInfo(json.display_name)
    setUserImage(
      json.images.length > 0 ? json.images[0].url : playlistDefaultImage
    )
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInfo()
    } else {
      return
    }
  }, [])
  console.log(userInfo)

  return (
    <div className="header">
      <header>
        <div className="headerDiv">
          <Link to="/">
            <h1>OnRepeat</h1>
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="userDiv">
            <div>
              <div
                style={{ backgroundImage: `url(${userImage})` }}
                // src={userImage.length > 0 ? userImage : playlistDefaultImage}
              />
              <p> {userInfo} </p>
            </div>
            <button
              onClick={() => {
                logoutOfSpotify()
                window.location = '/'
              }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="userDiv">
            <LoginButton />
          </div>
        )}
      </header>
      <nav>
        <ul className="navBar">
          <li className="navItem">
            <Link to="/">Home</Link>
          </li>
          <li className="navItem">
            <Link to="/create">Create a Playlist </Link>
          </li>
          <li className="navItem">
            <Link to="/charts">My Charts</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}