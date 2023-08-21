import { mdiFormSelect, mdiGithub, mdiMonitorCellphone, mdiTableBorder, mdiTableOff } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import CardBoxComponentEmpty from '../components/CardBoxComponentEmpty'
import LayoutAuthenticated from '../layouts/Authenticated'

import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'

import { getPageTitle } from '../config'

import AddSong from '../components/AddSong'
import AddGenre from '../components/AddGenre'
import AddCountry from '../components/AddCountry'

const CountryAddPage = () => {
    return (
        <>
            <Head>
                <title>{getPageTitle('Countries')}</title>
            </Head>
            <SectionMain>
                <SectionTitleLineWithButton icon={mdiFormSelect} title="Add Country" main>
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
                    <AddCountry />
                </CardBox>


                <SectionTitleLineWithButton icon={mdiTableOff} title="Empty variation" />

            </SectionMain>
        </>
    )
}

CountryAddPage.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default CountryAddPage
