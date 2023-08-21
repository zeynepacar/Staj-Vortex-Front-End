"use client"
import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'
import { getAllGenres, getGenreById } from './services/GenreService'
import GenreSongTable from './GenreSongs'
import { getAllMembership } from './services/MembershipService'
import UserMemberships from './UserMemberships'

const MembershipTable = () => {

    const [isModalInfoActive, setIsModalInfoActive] = useState(false)
    const [isModalTrashActive, setIsModalTrashActive] = useState(false)
    const [pagesList, setPageList] = useState([]);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [playlistSongs, setPlaylistSongs] = useState(null);
    const [selectedMembershipId, setSelectedMembershipId] = useState(null);
    const [memberships, setMemberships] = useState({})
    const [isInfoButtonClicked, setIsInfoButtonClicked] = useState(false);

    const handleModalAction = async () => {
        setIsModalInfoActive(false)


    }

    const handleInfoButtonClick = (selectedMembershipId) => {
        setIsInfoButtonClicked(true);
        setSelectedMembershipId(selectedMembershipId);
        setIsModalInfoActive(true);


    };

    useEffect(() => {
        const fetchData = async () => {

            const membrshipsResult = await getAllMembership();
            const membershipsData = membrshipsResult.data.data;

            setMemberships(membershipsData);


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

                    <UserMemberships membershipId={selectedMembershipId} />

                )}
            </CardBoxModal>


            <table>
                <thead>
                    <tr>
                        <th />
                        <th>Type</th>
                        <th>Price</th>

                        <th />
                    </tr>
                </thead>
                <tbody>
                    {memberships && Object.values(memberships).map((membership) => (

                        <tr key={membership.id}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username={membership.type} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>

                            <td data-label="Type">{membership.type}</td>
                            <td data-label="Price">{membership.price}</td>




                            <td className="before:hidden lg:w-1 whitespace-nowrap">
                                <BaseButtons type="justify-start lg:justify-end" noWrap>
                                    <BaseButton
                                        color="info"
                                        icon={mdiEye}
                                        onClick={() => { setSelectedMembershipId(membership.id); handleInfoButtonClick(membership.id) }}
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

export default MembershipTable