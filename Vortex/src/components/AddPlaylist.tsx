import {
    mdiAccount,
    mdiAsterisk,
    mdiFormTextboxPassword,
    mdiGithub,
    mdiMail,
    mdiUpload,
} from '@mdi/js'
import { Formik, Form, Field, useFormikContext, FormikContext } from 'formik'
import Head from 'next/head'
import type { ReactElement } from 'react'
import BaseButton from '../components/BaseButton'
import BaseButtons from '../components/BaseButtons'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import CardBoxComponentBody from '../components/CardBoxComponentBody'
import CardBoxComponentFooter from '../components/CardBoxComponentFooter'
import FormField from '../components/FormField'
import FormFilePicker from '../components/FormFilePicker'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import UserCard from '../components/UserCard'
import { getPageTitle } from '../config'
import { useRouter } from 'next/router'
//import UserService from '../components/services/UserService'
import { addUser, getAllUsers, signIn, updatePassword } from '../components/services/UserService'
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllCountries } from './services/CountryService'
import { addArtist } from './services/ArtistService'
import { addPlaylist } from './services/PlaylistService'

interface Playlist {
    userId: number
    title: string
}

const AddPlaylist = ({ userId }) => {

    useEffect(() => {
        const fetchData = async () => {

            console.log(userId)



        }
        fetchData();
    }, [userId]);

    const handleSubmit = async (values: Playlist) => {
        console.log(values.title + userId)
        try {
            const result = await addPlaylist(values.userId, values.title);
            console.log(values.title + values.userId)

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
                <title>{getPageTitle('Add Playlist')}</title>
            </Head>

            <SectionMain>
                <SectionTitleLineWithButton icon={mdiAccount} title="Add Playlist" main>

                </SectionTitleLineWithButton>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                    <div className="flex flex-col">

                    </div>

                    <CardBox hasComponentLayout>
                        <Formik
                            initialValues={{
                                userId: userId,
                                title: ""
                            }}
                            onSubmit={async (values, { resetForm }) => {
                                await handleSubmit(values);
                                resetForm();
                            }}

                        >

                            <Form className="flex flex-col flex-1" >
                                <CardBoxComponentBody>
                                    <FormField label="Playlist Title" icons={[mdiAccount]}>
                                        <Field name="title" placeholder="Playlist Title" />
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
            </SectionMain>
        </>
    )
}

AddPlaylist.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default AddPlaylist
