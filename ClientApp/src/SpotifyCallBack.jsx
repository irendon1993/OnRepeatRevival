import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function SpotifyAuthCallback() {
  const searchParams = new URLSearchParams(useLocation().search)

  const code = searchParams.get('code')

  useEffect(() => {
    async function requestToken() {
      const BasicAuth = btoa(
        'a89620779d994eb7b01ff6ee1bb88940:062649b4d02c426cba9f78d9d3d823a3'
      )

      const request = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'https://onrepeat-sdg.herokuapp.com/callback',
      }

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${BasicAuth}`,
        },
        body: new URLSearchParams(request),
      })

      const json = await response.json()

      localStorage.setItem('SpotifyAccessToken', json.access_token)
      localStorage.setItem('SpotifyRefreshToken', json.refresh_token)

      window.location.assign('/')
    }

    requestToken()
  }, [code])

  return <></>
}