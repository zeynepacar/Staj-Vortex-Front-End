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
import SongTable from './SongTable';
import ReactDOM from 'react-dom';





const PlaylistTable = () => {
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

    const handleModalAction = async () => {
        setIsModalInfoActive(false)
        setIsModalTrashActive(false)


    }

    const handleInfoButtonClick = (playlistId) => {
        setIsInfoButtonClicked(true);
        setSelectedPlaylistId(playlistId);
        setIsModalInfoActive(true);
    };

    const deleteAction = async (selectedPlaylistId) => {
        //console.log("silienecek playlist id: " + selectedPlaylistId)
        await deletePlaylist(selectedPlaylistId);
        const playlistsResult = await getAllPlaylist();
        const playlistsData = playlistsResult.data.data;
        setPlaylists(playlistsData);
        setIsModalTrashActive(false);
    }


    useEffect(() => {
        const fetchData = async () => {




            const playlistsResult = await getAllPlaylist();
            const playlistsData = playlistsResult.data.data;
            //console.log("playlist" + playlistsData)

            const userNames = {};
            for (const playlist of playlistsData) {
                const user = await getUserById(playlist.userId)
                // console.log(user)
                // console.log(user.data.data.userName)
                userNames[playlist.id] = user.data.data.userName;
            }


            setPlaylists(playlistsData);
            setUserNames(userNames);

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
                <p><b>By: {userNames[selectedPlaylistId]}</b></p>
                {isInfoButtonClicked && (
                    <SongTable playlistId={selectedPlaylistId} />
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
                        <th>User</th>
                        <th>Total Songs</th>
                        <th>Creation Date</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {playlists && Object.values(playlists).map((playlist) => (

                        <tr key={playlist.id}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username={userNames[playlist.id]} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>
                            <td data-label="Title">{playlist.title}</td>
                            <td data-label="User">{userNames[playlist.id]}</td>
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
