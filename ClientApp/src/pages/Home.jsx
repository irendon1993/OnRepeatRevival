import React, { useEffect, useState } from 'react'
import { PlayListsBox } from '../components/PlaylistBox'

export function Home() {
  const [userInfo, setUserInfo] = useState([])
  const accessToken = localStorage.getItem('SpotifyAccessToken')

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

  return (
    <div className="home">
      <section className="boxContainer">
        <PlayListsBox />
      </section>
    </div>
  )
}
