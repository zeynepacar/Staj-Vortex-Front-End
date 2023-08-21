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
import { updatePassword } from '../components/services/UserService'
import { useState } from 'react';
import { useEffect } from 'react';

interface UserInfo {
  userName: string
  email: string
}

interface UserUpdatePassword {
  id: number
  oldPassword: string
  newPassword: string
  newPasswordRepeat: string
}

const ProfilePage = () => {
  const router = useRouter();

  const { userId, userName, userEmail } = router.query;
  console.log("profil " + userId + " " + userName + " " + userEmail)


  const updateUserPassword = async function (id, oldPassword, newPassword, newPasswordRepeat) {
    try {
      return updatePassword(id, oldPassword, newPassword, newPasswordRepeat)

    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
      throw error;
    }
  }
  const handleSubmitUpdate = async (values: UserUpdatePassword) => {
    try {
      const result = await updateUserPassword(parseInt(userId as string), values.oldPassword, values.newPassword, values.newPasswordRepeat);
      if (result.data.success) {
        console.log(result.data)



      }

    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
    }
  };

  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values);
    console.log("profil " + userId + " " + userName + " " + userEmail)
  };



  return (
    <>
      <Head>
        <title>{getPageTitle('Profile')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiAccount} title="Profile" main>
          <BaseButton
            href="https://github.com/justboil/admin-one-react-tailwind"
            target="_blank"
            icon={mdiGithub}
            label="Star on GitHub"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <UserCard className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <CardBox className="mb-6">
              <FormField label="Avatar" help="Max 500kb">
                <FormFilePicker label="Upload" color="info" icon={mdiUpload} />
              </FormField>
            </CardBox>

            <CardBox className="flex-1" hasComponentLayout>
              <Formik
                initialValues={{ userName: userName, userEmail: userEmail }}
                onSubmit={handleSubmit}
              >
                <Form className="flex flex-col flex-1">
                  <CardBoxComponentBody>
                    <FormField
                      label="Name"
                      help="Your name"
                      labelFor="name"
                      icons={[mdiAccount]}
                    >
                      <Field name={userName} id="name" placeholder={userName} />
                    </FormField>
                    <FormField
                      label="E-mail"
                      help="Your e-mail"
                      labelFor="email"
                      icons={[mdiMail]}
                    >
                      <Field name={userEmail} id="email" placeholder={userEmail} />
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

          <CardBox hasComponentLayout>
            <Formik
              initialValues={{
                id: 0,
                oldPassword: '',
                newPassword: '',
                newPasswordRepeat: '',
              }}
              onSubmit={async (values, { resetForm }) => {
                await handleSubmitUpdate(values);
                resetForm();
              }}

            >

              <Form className="flex flex-col flex-1" >
                <CardBoxComponentBody>
                  <FormField
                    label="Current password"
                    help="Required. Your current password"
                    labelFor="currentPassword"
                    icons={[mdiAsterisk]}
                  >
                    <Field
                      name="oldPassword"
                      id="currentPassword"
                      type="password"


                    />
                  </FormField>

                  <BaseDivider />

                  <FormField
                    label="New password"
                    help="Required. New password"
                    labelFor="newPassword"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field
                      name="newPassword"
                      id="newPassword"
                      type="password"



                    />
                  </FormField>

                  <FormField
                    label="Confirm password"
                    help="Required. New password one more time"
                    labelFor="newPasswordConfirmation"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field
                      name="newPasswordRepeat"
                      id="newPasswordConfirmation"
                      type="password"


                    />
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

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ProfilePage
