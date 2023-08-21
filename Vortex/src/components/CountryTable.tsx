"use client"
import React, { useState, useEffect } from 'react'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import UserAvatar from './UserAvatar'
import { getAllCountries } from './services/CountryService'

const CountryTable = () => {

    const [pagesList, setPageList] = useState([]);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [playlistSongs, setPlaylistSongs] = useState(null);
    const [countries, setCountries] = useState({})


    useEffect(() => {
        const fetchData = async () => {

            const countriesResult = await getAllCountries();
            const countriesData = countriesResult.data.data;

            setCountries(countriesData);


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


            <table>
                <thead>
                    <tr>
                        <th>Country</th>


                        <th />
                    </tr>
                </thead>
                <tbody>
                    {countries && Object.values(countries).map((country) => (

                        <tr key={country.id}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username={country.countryName} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>

                            <td data-label="Country">{country.countryName}</td>




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

export default CountryTable