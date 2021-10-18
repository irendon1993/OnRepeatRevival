import React from 'react'

export function LoginButton() {
  async function clickLogin() {
    // Create a set of parameters for the URL.
    const params = new URLSearchParams({
      client_id: '357044f51401415e96141eadaa6ff387',
      response_type: 'code',
      redirect_uri: 'http://localhost:3000/callback ',
      scope:
        'user-read-private user-read-email playlist-read-private user-top-read playlist-modify-public playlist-modify-private',
      state: 'random number',
    })
    const url = `https://accounts.spotify.com/authorize?${params}`

    window.location.assign(url)
  }

  // TODO Check to see if refesh token is expired.
  const token = localStorage.getItem('SpotifyRefreshToken')

  // if (token) {
  //   return null
  // }

  return (
    <section className="login">
      <button onClick={clickLogin}>Login</button>
    </section>
  )
}

export default LoginButton
