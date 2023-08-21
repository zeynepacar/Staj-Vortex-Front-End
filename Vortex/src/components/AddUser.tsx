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

interface User {
    userName: string;
    email: string;
    password: string;
    image: string
    countryId: number
}

const AddUserPage = () => {

    const [countries, setCountries] = useState([]);



    useEffect(() => {
        const fetchData = async () => {

            const countriesResult = await getAllCountries();
            const countriesData = countriesResult.data.data;
            console.log(countriesData)
            setCountries(countriesData);


        }
        fetchData();
    }, []);

    const handleSubmit = async (values: User) => {
        try {
            const result = await addUser(values.userName, values.email, values.password, values.image, values.countryId);
            console.log(values.userName, values.email, values.password, values.image, values.countryId)
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
                <title>{getPageTitle('Add User')}</title>
            </Head>

            <SectionMain>
                <SectionTitleLineWithButton icon={mdiAccount} title="Add User" main>

                </SectionTitleLineWithButton>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                    <div className="flex flex-col">

                    </div>

                    <CardBox hasComponentLayout>
                        <Formik
                            initialValues={{
                                userName: "",
                                email: '',
                                password: '',
                                image: '',
                                countryId: 0
                            }}
                            onSubmit={async (values, { resetForm }) => {
                                await handleSubmit(values);
                                resetForm();
                            }}

                        >

                            <Form className="flex flex-col flex-1" >
                                <CardBoxComponentBody>
                                    <FormField label="User Name" icons={[mdiAccount]}>
                                        <Field name="userName" placeholder="User Name" />
                                    </FormField>
                                    <FormField label="Email" icons={[mdiMail]}>
                                        <Field type="email" name="email" placeholder="Email" />
                                    </FormField>

                                    <FormField
                                        label="Password"
                                        labelFor="password"
                                        icons={[mdiAsterisk]}
                                    >
                                        <Field
                                            name="password"
                                            id="password"
                                            type="password"


                                        />
                                    </FormField>

                                    <FormField label="Country" labelFor="countryId">
                                        <Field name="countryId" id="countryId" as="select" >
                                            <option value="Select a Country">Select a Country</option>
                                            {countries.map((country) => (

                                                <option key={country.id} value={country.id}>
                                                    {country.countryName}
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
            </SectionMain>
        </>
    )
}

AddUserPage.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default AddUserPage
