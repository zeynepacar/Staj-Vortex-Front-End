"use client"
import { mdiEye, mdiPlus, mdiTrashCan } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'
import ArtistAlbumsTable from './ArtistAlbumsTable'
import { getAllArtists } from './services/ArtistService'
import AddAlbum from './AddAlbum'



const ArtistsTable = () => {


    const [currentPage, setCurrentPage] = useState(0)
    const [artists, setArtists] = useState(null);
    const [countryNames, setCountryNames] = useState({});
    const [pagesList, setPageList] = useState([]);
    const [numPages, setNumPages] = useState(0);
    const [selectedArtistId, setSelectedArtistId] = useState(null);
    const [isModalInfoActive, setIsModalInfoActive] = useState(false)
    const [isModalTrashActive, setIsModalTrashActive] = useState(false)
    const [isInfoButtonClicked, setIsInfoButtonClicked] = useState(false);
    const [artistNames, setArtistNames] = useState({})
    const [isAddAlbumButtonClicked, setIsAddAlbumButtonClicked] = useState(false)
    const [isAddAlbumModalActive, setIsAddAlbumModalActive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {



            const artistsResult = await getAllArtists();
            const artistsData = artistsResult.data.data;

            for (const artist of artistsData) {
                artistNames[artist.id] = artist.fullName
            }

            setArtists(artistsData);
            setArtistNames(artistNames)


            const perPage = 5


            setNumPages(artists && artists.length / perPage)
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
        setIsAddAlbumModalActive(false)
    }

    const handleInfoButtonClick = (artistId) => {
        setIsInfoButtonClicked(true);
        setSelectedArtistId(artistId);
        setIsModalInfoActive(true);
        setIsModalTrashActive(false); // Close the trash modal if it's open
        setIsAddAlbumModalActive(false); // Close the add playlist modal if it's open
    };

    const addAlbumAction = async (selectedArtistId) => {
        setSelectedArtistId(selectedArtistId);
        setIsModalInfoActive(false); // Close the info modal if it's open
        setIsAddAlbumModalActive(true);
        setIsAddAlbumButtonClicked(true)

    }

    return (
        <>
            <CardBoxModal
                title={artistNames[selectedArtistId]}
                buttonColor="info"
                buttonLabel="Done"
                isActive={isModalInfoActive}
                onConfirm={handleModalAction}
                onCancel={handleModalAction}
            >
                {isInfoButtonClicked && (
                    <ArtistAlbumsTable artistId={selectedArtistId} />
                )}
            </CardBoxModal>

            <CardBoxModal
                title="Add Album"
                buttonColor="void"
                buttonLabel="Done"
                isActive={isAddAlbumModalActive}
                onConfirm={handleModalAction}

            >
                {isAddAlbumButtonClicked && (

                    <AddAlbum artistId={selectedArtistId} />

                )}
            </CardBoxModal>


            <table>
                <thead>
                    <tr>
                        <th />
                        <th>Full Name</th>
                        <th>About</th>

                        <th />
                    </tr>
                </thead>
                <tbody>
                    {artists && Object.values(artists).map((artist) => (

                        <tr key={artist.id}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username={artist.fullName} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>
                            <td data-label="Full Name">{artist.fullName}</td>
                            <td data-label="About">{artist.about}</td>


                            <td className="before:hidden lg:w-1 whitespace-nowrap">
                                <BaseButtons type="justify-start lg:justify-end" noWrap>
                                    <BaseButton
                                        color="info"
                                        icon={mdiEye}
                                        onClick={() => { setSelectedArtistId(artist.id); handleInfoButtonClick(artist.id) }}
                                        small
                                    />
                                    <BaseButton
                                        color="void"
                                        icon={mdiPlus}
                                        onClick={() => { setSelectedArtistId(artist.id); addAlbumAction(artist.id) }}
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

export default ArtistsTable
