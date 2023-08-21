"use client"
import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'
//import UserService from './services/UserService'
import { deleteAlbumById, getAlbumById, getAlbumsByArtist, getAllAlbums } from './services/AlbumService'
import AlbumSongs from './AlbumSongs'
import { getArtistById } from './services/ArtistService'

const AlbumsTable = () => {

    const [isModalInfoActive, setIsModalInfoActive] = useState(false)
    const [isModalTrashActive, setIsModalTrashActive] = useState(false)
    const [pagesList, setPageList] = useState([]);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const [isInfoButtonClicked, setIsInfoButtonClicked] = useState(false);
    const [artists, setArtists] = useState({})
    const [albums, setAlbums] = useState(null)
    const [albumNames, setAlbumNames] = useState({})


    const handleModalAction = async () => {
        setIsModalInfoActive(false)
        setIsModalTrashActive(false)

    }

    const handleInfoButtonClick = (albumId) => {
        setIsInfoButtonClicked(true);
        setSelectedAlbumId(albumId);
        setIsModalInfoActive(true);
    };

    const deleteAction = async (selectedAlbumId) => {
        await deleteAlbumById(selectedAlbumId);
        const albumsResult = await getAllAlbums()
        const albumsData = albumsResult.data.data;
        setAlbums(albumsData)
        setIsModalTrashActive(false);
    }

    useEffect(() => {
        const fetchData = async () => {

            const albumsResult = await getAllAlbums()
            const albumsData = albumsResult.data.data;

            for (const album of albumsData) {
                const artist = await getArtistById(album.artistId)
                artists[album.id] = artist.data.data.fullName

                albumNames[album.id] = album.title

            }


            setAlbums(albumsData)
            setArtists(artists)
            setAlbumNames(albumNames)

            const perPage = 5


            setNumPages(albums && albums.length / perPage)
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
                title="Please confirm"
                buttonColor="danger"
                buttonLabel="Confirm"
                isActive={isModalTrashActive}

                onConfirm={() => deleteAction(selectedAlbumId)}
                onCancel={handleModalAction}
            >
                <p>
                    Delete this album!
                </p>

            </CardBoxModal>

            <table>
                <thead>
                    <tr>
                        <th />
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Total Tracks</th>
                        <th>Release Date</th>

                        <th />
                    </tr>
                </thead>
                <tbody>
                    {albums && Object.values(albums).map((album) => (

                        <tr key={album.id}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username={artists[album.id].fullname} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>
                            <td data-label="Title">{album.title}</td>
                            <td data-label="Artist">{artists[album.id]}</td>
                            <td data-label="Total Tracks">{album.totalTracks}</td>
                            <td data-label="Release Date">{album.releaseDate}</td>




                            <td className="before:hidden lg:w-1 whitespace-nowrap">
                                <BaseButtons type="justify-start lg:justify-end" noWrap>
                                    <BaseButton
                                        color="info"
                                        icon={mdiEye}
                                        onClick={() => { setSelectedAlbumId(album.id); handleInfoButtonClick(album.id) }}
                                        small
                                    />
                                    <BaseButton
                                        color="danger"
                                        icon={mdiTrashCan}
                                        onClick={() => {
                                            setSelectedAlbumId(album.id);
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

export default AlbumsTable