"use client"
import { mdiEye, mdiPlus, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'
//import UserService from './services/UserService'
import { deleteAlbumById, getAlbumById, getAlbumsByArtist } from './services/AlbumService'
import AlbumSongs from './AlbumSongs'
import AddSong from './AddSongToAlbum'

const SongTable = ({ artistId }) => {

    const [isModalInfoActive, setIsModalInfoActive] = useState(false)
    const [isModalTrashActive, setIsModalTrashActive] = useState(false)
    const [pagesList, setPageList] = useState([]);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [artistAlbums, setArtistAlbums] = useState(null)
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const [isInfoButtonClicked, setIsInfoButtonClicked] = useState(false);
    const [albumNames, setAlbumNames] = useState({})
    const [isAddSongButtonClicked, setIsAddSongButtonClicked] = useState(false)
    const [isAddSongModalActive, setIsAddSongModalActive] = useState(false);


    const handleModalAction = async () => {
        setIsModalInfoActive(false)
        setIsModalTrashActive(false)
        setIsAddSongModalActive(false)

    }

    const handleInfoButtonClick = (albumId) => {
        setIsInfoButtonClicked(true);
        setSelectedAlbumId(albumId);
        setIsModalInfoActive(true);
        setIsAddSongModalActive(false);
    };

    const deleteAction = async (selectedAlbumId) => {
        await deleteAlbumById(selectedAlbumId);
        const artistAlbumsResult = await getAlbumsByArtist(artistId)
        const artistAlbumsData = artistAlbumsResult.data.data;
        setArtistAlbums(artistAlbumsData)
        setIsModalTrashActive(false);
    }

    const addSongAction = async (artistId, selectedAlbumId) => {
        setSelectedAlbumId(selectedAlbumId);
        setIsModalInfoActive(false); // Close the info modal if it's open
        setIsAddSongModalActive(true);
        setIsAddSongButtonClicked(true)

    }

    useEffect(() => {
        const fetchData = async () => {

            const artistAlbumsResult = await getAlbumsByArtist(artistId)
            const artistAlbumsData = artistAlbumsResult.data.data;

            for (const artistAlbum of artistAlbumsData) {
                albumNames[artistAlbum.id] = artistAlbum.title

            }


            setArtistAlbums(artistAlbumsData)
            setAlbumNames(albumNames)

            const perPage = 5


            setNumPages(artistAlbums && artistAlbums.length / perPage)
            setPageList([])



            for (let i = 0; i < numPages; i++) {
                pagesList.push(i)
            }


        }
        fetchData();
    }, [artistId]);


    return (
        <>
            <CardBoxModal
                title={albumNames[selectedAlbumId]}
                buttonColor="info"
                buttonLabel="Done"
                isActive={isModalInfoActive}
                onConfirm={handleModalAction}
                onCancel={handleModalAction}
            >
                {isInfoButtonClicked && (
                    <AlbumSongs albumId={selectedAlbumId} />
                )}
            </CardBoxModal>

            <CardBoxModal
                title="Add Song"
                buttonColor="void"
                buttonLabel="Done"
                isActive={isAddSongModalActive}
                onConfirm={handleModalAction}

            >
                {isAddSongButtonClicked && (

                    <AddSong artistId={artistId} albumId={selectedAlbumId} />

                )}
            </CardBoxModal>

            <CardBoxModal
                title="Please confirm"
                buttonColor="danger"
                buttonLabel="Confirm"
                isActive={isModalTrashActive}

                onConfirm={() => deleteAction(selectedAlbumId)}
                onCancel={handleModalAction}
            >
                <p>
                    Remove this album from the artist!
                </p>

            </CardBoxModal>

            <table>
                <thead>
                    <tr>
                        <th />
                        <th>Title</th>
                        <th>Total Tracks</th>
                        <th>Release Date</th>

                        <th />
                    </tr>
                </thead>
                <tbody>
                    {artistAlbums && Object.values(artistAlbums).map((artistAlbum) => (

                        <tr key={artistAlbum.id}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username={artistAlbum.title} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>
                            <td data-label="Title">{artistAlbum.title}</td>
                            <td data-label="Total Tracks">{artistAlbum.totalTracks}</td>
                            <td data-label="Release Date">{artistAlbum.releaseDate}</td>




                            <td className="before:hidden lg:w-1 whitespace-nowrap">
                                <BaseButtons type="justify-start lg:justify-end" noWrap>
                                    <BaseButton
                                        color="info"
                                        icon={mdiEye}
                                        onClick={() => { setSelectedAlbumId(artistAlbum.id); handleInfoButtonClick(artistAlbum.id) }}
                                        small
                                    />
                                    <BaseButton
                                        color="danger"
                                        icon={mdiTrashCan}
                                        onClick={() => {
                                            setSelectedAlbumId(artistAlbum.id);
                                            setIsModalTrashActive(true);
                                        }}
                                        small
                                    />
                                    <BaseButton
                                        color="void"
                                        icon={mdiPlus}
                                        onClick={() => { setSelectedAlbumId(artistAlbum.id); addSongAction(artistId, artistAlbum.id) }}
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