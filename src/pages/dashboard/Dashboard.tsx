import { useEffect } from 'react';
import { useHeaderProps } from 'components/core/use-header-props';
import StatisticsCard from './components/StatisticsCard';

//icons
import UsersIcon from "assets/icons/users-icon.svg?react";
import ListingsIcon from "assets/icons/listings-icon.svg?react";
import PandingPayoutIcon from "assets/icons/withdrawals-icon.svg?react";
import TotalRevenueIcon from "assets/icons/withdrawals-icon.svg?react";
import RevenueGrowthChart from './components/RevenueGrowthChart';
import ActiveListingsChart from './components/ActiveListingsChart';
import TrafficByLocationChart from './components/TrafficByLocationChart';
import AiFlaggedListingsTable from './components/AiFlaggedListingsTable';

function Dashboard() {
    const { setTitle } = useHeaderProps();

    useEffect(() => setTitle("Dashboard"), [setTitle]);

    return (
        <section className=''>
            <div className="grid grid-cols-1 md:grid-cols-2 lg1180:grid-cols-4 gap-3 xl:gap-6">
                <StatisticsCard
                    title="Total Users"
                    data="2,412"
                    icon={<UsersIcon className='text-primary' />}
                    iconColor="#D4502F1A"
                />
                <StatisticsCard
                    title="Active Listings"
                    data="189"
                    icon={<ListingsIcon className='text-success' />}
                    iconColor="#22C55E1A"
                />
                <StatisticsCard
                    title="Pending Pay-outs"
                    data="23"
                    icon={<PandingPayoutIcon className='text-warning' />}
                    iconColor="#F59E0B1A"
                />
                <StatisticsCard
                    title="Total Revenue"
                    data="500,000 CFA"
                    icon={<TotalRevenueIcon className='text-success' />}
                    iconColor="#22C55E1A"
                />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 xl:gap-6 mt-8">
                <RevenueGrowthChart />
                <ActiveListingsChart />
            </div>
            <div className="flex flex-col xl:flex-row gap-3 xl:gap-6 mt-8">
                <TrafficByLocationChart />
                <AiFlaggedListingsTable />
            </div>
        </section>
    )
}

export default Dashboard