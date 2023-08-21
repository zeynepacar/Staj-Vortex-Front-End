import { mdiFormSelect, mdiGithub, mdiMonitorCellphone, mdiTableBorder, mdiTableOff } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import CardBoxComponentEmpty from '../components/CardBoxComponentEmpty'
import LayoutAuthenticated from '../layouts/Authenticated'
import NotificationBar from '../components/NotificationBar'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import TableSampleClients from '../components/TableSampleClients'
import { getPageTitle } from '../config'
import PlaylistTable from '../components/PlaylistTable'
import SongTable from '../components/SongTable'
import AddUser from '../components/AddUser'

const PlaylistsPage = () => {
    return (
        <>
            <Head>
                <title>{getPageTitle('Playlists')}</title>
            </Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={mdiFormSelect} title="Add User" main>
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


                <CardBox className="mb-6" hasTable>
                    <AddUser />
                </CardBox>


                <SectionTitleLineWithButton icon={mdiTableOff} title="Empty variation" />

            </SectionMain>
        </>
    )
}

PlaylistsPage.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default PlaylistsPage
