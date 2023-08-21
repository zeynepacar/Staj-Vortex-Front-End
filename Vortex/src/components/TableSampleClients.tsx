"use client"
import { mdiEye, mdiPlus, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'
import { getById } from './services/CountryService'
import { deleteUserById, getAllUsers, signIn, updatePassword } from './services/UserService'
import UserStatisticsTable from './UserStatisticsTable'
import { getMembershipByUser, getMembershipType } from './services/MembershipService'
import { getAllSongs, getSongById, getSongsByAlbum } from './services/SongService'
import LikedSongsTable from './LikedSongsTable'
import AddPlaylist from './AddPlaylist'
import UserPlaylist from './UserPlaylist'
import BaseDivider from './BaseDivider'



const TableSampleClients = () => {


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

      const usersResult = await getAllUsers();
      const usersData = usersResult.data.data;
      //console.log(usersData)

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

      const perPage = 5


      setNumPages(users && users.length / perPage)
      setPageList([])



      for (let i = 0; i < numPages; i++) {
        pagesList.push(i)
      }


    }
    fetchData();
  }, []);



  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
    setIsAddPlaylistModalActive(false)
  }

  const handleInfoButtonClick = (selectedUserId) => {
    setIsInfoButtonClicked(true);
    setSelectedUserId(selectedUserId);
    setIsModalInfoActive(true);
    setIsModalTrashActive(false); // Close the trash modal if it's open
    setIsAddPlaylistModalActive(false); // Close the add playlist modal if it's open
  };

  const deleteAction = async (selectedUserId) => {

    await deleteUserById(selectedUserId);
    const usersResult = await getAllUsers();
    const usersData = usersResult.data.data;
    setUsers(usersData);
    setIsModalTrashActive(false);
  }

  const addPlaylistAction = async (selectedUserId) => {
    setSelectedUserId(selectedUserId);
    setIsModalInfoActive(false); // Close the info modal if it's open
    setIsAddPlaylistModalActive(true);
    setIsAddPlaylistButtonClicked(true)

  }

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
          <>
            <UserStatisticsTable userId={selectedUserId} />
            <BaseDivider />
            <p><b>Liked Songs</b></p>

            <LikedSongsTable userId={selectedUserId} />
            <BaseDivider />
            <p><b>Playlists</b></p>
            <UserPlaylist userId={selectedUserId} />

          </>
        )}
      </CardBoxModal>

      <CardBoxModal
        title="Add Playlist"
        buttonColor="void"
        buttonLabel="Done"
        isActive={isAddPlaylistModalActive}
        onConfirm={handleModalAction}

      >
        {isAddPlaylistButtonClicked && (

          <AddPlaylist userId={selectedUserId} />

        )}
      </CardBoxModal>

      <CardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={() => deleteAction(selectedUserId)}
        onCancel={handleModalAction}
      >
        <p>Delete this user!</p>
      </CardBoxModal>

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
                  <BaseButton
                    color="info"
                    icon={mdiEye}
                    onClick={() => { setSelectedUserId(user.id); handleInfoButtonClick(user.id) }}
                    small
                  />
                  <BaseButton
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => {
                      setSelectedUserId(user.id);
                      setIsModalTrashActive(true);
                    }}
                    small
                  />
                  <BaseButton
                    color="void"
                    icon={mdiPlus}
                    onClick={() => { setSelectedUserId(user.id); addPlaylistAction(user.id) }}
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

export default TableSampleClients
