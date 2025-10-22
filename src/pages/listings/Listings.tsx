import { useEffect, useState } from 'react'
import { useHeaderProps } from 'components/core/use-header-props';
import TabSwitcher from 'components/core-ui/tab-switcher/TabSwitcher';
import ApprovedListings from './ApprovedListings';
import AiFlagListings from './AiFlagListings';


function Listings() {
    const { setTitle } = useHeaderProps();
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => setTitle("Listings"), [setTitle]);

    const tabs = [
        { label: 'Approved' },
        { label: 'AI Flagged Requests' },
    ];

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
                onSelectTab={setSelectedTab}
                tabs={tabs}
            />
            {renderTabContent()}
        </section>
    )
}

export default Listings