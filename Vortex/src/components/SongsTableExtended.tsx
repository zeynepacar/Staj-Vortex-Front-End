"use client"
import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect, use } from 'react'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'
//import UserService from './services/UserService'
import { getById } from './services/CountryService'
import { deleteSongById, getAllSongs, getSongById } from './services/SongService'
import { getGenreById } from './services/GenreService'
import { getArtistById } from './services/ArtistService'
import { getAlbumById } from './services/AlbumService'

const SongTableExtended = () => {

    const [isModalInfoActive, setIsModalInfoActive] = useState(false)
    const [isModalTrashActive, setIsModalTrashActive] = useState(false)
    const [pagesList, setPageList] = useState([]);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [playlistSongs, setPlaylistSongs] = useState(null);
    const [selectedSongId, setSelectedSongId] = useState(null);
    const [songs, setSongs] = useState(null);
    const [genres, setGenres] = useState({})
    const [artists, setArtists] = useState({})
    const [albums, setAlbums] = useState({})
    const [markets, setMarkets] = useState({})


    const handleModalAction = async () => {
        setIsModalInfoActive(false)
        setIsModalTrashActive(false)

    }


    const deleteAction = async (selectedSongId) => {
        await deleteSongById(selectedSongId);
        const songsResult = await getAllSongs()
        const songsData = songsResult.data.data;
        setSongs(songsData)
        setIsModalTrashActive(false);
    }

    useEffect(() => {
        const fetchData = async () => {

            const songsResult = await getAllSongs()
            const songsData = songsResult.data.data;
            console.log(songsData)

            for (const song of songsData) {

                const availableMarkets = song.availableMarkets.split(","); // Splitting the string into an array of country IDs
                markets[song.id] = [];

                for (const marketId of availableMarkets) {
                    const country = await getById(marketId);

                    markets[song.id] += country.data.data.countryName + ", "


                }


                const genre = await getGenreById(song.genreId)
                genres[song.id] = genre.data.data.title


                const artist = await getArtistById(song.artistId)
                artists[song.id] = artist.data.data.fullName


                const album = await getAlbumById(song.albumId)
                albums[song.id] = album.data.data.title

            };

            setSongs(songsData)
            setGenres(genres);
            setArtists(artists)
            setAlbums(albums)
            setMarkets(markets)

            const perPage = 5


            setNumPages(songs && songs.length / perPage)
            setPageList([])



            for (let i = 0; i < numPages; i++) {
                pagesList.push(i)
            }


        }
        fetchData();
    }, []);


    return (
        <>

            <CardBoxModal
                title="Please confirm"
                buttonColor="danger"
                buttonLabel="Confirm"
                isActive={isModalTrashActive}

                onConfirm={() => deleteAction(selectedSongId)}
                onCancel={handleModalAction}
            >
                <p>
                    Delete this song!
                </p>

            </CardBoxModal>

            <table>
                <thead>
                    <tr>
                        <th />
                        <th>ISRC</th>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Release Date</th>
                        <th>Duration</th>
                        <th>Available Markets</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {songs && Object.values(songs).map((song) => (

                        <tr key={song.id}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username={artists[song.id]} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>
                            <td data-label="ISRC">{song.isrc}</td>
                            <td data-label="Title">{song.title}</td>
                            <td data-label="Genre">{genres[song.id]}</td>
                            <td data-label="Artist">{artists[song.id]}</td>
                            <td data-label="Album">{albums[song.id]}</td>
                            <td data-label="Release Date">{song.releaseDate}</td>
                            <td data-label="Duration">{song.duration}</td>
                            <td data-label="Available Markets">{markets[song.id]}</td>



                            <td className="before:hidden lg:w-1 whitespace-nowrap">
                                <BaseButtons type="justify-start lg:justify-end" noWrap>

                                    <BaseButton
                                        color="danger"
                                        icon={mdiTrashCan}
                                        onClick={() => {
                                            setSelectedSongId(song.id);
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

export default SongTableExtended