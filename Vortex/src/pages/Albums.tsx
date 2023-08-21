import { mdiGithub, mdiMonitorCellphone, mdiTableBorder, mdiTableOff } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'

import { getPageTitle } from '../config'

import AlbumsTable from '../components/AlbumsTable'

const AlbumsPage = () => {
    return (
        <>
            <Head>
                <title>{getPageTitle('Albums')}</title>
            </Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={mdiTableBorder} title="Albums" main>
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
                    <AlbumsTable />
                </CardBox>


                <SectionTitleLineWithButton icon={mdiTableOff} title="Empty variation" />

            </SectionMain>
        </>
    )
}

AlbumsPage.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default AlbumsPage
