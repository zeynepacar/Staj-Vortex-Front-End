"use client"
import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'
//import UserService from './services/UserService'
import { getById } from './services/CountryService'
import { getAllUsers, getUserById, signIn, updatePassword } from './services/UserService'
import { deletePlaylist, getAllPlaylist } from './services/PlaylistService'
import { deletePlaylistSong, getAllByPlaylistId } from './services/PlaylistSongService'
import { getSongById, getSongsByAlbum } from './services/SongService'
import { getGenreById } from './services/GenreService'
import { getArtistById } from './services/ArtistService'
import { getAlbumById } from './services/AlbumService'
import { getLikedSongByUserId } from './services/LikedSongsService'

const LikedSongsTable = ({ userId }) => {

    const [isModalInfoActive, setIsModalInfoActive] = useState(false)
    const [isModalTrashActive, setIsModalTrashActive] = useState(false)
    const [pagesList, setPageList] = useState([]);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [likedSongs, setLikedSongs] = useState(null);
    const [selectedPlaylistSongId, setSelectedPlaylistSongId] = useState(null);
    const [songs, setSongs] = useState({});
    const [genres, setGenres] = useState({})
    const [artists, setArtists] = useState({})
    const [albums, setAlbums] = useState({})
    const [markets, setMarkets] = useState({})


    const handleModalAction = async () => {
        setIsModalInfoActive(false)
        setIsModalTrashActive(false)

    }
    /*
        const deleteAction = async (selectedPlaylistSongId) => {
            //console.log("silienecek playlist id: " + selectedPlaylistId)
            await deletePlaylistSong(selectedPlaylistSongId);
            const playlistSongsResult = await getAllByPlaylistId(playlistId);
            const playlistSongsData = playlistSongsResult.data.data;
            setPlaylistSongs(playlistSongsData)
            setIsModalTrashActive(false);
        } */

    useEffect(() => {
        const fetchData = async () => {

            const likedSongsResult = await getLikedSongByUserId(userId);
            const likedSongsData = likedSongsResult.data.data;


            for (const likedSong of likedSongsData) {

                const songsResult = await getSongById(likedSong.id)
                songs[likedSong.id] = songsResult.data.data

                const artist = await getArtistById(songs[likedSong.id].artistId)
                artists[likedSong.songId] = artist.data.data.fullName


            }

            setLikedSongs(likedSongsData)
            setSongs(songs)
            setArtists(artists)


            const perPage = 5


            setNumPages(likedSongs && likedSongs.length / perPage)
            setPageList([])



            for (let i = 0; i < numPages; i++) {
                pagesList.push(i)
            }


        }
        fetchData();
    }, [userId]);


    return (
        <>
            <CardBoxModal
                title="Sample modal"
                buttonColor="info"
                buttonLabel="Done"
                isActive={isModalInfoActive}
                onConfirm={handleModalAction}
                onCancel={handleModalAction}
            >
                <p>
                    Lorem ipsum dolor sit amet <b>adipiscing elit</b>
                </p>
                <p>This is sample modal</p>
            </CardBoxModal>

            <CardBoxModal
                title="Please confirm"
                buttonColor="danger"
                buttonLabel="Confirm"
                isActive={isModalTrashActive}

                onConfirm={handleModalAction}
                onCancel={handleModalAction}
            >
                <p>
                    Remove this song from the playlist!
                </p>

            </CardBoxModal>

            <table>
                <thead>
                    <tr>
                        <th />
                        <th>Title</th>
                        <th>Artist</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {likedSongs && Object.values(likedSongs).map((likedSong) => (

                        <tr key={likedSong.id}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username={artists[likedSong.songId]} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>
                            <td data-label="Title">{songs[likedSong.id].title}</td>
                            <td data-label="Artist">{artists[likedSong.songId]}</td>




                            <td className="before:hidden lg:w-1 whitespace-nowrap">
                                <BaseButtons type="justify-start lg:justify-end" noWrap>
                                    <BaseButton
                                        color="info"
                                        icon={mdiEye}
                                        onClick={() => setIsModalInfoActive(true)}
                                        small
                                    />
                                    <BaseButton
                                        color="danger"
                                        icon={mdiTrashCan}
                                        onClick={() => {

                                            setIsModalTrashActive(true);
                                        }}
                                        small
                                    />
                                </BaseButtons>
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

export default LikedSongsTable