import { useEffect, useState } from 'react'
import { Select } from 'antd';
import { useHeaderProps } from 'components/core/use-header-props';
//icons
import ArrowDownIcon from 'assets/icons/arrow-down-icon.svg?react';
import EyeIcon from "assets/icons/view-icon.svg?react";
import DoneModal from 'components/modals/DoneModal';
import DisputeDetailModal from 'components/modals/DisputeDetailModal';

const statusOptions = [
    { label: 'All Status', value: 'all' },
    { label: 'Open', value: 'open' },
    { label: 'Resolved', value: 'resolved' },
];


interface Dispute {
    disputeId: string;
    user: string
    listing: string
    reason: string
    status: 'Open' | 'Resolved';
    date: string
}

const disputeHistory: Dispute[] = [
    {
        disputeId: 'TXN001',
        user: 'Annette Black',
        listing: 'Private Room + Laundry in Gulshan',
        reason: 'Cleanliness issues',
        status: 'Open',
        date: '01/01/2025',
    },
    {
        disputeId: 'TXN002',
        user: 'John Smith',
        listing: 'Private Room + Laundry in Gulshan',
        reason: 'Property not as described',
        date: '02/10/2025',
        status: 'Open',
    },
    {
        disputeId: 'TXN003',
        user: 'Sarah Johnson',
        listing: 'Private Room + Laundry in Gulshan',
        reason: 'Property not as described',
        date: '01/20/2025',
        status: 'Open',
    },
    {
        disputeId: 'TXN004',
        user: 'Emily Davis',
        listing: 'Private Room + Laundry in Gulshan',
        reason: 'Property not as described',
        date: '02/15/2025',
        status: 'Open',
    },
    {
        disputeId: 'TXN005',
        user: 'David Wilson',
        listing: 'Private Room + Laundry in Gulshan',
        reason: 'Cleanliness issues',
        date: '01/30/2025',
        status: 'Open',
    },
    {
        disputeId: 'TXN006',
        user: 'Olivia Martinez',
        listing: 'Private Room + Laundry in Gulshan',
        reason: 'Cleanliness issues',
        date: '03/01/2025',
        status: 'Open',
    },
    {
        disputeId: 'TXN007',
        user: 'James Lee',
        listing: 'Private Room + Laundry in Gulshan',
        reason: 'Cleanliness issues',
        date: '02/28/2025',
        status: 'Resolved',
    },
    {
        disputeId: 'TXN008',
        user: 'Sophia Harris',
        listing: 'Private Room + Laundry in Gulshan',
        reason: 'Payment',
        date: '03/10/2025',
        status: 'Resolved',
    },
    {
        disputeId: 'TXN009',
        user: 'William Clark',
        listing: 'Private Room + Laundry in  Customer Service',
        reason: 'Property not as described',
        date: '01/25/2025',
        status: 'Resolved',
    },
];

const headers = [
    { label: "Dispute ID", className: "text-left" },
    { label: "User", className: "text-left" },
    { label: "Listing", className: "text-left" },
    { label: "Reason", className: "text-left" },
    { label: "Status", className: "text-left" },
    { label: "Date", className: "text-left" },
    { label: "Actions", className: "text-center" },
]

function Disputes() {
    const { setTitle } = useHeaderProps();
    const [isDisputeDetailModalOpen, setIsDisputeDetailModalOpen] = useState(false);
    const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
    const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');



    useEffect(() => setTitle("Disputes"), [setTitle]);

    const handleView = (dispute: Dispute) => {
        setSelectedDispute(dispute);
        setIsDisputeDetailModalOpen(true);
    };


    const handleCloseDisputeDetail = () => {
        setIsDisputeDetailModalOpen(false);
        setSelectedDispute(null);
    };

    const getStatusClass = (status: string) => {
        if (status === 'Resolved') return 'bg-[#EAF6ED] text-[#166C3B] border border-[#D3EFDA] shadow-[0px_0px_10px_#0000000A]';
        if (status === 'Open') return 'bg-[#FDF2DC] text-warning border border-[#FBE5B6] shadow-[0px_0px_10px_#0000000A]';
        return '';
    };

    const handleReleaseToSeeker = (disputeId: string) => {
        console.log('Release to seeker:', disputeId);
        setStatusMessage('Funds Released');
        setIsDoneModalOpen(true);
        setIsDisputeDetailModalOpen(false);
        setTimeout(() => {
            setIsDoneModalOpen(false);
            setStatusMessage('');
        }, 1000);

    };

    const handleReleaseToLister = (disputeId: string) => {
        console.log('Release to lister:', disputeId);
        setStatusMessage('Funds Released');
        setIsDoneModalOpen(true);
        setIsDisputeDetailModalOpen(false);
        setTimeout(() => {
            setIsDoneModalOpen(false);
            setStatusMessage('');
        }, 1000);
    };

    return (
        <section>
            <div className='flex items-center justify-end'>
                <Select
                    options={statusOptions}
                    placeholder="Select Withdrawal Status"
                    className='w-72 h-12 rounded-xl'
                    suffixIcon={<ArrowDownIcon />}
                    defaultValue="All Status"
                />
            </div>

            <div className='mt-5 border rounded-xl py-1 px-5 w-full overflow-x-auto '>
                <div className="max-h-[800px] min-w-[1000px] w-full">
                    <table className="border-separate border-spacing-y-2 w-full">
                        <thead>
                            <tr>
                                {headers.map((header) => (
                                    <th
                                        key={header.label}
                                        className={`xl:px-4 px-2 py-3 text-nowrap ${header.className} text-base font-medium`}
                                    >
                                        {header.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {disputeHistory.map((dispute) => (
                                <tr
                                    onDoubleClick={() => handleView(dispute)}
                                    key={dispute.disputeId}
                                    className={`bg-[#FFFFFF9C] hover:bg-[#FFFFFF] transition-colors duration-300 cursor-pointer`}
                                >
                                    <td className="xl:px-4 px-2 py-3 text-gray-900">
                                        {dispute.disputeId}
                                    </td>
                                    <td className="xl:px-4 px-2 py-3 text-gray-700">
                                        {dispute.user}
                                    </td>
                                    <td className="xl:px-4 px-2 py-3 text-gray-700">
                                        {dispute.listing}
                                    </td>
                                    <td className="xl:px-4 px-2 py-3 text-gray-700">
                                        {dispute.reason}
                                    </td>
                                    <td className="xl:px-4 px-2 py-3">
                                        <div className={`px-2 py-2 capitalize w-30 text-center rounded-md ${getStatusClass(dispute.status)}`}>
                                            {dispute.status}
                                        </div>
                                    </td>
                                    <td className="xl:px-4 px-2 py-3 text-gray-700">
                                        {dispute.date}
                                    </td>

                                    <td className="xl:px-4 px-2 py-3">
                                        <div className='flex-centered'>
                                            <button
                                                onClick={() => handleView(dispute)}
                                                className="p-2 rounded-md hover:bg-blue-50 transition-colors text-blue-600 hover:text-blue-700"
                                                title="View"
                                            >
                                                <EyeIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Listing Detail Modal */}
            <DisputeDetailModal
                isOpen={isDisputeDetailModalOpen}
                onClose={handleCloseDisputeDetail}
                dispute={selectedDispute}
                onReleaseToSeeker={handleReleaseToSeeker}
                onReleaseToLister={handleReleaseToLister}
            />

            {/* Done Modal */}
            <DoneModal
                isOpen={isDoneModalOpen}
                description={statusMessage}
            />

        </section>
    )
}

export default Disputes