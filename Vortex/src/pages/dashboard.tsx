import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiCashPlus,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiGithub,
  mdiInformation,
  mdiMonitorCellphone,
  mdiMusic,
  mdiReload,
} from '@mdi/js'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import BaseButton from '../components/BaseButton'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import CardBoxWidget from '../components/CardBoxWidget'
import { useSampleClients, useSampleTransactions } from '../hooks/sampleData'
import CardBoxTransaction from '../components/CardBoxTransaction'
import { Client, Transaction } from '../interfaces'
import CardBoxClient from '../components/CardBoxClient'
import SectionBannerStarOnGitHub from '../components/SectionBannerStarOnGitHub'
import CardBox from '../components/CardBox'
import { sampleChartData } from '../components/ChartLineSample/config'
import ChartLineSample from '../components/ChartLineSample'
import NotificationBar from '../components/NotificationBar'
import TableSampleClients from '../components/TableSampleClients'
import { getPageTitle } from '../config'
import { getProfitOrLoss, getSystemStatistic, getTotalIncome } from '../components/services/AdminPanelService'

const Dashboard = () => {
  const { clients } = useSampleClients()
  const { transactions } = useSampleTransactions()
  const [statistics, setStatistics] = useState({});
  const [totalUser, setTotalUser] = useState(0);
  const [incomeMessage, setIncomeMessage] = useState("")
  const [income, setIncome] = useState(0)
  const [totalArtist, setTotalArtist] = useState(0)
  const [totalSongs, setTotalSongs] = useState(0)
  const [profitOrLoss, setProfitOrLoss] = useState("")

  const clientsListed = clients.slice(0, 4)

  const [chartData, setChartData] = useState(sampleChartData())

  useEffect(() => {
    const fetchData = async () => {
      const result = await getStatistic()

      console.log(result.data.data)
      setTotalUser(result.data.data.numberOfRegisteredUsers)
      setTotalArtist(result.data.data.numberOfArtists)
      setTotalSongs(result.data.data.numberOfSongs)

      const incomeResult = await getIncome()
      console.log(incomeResult.data.message)
      setIncomeMessage(incomeResult.data.message.split(':')[0].trim())
      const numberString = incomeResult.data.message.split(':')[1].trim();
      setIncome(parseInt(numberString));

      const profitResult = await getProfitAndLoss()
      setProfitOrLoss(profitResult.data.message)




        ;
    };
    fetchData();
  }, []);


  const getStatistic = async function () {
    try {

      return getSystemStatistic()


    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
      throw error;
    }
  };

  const getIncome = async function () {
    try {

      return getTotalIncome()


    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
      throw error;
    }
  };

  const getProfitAndLoss = async function () {
    try {

      return getProfitOrLoss()


    } catch (error) {
      // Handle the error here
      console.error('Error:', error);
      throw error;
    }
  };



  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault()

    setChartData(sampleChartData())
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Overview" main>
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget

            trendColor="success"
            icon={mdiAccountMultiple}
            iconColor="success"
            number={totalUser}
            label="Total Users"
          />
          <CardBoxWidget

            icon={mdiAccountMultiple}
            iconColor="info"
            number={totalArtist}
            label="Artists"
          />
          <CardBoxWidget

            icon={mdiMusic}
            iconColor="danger"
            number={totalSongs}
            label="Songs"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">

          <div className="flex flex-col justify-between">
            <CardBoxWidget

              icon={mdiCashPlus}
              iconColor="info"
              number={income}
              numberPrefix="$"
              label={incomeMessage}
            />
            <NotificationBar color="info" icon={mdiInformation}>
              <b>{profitOrLoss}</b>
            </NotificationBar>
          </div>

        </div>





        <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Clients" />



        <CardBox hasTable>
          <TableSampleClients />
        </CardBox>
      </SectionMain>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
