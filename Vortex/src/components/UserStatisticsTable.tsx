"use client"
import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'
import { deletePlaylistSong, getAllByPlaylistId } from './services/PlaylistSongService'
import { getSongById } from './services/SongService'
import { getGenreById } from './services/GenreService'
import { getArtistById } from './services/ArtistService'
import { getAlbumById } from './services/AlbumService'
import { getUserStatisticsById } from './services/UserStatisticsService'

const SongTable = ({ userId }) => {

    const [isModalInfoActive, setIsModalInfoActive] = useState(false)
    const [isModalTrashActive, setIsModalTrashActive] = useState(false)
    const [pagesList, setPageList] = useState([]);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [userStatistics, setUserStatistics] = useState(null);
    const [selectedPlaylistSongId, setSelectedPlaylistSongId] = useState(null);
    const [genres, setGenres] = useState({})
    const [artists, setArtists] = useState({})



    const handleModalAction = async () => {
        setIsModalInfoActive(false)
        setIsModalTrashActive(false)

    }

    useEffect(() => {
        const fetchData = async () => {

            const userStatisticsResult = await getUserStatisticsById(userId);
            const userStatisticData = userStatisticsResult.data.data;
            console.log(userStatisticData)


            for (const userStatistic of userStatisticData) {


                const genre = await getGenreById(userStatistic.mostLikedGenreId)
                genres[userId] = genre.data.data.title


                const artist = await getArtistById(userStatistic.mostListenedArtistId)
                artists[userId] = artist.data.data.fullName

            };

            setUserStatistics(userStatisticData)
            setGenres(genres);
            setArtists(artists)

            const perPage = 5


            setNumPages(userStatistics && userStatistics.length / perPage)
            setPageList([])



            for (let i = 0; i < numPages; i++) {
                pagesList.push(i)
            }


        }
        fetchData();
    }, [userId]);


    return (
        <>

            <table>
                <thead>
                    <tr>
                        <th />
                        <th>Most Liked Genre</th>
                        <th>Most Listened Artist</th>
                        <th>Number of Liked Songs</th>
                        <th>Number of Playlist</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {userStatistics && Object.values(userStatistics).map((userStatistic) => (

                        <tr key={userStatistic.id}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username="" className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>
                            <td data-label="Most Liked Genre">{genres[userId]}</td>
                            <td data-label="Most Listened Artist">{artists[userId]}</td>
                            <td data-label="Number of Liked Songs">{userStatistic.numberOfLikedSongs}</td>
                            <td data-label="Number of Playlist">{userStatistic.numberOfPlaylists}</td>
                            <td className="before:hidden lg:w-1 whitespace-nowrap">

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
                    <BaseButtons>
                        {pagesList.map((page) => (
                            <BaseButton
                                key={page}
                                active={page === currentPage}
                                label={page + 1}
                                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                                small
                                onClick={() => setCurrentPage(page)}
                            />
                        ))}
                    </BaseButtons>
                    <small className="mt-6 md:mt-0">
                        Page {currentPage + 1} of {numPages}
                    </small>
                </div>
            </div>

        </>
    )
}

export default SongTable