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
import { getSongById } from './services/SongService'
import { getGenreById } from './services/GenreService'
import { getArtistById } from './services/ArtistService'
import { getAlbumById } from './services/AlbumService'

const SongTable = ({ playlistId }) => {

    const [isModalInfoActive, setIsModalInfoActive] = useState(false)
    const [isModalTrashActive, setIsModalTrashActive] = useState(false)
    const [pagesList, setPageList] = useState([]);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [playlistSongs, setPlaylistSongs] = useState(null);
    const [selectedPlaylistSongId, setSelectedPlaylistSongId] = useState(null);
    const [songs, setSongs] = useState({});
    const [genres, setGenres] = useState({})
    const [artists, setArtists] = useState({})
    const [albums, setAlbums] = useState({})


    const handleModalAction = async () => {
        setIsModalInfoActive(false)
        setIsModalTrashActive(false)

    }

    const deleteAction = async (selectedPlaylistSongId) => {
        //console.log("silienecek playlist id: " + selectedPlaylistId)
        await deletePlaylistSong(selectedPlaylistSongId);
        const playlistSongsResult = await getAllByPlaylistId(playlistId);
        const playlistSongsData = playlistSongsResult.data.data;
        setPlaylistSongs(playlistSongsData)
        setIsModalTrashActive(false);
    }

    useEffect(() => {
        const fetchData = async () => {

            const playlistSongsResult = await getAllByPlaylistId(playlistId);
            const playlistSongsData = playlistSongsResult.data.data;
            console.log(playlistSongsData)



            const songs = {};
            for (const playlistSong of playlistSongsData) {

                const song = await getSongById(playlistSong.songId)
                songs[playlistSong.id] = song.data.data


                const genre = await getGenreById(songs[playlistSong.id].genreId)
                genres[songs[playlistSong.id].id] = genre.data.data.title


                const artist = await getArtistById(songs[playlistSong.id].artistId)
                artists[songs[playlistSong.id].id] = artist.data.data.fullName


                const album = await getAlbumById(songs[playlistSong.id].albumId)
                albums[songs[playlistSong.id].id] = album.data.data.title

            };



            //console.log("--")
            // bu şekilde her şarkının ayrı ayrı bilgilerine ulaışıyorum console.log(songs[song.data.data.id].id)

            setPlaylistSongs(playlistSongsData)
            setSongs(songs);
            setGenres(genres);
            setArtists(artists)
            setAlbums(albums)

            const perPage = 5


            setNumPages(playlistSongs && playlistSongs.length / perPage)
            setPageList([])



            for (let i = 0; i < numPages; i++) {
                pagesList.push(i)
            }


        }
        fetchData();
    }, [playlistId]);


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

                onConfirm={() => deleteAction(selectedPlaylistSongId)}
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
                        <th>Genre</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Total Likes</th>
                        <th>Plays</th>
                        <th>Duration</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {playlistSongs && Object.values(playlistSongs).map((playlistSong) => (

                        <tr key={playlistSong.id}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username={artists[playlistSong.songId]} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>
                            <td data-label="Title">{songs[playlistSong.id].title}</td>
                            <td data-label="Genre">{genres[playlistSong.songId]}</td>
                            <td data-label="Artist">{artists[playlistSong.songId]}</td>
                            <td data-label="Album">{albums[playlistSong.songId]}</td>
                            <td data-label="Total Likes">{songs[playlistSong.id].totalLikes}</td>
                            <td data-label="Plays">{songs[playlistSong.id].plays}</td>
                            <td data-label="Duration">{songs[playlistSong.id].duration}</td>



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
                                            setSelectedPlaylistSongId(playlistSong.id);
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

export default SongTable