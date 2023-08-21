"use client"
import { mdiEye, mdiPlus, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'
import { getById } from './services/CountryService'
import { deleteUserById, getFreeUsers, getPremiumUsers, getStudentUsers, signIn, updatePassword } from './services/UserService'
import UserStatisticsTable from './UserStatisticsTable'
import { getMembershipByUser, getMembershipType } from './services/MembershipService'
import { getAllSongs, getSongById, getSongsByAlbum } from './services/SongService'
import LikedSongsTable from './LikedSongsTable'
import AddPlaylist from './AddPlaylist'
import UserPlaylist from './UserPlaylist'
import BaseDivider from './BaseDivider'

const UserMemberships = ({ membershipId }) => {

    const [currentPage, setCurrentPage] = useState(0)
    const [users, setUsers] = useState(null);
    const [countryNames, setCountryNames] = useState({});
    const [pagesList, setPageList] = useState([]);
    const [numPages, setNumPages] = useState(0);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isModalInfoActive, setIsModalInfoActive] = useState(false)
    const [isModalTrashActive, setIsModalTrashActive] = useState(false)
    const [isInfoButtonClicked, setIsInfoButtonClicked] = useState(false);
    const [memberships, setMemberships] = useState({})
    const [membershipTypes, setMembershipTypes] = useState({})
    const [isAddPlaylistButtonClicked, setIsAddPlaylistButtonClicked] = useState(false)
    const [isAddPlaylistModalActive, setIsAddPlaylistModalActive] = useState(false);


    useEffect(() => {
        const fetchData = async () => {



            console.log(membershipId)

            if (membershipId == 1) {
                console.log("sdfs")
                const usersResult = await getFreeUsers();
                const usersData = usersResult.data.data;
                userInfo(usersData)
            } else if (membershipId == 2) {
                const usersResult = await getPremiumUsers();
                const usersData = usersResult.data.data;

                userInfo(usersData)

            } else if (membershipId == 3) {
                const usersResult = await getStudentUsers();
                const usersData = usersResult.data.data;

                userInfo(usersData)
            }




            const perPage = 5


            setNumPages(users && users.length / perPage)
            setPageList([])



            for (let i = 0; i < numPages; i++) {
                pagesList.push(i)
            }


        }
        fetchData();
    }, []);

    const userInfo = async function (usersData) {
        const countryNames = {};
        const memberships = {};

        for (const user of usersData) {

            const country = await getById(user.countryId);
            console.log(country.data.data)
            countryNames[user.id] = country.data.data.countryName;

            const membershipsResults = await getMembershipByUser(user.id);
            const membershipsData = membershipsResults.data.data


            for (const membership of membershipsData) {
                memberships[user.id] = membership

                const membershipType = await getMembershipType(membership.membershipTypeId)
                membershipTypes[user.id] = membershipType.data.data.type


            }

        }



        setUsers(usersData);
        setCountryNames(countryNames);
        setMemberships(memberships)
        setMembershipTypes(membershipTypes)


    };




    return (
        <>


            <table>
                <thead>
                    <tr>
                        <th />
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Membership</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {users && Object.values(users).map((user) => (

                        <tr key={user.id}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username={user.userName} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>
                            <td data-label="Name">{user.userName}</td>
                            <td data-label="Email">{user.email}</td>
                            <td data-label="City">{countryNames[user.id]}</td>
                            <td data-label="Membership">{membershipTypes[user.id]}</td>
                            <td data-label="Start Date">{memberships[user.id].startDate}</td>
                            <td data-label="End Date">{memberships[user.id].endDate}</td>


                            <td className="before:hidden lg:w-1 whitespace-nowrap">
                                <BaseButtons type="justify-start lg:justify-end" noWrap>

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

export default UserMemberships
