"use client"
import React from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/SectionFullScreen'
import LayoutGuest from '../layouts/Guest'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/FormField'
import FormCheckRadio from '../components/FormCheckRadio'
import BaseDivider from '../components/BaseDivider'
import BaseButtons from '../components/BaseButtons'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
//import UserService from '../components/services/UserService'
import { getAllUsers, signIn, updatePassword } from '../components/services/UserService'
import NotificationBar from '../components/NotificationBar'
import { mdiAlert, mdiAlertCircle } from '@mdi/js'

interface FormValues {
  loginCredential: string;
  password: string;
}

const LoginPage = () => {

  const router = useRouter()

  const signInUser = async function (loginCredential, password) {
    try {
      //const userService = new UserService();
      return signIn(loginCredential, password);

    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
      throw error;
    }
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const result = await signInUser(values.loginCredential, values.password);
      if (result.data.success) {

        console.log(result.data.data.email)

        router.push(`/profile?userId=${result.data.data.id}&userName=${result.data.data.userName}&userEmail=${result.data.data.email}`);
        localStorage.setItem("userName", result.data.data.userName)
        //localStorage.setItem("userEmail", result.data.data.userEmail)

      }

    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <Formik
            initialValues={{ loginCredential: '', password: '' }}
            onSubmit={handleSubmit}
          >
            <Form>
              {/* Form fields */}
              <FormField label="Login" help="Please enter your login credential">
                <Field name="loginCredential" type="text" />
              </FormField>

              <FormField label="Password" help="Please enter your password">
                <Field name="password" type="password" />
              </FormField>

              <BaseDivider />

              <BaseButtons>
                <BaseButton type="submit" label="Login" color="info" />
                <BaseButton href="/dashboard" label="Home" color="info" outline />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default LoginPage;