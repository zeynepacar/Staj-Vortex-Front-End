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

const SongTable = ({ albumId }) => {

    const [isModalInfoActive, setIsModalInfoActive] = useState(false)
    const [isModalTrashActive, setIsModalTrashActive] = useState(false)
    const [pagesList, setPageList] = useState([]);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [albumSongs, setAlbumSongs] = useState(null);
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

            const albumSongsResult = await getSongsByAlbum(albumId);
            const albumSongsData = albumSongsResult.data.data;


            for (const albumSongs of albumSongsData) {


                const availableMarkets = albumSongs.availableMarkets.split(","); // Splitting the string into an array of country IDs
                markets[albumSongs.id] = [];

                for (const marketId of availableMarkets) {
                    const country = await getById(marketId);

                    markets[albumSongs.id] += country.data.data.countryName + ", "


                }


                const genre = await getGenreById(albumSongs.genreId)
                genres[albumSongs.id] = genre.data.data.title


            };



            //console.log("--")
            // bu şekilde her şarkının ayrı ayrı bilgilerine ulaışıyorum console.log(songs[song.data.data.id].id)

            setAlbumSongs(albumSongsData)
            setGenres(genres);
            setMarkets(markets)


            const perPage = 5


            setNumPages(albumSongs && albumSongs.length / perPage)
            setPageList([])



            for (let i = 0; i < numPages; i++) {
                pagesList.push(i)
            }


        }
        fetchData();
    }, [albumId]);


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
                        <th>Genre</th>
                        <th>Total Likes</th>
                        <th>Plays</th>
                        <th>Duration</th>
                        <th>Available Markets</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {albumSongs && Object.values(albumSongs).map((albumSong) => (

                        <tr key={albumSong.id}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username="" className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>
                            <td data-label="Title">{albumSong.title}</td>
                            <td data-label="Genre">{genres[albumSong.id]}</td>
                            <td data-label="Total Likes">{albumSong.totalLikes}</td>
                            <td data-label="Plays">{albumSong.plays}</td>
                            <td data-label="Duration">{albumSong.duration}</td>
                            <td data-label="Available Markets">{markets[albumSong.id]}</td>



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

export default SongTable