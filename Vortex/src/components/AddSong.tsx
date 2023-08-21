import {
    mdiAccount,
    mdiAlbum,
    mdiAsterisk,
    mdiFormTextboxPassword,
    mdiGithub,
    mdiMail,
    mdiUpload,
} from '@mdi/js'
import { Formik, Form, Field, useFormikContext, FormikContext } from 'formik'
import Head from 'next/head'
import type { ReactElement } from 'react'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import BaseDivider from './BaseDivider'
import CardBox from './CardBox'
import CardBoxComponentBody from './CardBoxComponentBody'
import CardBoxComponentFooter from './CardBoxComponentFooter'
import FormField from './FormField'
import FormFilePicker from './FormFilePicker'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from './SectionMain'
import SectionTitleLineWithButton from './SectionTitleLineWithButton'
import UserCard from './UserCard'
import { getPageTitle } from '../config'
import { useRouter } from 'next/router'
//import UserService from '../components/services/UserService'
import { addUser, getAllUsers, signIn, updatePassword } from './services/UserService'
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllCountries } from './services/CountryService'
import { addArtist, getAllArtists } from './services/ArtistService'
import { addPlaylist } from './services/PlaylistService'
import { addAlbum, getAlbumsByArtist, getAllAlbums } from './services/AlbumService'
import { addSong } from './services/SongService'
import { getAllGenres } from './services/GenreService'
import FormCheckRadio from './FormCheckRadio'
import FormCheckRadioGroup from './FormCheckRadioGroup'



interface Song {
    isrc: string,
    title: string,
    genreId: number,
    artistId: number,
    albumId: number,
    image: string,
    duration: string,
    availableMarkets: string
}



const AddSong = () => {



    const [genres, setGenres] = useState([])
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [selectedArtistId, setSelectedArtistId] = useState(0);
    const [countries, setCountries] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const genresResult = await getAllGenres();
            const genresData = genresResult.data.data;

            const artistsResult = await getAllArtists();
            const artistsData = artistsResult.data.data;

            const countriesResult = await getAllCountries();
            const countriesData = countriesResult.data.data;
            console.log(countriesData)
            setCountries(countriesData);


            setGenres(genresData);
            setArtists(artistsData)


        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchAlbums = async () => {
            console.log(selectedArtistId)
            const albumsResult = await getAlbumsByArtist(selectedArtistId);
            const albumsData = albumsResult.data.data;

            setAlbums(albumsData);
        };

        if (selectedArtistId !== 0) {
            fetchAlbums();
        }
    }, [selectedArtistId]);

    const handleSubmit = async (values: Song) => {


        console.log(values.isrc, values.title, values.genreId, selectedArtistId, values.albumId, values.image, values.duration)

        try {
            const result = await addSong(values.isrc, values.title, values.genreId, selectedArtistId, values.albumId, values.image, values.duration, values.availableMarkets);

            if (result.data.success) {
                console.log(result.data)



            }

        } catch (error) {
            // Handle the error here
            console.error('Error:', error);
        }
    };





    return (
        <>
            <Head>
                <title>{getPageTitle('Add Song')}</title>
            </Head>

            <SectionMain>
                <SectionTitleLineWithButton icon={mdiAccount} title="Add Song" main>

                </SectionTitleLineWithButton>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                    <div className="flex flex-col">

                    </div>

                    <CardBox hasComponentLayout>
                        <Formik
                            initialValues={{
                                isrc: "",
                                title: "",
                                genreId: 0,
                                artistId: selectedArtistId,
                                albumId: 0,
                                image: "",
                                duration: "",
                                availableMarkets: "1,2"

                            }}
                            onSubmit={async (values, { resetForm }) => {
                                await handleSubmit(values);
                                resetForm();
                            }}

                        >

                            <Form className="flex flex-col flex-1" >
                                <CardBoxComponentBody>
                                    <FormField label="ISRC" icons={[mdiAlbum]}>
                                        <Field name="isrc" placeholder="ISRC" />
                                    </FormField>
                                    <FormField label="Title" icons={[mdiAlbum]}>
                                        <Field name="title" placeholder="Title" />
                                    </FormField>
                                    <FormField label="Artist" labelFor="artistId">
                                        <Field name="artistId" id="artistId" as="select" value={selectedArtistId} onChange={(e) => setSelectedArtistId(parseInt(e.target.value, 10))} >
                                            <option value="Select an Artist">Select an Artist</option>
                                            {artists.map((artist) => (

                                                <option key={artist.id} value={artist.id}>
                                                    {artist.fullName}
                                                </option>
                                            ))}
                                        </Field>

                                    </FormField>
                                    <FormField label="Album" labelFor="albumId">
                                        <Field name="albumId" id="albumId" as="select" >
                                            <option value="Select an Album">Select an Album</option>
                                            {albums.map((album) => (

                                                <option key={album.id} value={album.id}>
                                                    {album.title}
                                                </option>
                                            ))}
                                        </Field>
                                    </FormField>
                                    <FormField label="Duration" icons={[mdiAlbum]}>
                                        <Field name="duration" placeholder="Duration" />
                                    </FormField>
                                    <FormField label="Genre" labelFor="genreId">
                                        <Field name="genreId" id="genreId" as="select" >
                                            <option value="Select a Genre">Select a Genre</option>
                                            {genres.map((genre) => (

                                                <option key={genre.id} value={genre.id}>
                                                    {genre.title}
                                                </option>
                                            ))}
                                        </Field>
                                    </FormField>





                                </CardBoxComponentBody>

                                <CardBoxComponentFooter>
                                    <BaseButtons>
                                        <BaseButton color="info" type="submit" label="Submit" />
                                        <BaseButton color="info" label="Options" outline />
                                    </BaseButtons>
                                </CardBoxComponentFooter>
                            </Form>
                        </Formik>
                    </CardBox>
                </div>
            </SectionMain >
        </>
    )
}

AddSong.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default AddSong
