import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function SpotifyAuthCallback() {
  const searchParams = new URLSearchParams(useLocation().search)

  const code = searchParams.get('code')

  useEffect(() => {
    async function requestToken() {
      const BasicAuth = btoa(
        '357044f51401415e96141eadaa6ff387:b679df270e804c0b891a10aaa7d85f0d'
      )

      const request = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:3000/callback',
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