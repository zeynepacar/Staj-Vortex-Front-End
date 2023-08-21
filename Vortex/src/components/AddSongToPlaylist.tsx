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
import { addArtist } from './services/ArtistService'
import { addPlaylist } from './services/PlaylistService'
import { addAlbum } from './services/AlbumService'
import { addSong, getAllSongs } from './services/SongService'
import { getAllGenres } from './services/GenreService'
import { addSongToPlaylist } from './services/PlaylistSongService'

interface PlaylistSong {
    playlistId: number
    songId: number

}

const AddSongToPlaylist = ({ playlistId }) => {

    const [songs, setSongs] = useState([])


    useEffect(() => {
        const fetchData = async () => {

            const songsResult = await getAllSongs();
            const songsData = songsResult.data.data;

            setSongs(songsData);





        }
        fetchData();
    }, [playlistId]);

    const handleSubmit = async (values: PlaylistSong) => {


        try {
            const result = await addSongToPlaylist(values.playlistId, values.songId);

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
                                playlistId: playlistId,
                                songId: 0
                            }}
                            onSubmit={async (values, { resetForm }) => {
                                await handleSubmit(values);
                                resetForm();
                            }}

                        >

                            <Form className="flex flex-col flex-1" >
                                <CardBoxComponentBody>
                                    <FormField label="Song" labelFor="songId">
                                        <Field name="songId" id="songId" as="select" >
                                            <option value="Select a Song">Select a Song</option>
                                            {songs.map((song) => (

                                                <option key={song.id} value={song.id}>
                                                    {song.title}
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

AddSongToPlaylist.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default AddSongToPlaylist
