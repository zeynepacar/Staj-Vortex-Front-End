"use client"
import { mdiEye, mdiPlus, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'
//import UserService from './services/UserService'
import { deletePlaylist, getAllPlaylist, getPlaylistByUser } from './services/PlaylistService'
import SongTable from './SongTable';
import AddSongToPlaylist from './AddSongToPlaylist'



const PlaylistTable = ({ userId }) => {
    const [isModalInfoActive, setIsModalInfoActive] = useState(false)
    const [isModalTrashActive, setIsModalTrashActive] = useState(false)
    const [playlists, setPlaylists] = useState(null);
    const [userNames, setUserNames] = useState({});
    const [pagesList, setPageList] = useState([]);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
    const [isInfoButtonClicked, setIsInfoButtonClicked] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null)
    const [isAddSongButtonClicked, setIsAddSongButtonClicked] = useState(false)
    const [isAddSongModalActive, setIsAddSongModalActive] = useState(false);

    const handleModalAction = async () => {
        setIsModalInfoActive(false)
        setIsModalTrashActive(false)
        setIsAddSongModalActive(false)


    }

    const handleInfoButtonClick = (playlistId) => {
        setIsInfoButtonClicked(true);
        setSelectedPlaylistId(playlistId);
        setIsModalInfoActive(true);
        setIsAddSongModalActive(false);
    };

    const deleteAction = async (selectedPlaylistId) => {
        //console.log("silienecek playlist id: " + selectedPlaylistId)
        await deletePlaylist(selectedPlaylistId);
        const playlistsResult = await getAllPlaylist();
        const playlistsData = playlistsResult.data.data;
        setPlaylists(playlistsData);
        setIsModalTrashActive(false);
    }

    const addSongPlaylistAction = async (selectedPlaylistId) => {
        setSelectedPlaylistId(selectedPlaylistId);
        setIsModalInfoActive(false); // Close the info modal if it's open
        setIsAddSongModalActive(true);
        setIsAddSongButtonClicked(true)

    }


    useEffect(() => {
        const fetchData = async () => {




            const playlistsResult = await getPlaylistByUser(userId);
            const playlistsData = playlistsResult.data.data;


            setPlaylists(playlistsData);

            const perPage = 5


            setNumPages(playlists && playlists.length / perPage)
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
                title={selectedPlaylist}
                buttonColor="info"
                buttonLabel="Done"
                isActive={isModalInfoActive}
                onConfirm={handleModalAction}
                onCancel={handleModalAction}
            >

                {isInfoButtonClicked && (
                    <SongTable playlistId={selectedPlaylistId} />
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

                    <AddSongToPlaylist playlistId={selectedPlaylistId} />

                )}
            </CardBoxModal>

            <CardBoxModal
                title="Please confirm"
                buttonColor="danger"
                buttonLabel="Confirm"
                isActive={isModalTrashActive}

                onConfirm={() => deleteAction(selectedPlaylistId)}
                onCancel={handleModalAction}
            >
                <p>
                    Delete this playlist!
                </p>

            </CardBoxModal>

            <table>
                <thead>
                    <tr>
                        <th />
                        <th>Title</th>

                        <th>Total Songs</th>
                        <th>Creation Date</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {playlists && Object.values(playlists).map((playlist) => (

                        <tr key={playlist.id}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username={playlist.title} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>
                            <td data-label="Title">{playlist.title}</td>
                            <td data-label="Total Songs">{playlist.numberOfSongs}</td>
                            <td data-label="Creation Date">{playlist.creationDate}</td>


                            <td className="before:hidden lg:w-1 whitespace-nowrap">
                                <BaseButtons type="justify-start lg:justify-end" noWrap>
                                    <BaseButton
                                        color="info"
                                        icon={mdiEye}
                                        onClick={() => { setSelectedPlaylistId(playlist.id); setSelectedPlaylist(playlist.title); handleInfoButtonClick(playlist.id) }}
                                        small
                                    />
                                    <BaseButton
                                        color="danger"
                                        icon={mdiTrashCan}
                                        onClick={() => {
                                            setSelectedPlaylistId(playlist.id);
                                            setIsModalTrashActive(true);
                                        }}
                                        small
                                    />
                                    <BaseButton
                                        color="void"
                                        icon={mdiPlus}
                                        onClick={() => { setSelectedPlaylistId(playlist.id); addSongPlaylistAction(playlist.id) }}
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

export default PlaylistTable
