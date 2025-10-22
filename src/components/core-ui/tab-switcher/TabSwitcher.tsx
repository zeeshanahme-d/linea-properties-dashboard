import { Button } from "antd";

type Tab = {
    label: string;
    count?: number;
};

type TabSwitcherProps = {
    selectedTab: number;
    onSelectTab: (index: number) => void;
    tabs: Tab[];
};

function TabSwitcher({ selectedTab, onSelectTab, tabs, }: TabSwitcherProps) {

    return (
        <div className='flex justify-between items-center relative text-center border-b border-border-gray'>
            {tabs.map((tab, index) => (
                <div key={index} className='flex-1 relative'>
                    <Button
                        variant="text"
                        type="default"
                        className={`h-12 w-72 bg-transparent border-none gap-3 px-3 transition font-medium text-lg relative justify-center ${selectedTab === index ? 'text-primary' : 'text-dark-gray'}`}
                        onClick={() => onSelectTab(index)}
                    >
                        {tab.label}
                    </Button>
                    <div className={`absolute bottom-[-3.5px] h-[6px] ${selectedTab === index ? 'bg-primary rounded-full w-full' : ''}`} />
                </div>
            ))}
        </div>
    );
}

export default TabSwitcher;
