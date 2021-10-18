import React, { useEffect, useState } from 'react'

export function MyCharts() {
  const [chartArtistMonth, setChartArtistMonth] = useState([])
  const [chartArtist6Month, setChartArtist6Month] = useState([])
  const [chartArtistAllTime, setChartArtistAllTime] = useState([])
  const [chartTrackMonth, setChartTrackMonth] = useState([])
  const [chartTrack6Month, setChartTrack6Month] = useState([])
  const [chartTrackAllTime, setChartTrackAllTime] = useState([])
  const accessToken = localStorage.getItem('SpotifyAccessToken')

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
      console.log(json)
    }

    fetchChartArtistMonth()
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) {
      return
    }

    async function fetchChartArtist6Month() {
      const response = await fetch(
        'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      const json = await response.json()

      setChartArtist6Month(json.items)
      console.log(json)
    }

    fetchChartArtist6Month()
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) {
      return
    }

    async function fetchChartArtistAllTime() {
      const response = await fetch(
        'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      const json = await response.json()

      setChartArtistAllTime(json.items)
      console.log(json)
    }

    fetchChartArtistAllTime()
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
      console.log(json)
    }

    fetchChartTrackMonth()
  }, [accessToken])
  useEffect(() => {
    if (!accessToken) {
      return
    }

    async function fetchChartTrack6Month() {
      const response = await fetch(
        'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      const json = await response.json()

      setChartTrack6Month(json.items)
      console.log(json)
    }

    fetchChartTrack6Month()
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) {
      return
    }

    async function fetchChartTrackAllTime() {
      const response = await fetch(
        'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      const json = await response.json()

      setChartTrackAllTime(json.items)
      console.log(json)
    }

    fetchChartTrackAllTime()
  }, [accessToken])
  if (!accessToken) {
    return <p>You aren't logged in</p>
  }

  return (
    <div className="myCharts">
      <section className="chartsSection">
        <article className="topArticle">
          <h2> Top Artists</h2>
          <div>
            <h3>Past Month</h3>
            <div className="divContainer">
              <div>
                <ul className="numberList">
                  <li>1.</li>
                  <li>2.</li>
                  <li>3.</li>
                  <li>4.</li>
                  <li>5.</li>
                  <li>6.</li>
                  <li>7.</li>
                  <li>8.</li>
                  <li>9.</li>
                  <li>10.</li>
                </ul>
              </div>
              <div>
                <ul className="topList">
                  {chartArtistMonth.map((monthArtist) => (
                    <li>{monthArtist.name}</li>
                  ))}
                  {/* <li>
                    testtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
                  </li> */}
                </ul>
                {/* <ul className="topList"> */}
                {/* {chartArtistMonth.map((monthArtistImage) => (
                  <li>{monthArtistImage.images}</li>
                ))} */}
                {/* </ul> */}
              </div>
            </div>
          </div>

          <h3>Six Months</h3>
          <div className="divContainer">
            <div>
              <ul className="numberList">
                <li>1.</li>
                <li>2.</li>
                <li>3.</li>
                <li>4.</li>
                <li>5.</li>
                <li>6.</li>
                <li>7.</li>
                <li>8.</li>
                <li>9.</li>
                <li>10.</li>
              </ul>
            </div>
            <ul className="topList">
              {chartArtist6Month.map((sixMonthArtist) => (
                <li>{sixMonthArtist.name}</li>
              ))}
            </ul>
          </div>

          <h3>All Time</h3>
          <div className="divContainer">
            <div>
              <ul className="numberList">
                <li>1.</li>
                <li>2.</li>
                <li>3.</li>
                <li>4.</li>
                <li>5.</li>
                <li>6.</li>
                <li>7.</li>
                <li>8.</li>
                <li>9.</li>
                <li>10.</li>
              </ul>
            </div>
            <ul className="topList">
              {chartArtistAllTime.map((allTimeArtist) => (
                <li>{allTimeArtist.name}</li>
              ))}
            </ul>
          </div>
        </article>

        <article className="topArticle">
          <h2>Top Tracks</h2>
          <h3>Past Month</h3>
          <div className="divContainer">
            <div>
              <ul className="numberList">
                <li>1.</li>
                <li>2.</li>
                <li>3.</li>
                <li>4.</li>
                <li>5.</li>
                <li>6.</li>
                <li>7.</li>
                <li>8.</li>
                <li>9.</li>
                <li>10.</li>
              </ul>
            </div>
            <ul className="topList">
              {chartTrackMonth.map((trackMonth) => (
                <li>{trackMonth.name}</li>
              ))}
            </ul>
          </div>
          <h3>Six Months</h3>
          <div className="divContainer">
            <div>
              <ul className="numberList">
                <li>1.</li>
                <li>2.</li>
                <li>3.</li>
                <li>4.</li>
                <li>5.</li>
                <li>6.</li>
                <li>7.</li>
                <li>8.</li>
                <li>9.</li>
                <li>10.</li>
              </ul>
            </div>
            <ul className="topList">
              {chartTrack6Month.map((track6Month) => (
                <li>{track6Month.name}</li>
              ))}
            </ul>
          </div>

          <h3>All Time</h3>
          <div className="divContainer">
            <div>
              <ul className="numberList">
                <li>1.</li>
                <li>2.</li>
                <li>3.</li>
                <li>4.</li>
                <li>5.</li>
                <li>6.</li>
                <li>7.</li>
                <li>8.</li>
                <li>9.</li>
                <li>10.</li>
              </ul>
            </div>
            <ul className="topList">
              {chartTrackAllTime.map((trackAllTime) => (
                <li>{trackAllTime.name}</li>
              ))}
            </ul>
          </div>
        </article>
      </section>
    </div>
  )
}