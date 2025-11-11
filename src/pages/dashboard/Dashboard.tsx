import { useEffect } from 'react';
import useGetDashboardData from './core/hook/useGetDashboardData';
import { useHeaderProps } from 'components/core/use-header-props';
import StatisticsCard from './components/StatisticsCard';
import RevenueGrowthChart from './components/RevenueGrowthChart';
import ActiveListingsChart from './components/ActiveListingsChart';
import TrafficByLocationChart from './components/TrafficByLocationChart';
import AiFlaggedListingsTable from './components/AiFlaggedListingsTable';

//icons
import UsersIcon from "assets/icons/users-icon.svg?react";
import ListingsIcon from "assets/icons/listings-icon.svg?react";
import PandingPayoutIcon from "assets/icons/withdrawals-icon.svg?react";
import TotalRevenueIcon from "assets/icons/withdrawals-icon.svg?react";
import useGetListingData from 'pages/listings/core/hooks/useGetListingData';

function Dashboard() {
    const { dashboardData, isLoading } = useGetDashboardData();
    const { listingsData, isLoading: listingsLoading, refetch: refetchListings } = useGetListingData({ status: "AI FLAGGED", });

    const { setTitle } = useHeaderProps();

    useEffect(() => setTitle("Dashboard"), [setTitle]);

    return (
        <section className=''>
            <div className="grid grid-cols-1 md:grid-cols-2 lg1180:grid-cols-4 gap-3 xl:gap-4">
                <StatisticsCard
                    title="Total Users"
                    data={dashboardData?.totalUsers}
                    icon={<UsersIcon className='text-primary' />}
                    iconColor="#D4502F1A"
                    isLoading={isLoading}
                />
                <StatisticsCard
                    title="Active Listings"
                    data={dashboardData?.activeListings}
                    icon={<ListingsIcon className='text-success' />}
                    iconColor="#22C55E1A"
                    isLoading={isLoading}
                />
                <StatisticsCard
                    title="Pending Pay-outs"
                    data={dashboardData?.pendingPayOuts}
                    icon={<PandingPayoutIcon className='text-warning' />}
                    iconColor="#F59E0B1A"
                    isLoading={isLoading}
                />
                <StatisticsCard
                    title="Total Revenue"
                    data={dashboardData?.totalRevenue}
                    icon={<TotalRevenueIcon className='text-success' />}
                    iconColor="#22C55E1A"
                    isLoading={isLoading}
                />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 xl:gap-4 mt-4">
                <RevenueGrowthChart isLoading={isLoading} data={dashboardData?.revenueGraphData || []} />
                <ActiveListingsChart isLoading={isLoading} data={dashboardData?.activeListingGraph || []} />
            </div>
            <div className="flex flex-col xl:flex-row gap-3 xl:gap-4 mt-4">
                <TrafficByLocationChart isLoading={isLoading} data={dashboardData?.listingCityPercentages || []} />
                <AiFlaggedListingsTable isLoading={listingsLoading} data={listingsData?.data || []} refetch={refetchListings} />
            </div>
        </section>
    )
}

export default Dashboard