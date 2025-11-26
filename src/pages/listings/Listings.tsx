import { useEffect, useState } from 'react'
import { useHeaderProps } from 'components/core/use-header-props';
import TabSwitcher from 'components/core-ui/tab-switcher/TabSwitcher';
import ApprovedListings from './ApprovedListings';
import AiFlagListings from './AiFlagListings';
import { useSearchParams } from 'react-router-dom';


function Listings() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentTab = searchParams.get('tab');
    const { setTitle } = useHeaderProps();
    const [selectedTab, setSelectedTab] = useState<number>(currentTab === "approved" ? 0 : 1);
    useEffect(() => setTitle("Listings"), [setTitle]);

    const tabs = [
        { label: 'Approved' },
        { label: 'AI Flagged Requests' },
    ];

    useEffect(() => {
        if (currentTab !== "approved" && currentTab !== "aiflagged") {
            updateTabQuery(0);
        }
    }, [currentTab]);

    const updateTabQuery = (tab: number) => {
        const nextSearchParams = new URLSearchParams(searchParams);
        nextSearchParams.set('tab', tab === 0 ? "approved" : "aiflagged");
        nextSearchParams.set('page', String(1));
        setSearchParams(nextSearchParams);
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 0:
                return <ApprovedListings />;
            case 1:
                return <AiFlagListings />;
            default:
                return <ApprovedListings />;
        }
    };

    return (
        <section>
            <TabSwitcher
                selectedTab={selectedTab}
                onSelectTab={(v: number) => {
                    setSelectedTab(v);
                    updateTabQuery(v);
                }}
                tabs={tabs}
            />
            {renderTabContent()}
        </section>
    )
}

export default Listings