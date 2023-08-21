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
import { getAllGenres, getGenreById } from './services/GenreService'
import { getArtistById } from './services/ArtistService'
import { getAlbumById } from './services/AlbumService'
import GenreSongTable from './GenreSongs'

const GenreTable = () => {

    const [isModalInfoActive, setIsModalInfoActive] = useState(false)
    const [isModalTrashActive, setIsModalTrashActive] = useState(false)
    const [pagesList, setPageList] = useState([]);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [playlistSongs, setPlaylistSongs] = useState(null);
    const [selectedGenreId, setSelectedGenreId] = useState(null);
    const [genres, setGenres] = useState({})
    const [isInfoButtonClicked, setIsInfoButtonClicked] = useState(false);



    const handleModalAction = async () => {
        setIsModalInfoActive(false)
        setIsModalTrashActive(false)


    }

    const handleInfoButtonClick = (selectedGenreId) => {
        setIsInfoButtonClicked(true);
        setSelectedGenreId(selectedGenreId);
        setIsModalInfoActive(true);
        setIsModalTrashActive(false); // Close the trash modal if it's open

    };

    useEffect(() => {
        const fetchData = async () => {

            const genresResult = await getAllGenres();
            const genresData = genresResult.data.data;

            setGenres(genresData);


            const perPage = 5


            setNumPages(playlistSongs && playlistSongs.length / perPage)
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
                title="Sample modal"
                buttonColor="info"
                buttonLabel="Done"
                isActive={isModalInfoActive}
                onConfirm={handleModalAction}
                onCancel={handleModalAction}
            >
                {isInfoButtonClicked && (

                    <GenreSongTable genreId={selectedGenreId} />

                )}
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
                        <th>Title</th>
                        <th>Genre</th>

                        <th />
                    </tr>
                </thead>
                <tbody>
                    {genres && Object.values(genres).map((genre) => (

                        <tr key={genre.id}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username={genre.title} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>

                            <td data-label="Genre">{genre.title}</td>




                            <td className="before:hidden lg:w-1 whitespace-nowrap">
                                <BaseButtons type="justify-start lg:justify-end" noWrap>
                                    <BaseButton
                                        color="info"
                                        icon={mdiEye}
                                        onClick={() => { setSelectedGenreId(genre.id); handleInfoButtonClick(genre.id) }}
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

export default GenreTable