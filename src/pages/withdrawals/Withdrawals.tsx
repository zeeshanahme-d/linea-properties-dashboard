import { useEffect, useState } from 'react'
import { Select } from 'antd';
import { useHeaderProps } from 'components/core/use-header-props';
//icons
import ArrowDownIcon from 'assets/icons/arrow-down-icon.svg?react';
import EyeIcon from "assets/icons/view-icon.svg?react";
import CheckIcon from "assets/icons/check-icon.svg?react";
import XIcon from "assets/icons/cross-icon.svg?react";
import DoneModal from 'components/modals/DoneModal';
import WithdrawalRequestDetailModal from 'components/modals/WithdrawalRequestDetailModal';

type WithdrawalStatus = 'Pending' | 'Approved' | 'Rejected';

const statusOptions = [
    { label: 'All Status', value: 'all' },
    { label: 'Pending', value: 'panding' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
];


interface Withdrawals {
    id: string;
    user: string;
    amount: string;
    date: string;
    method: string;
    status: WithdrawalStatus;
}

const withdrawalHistory: Withdrawals[] = [
    {
        id: 'TXN001',
        user: 'Annette Black',
        amount: '40,000 CFA',
        date: '01/01/2025',
        method: 'MTN Mobile Money',
        status: 'Pending',
    },
    {
        id: 'TXN002',
        user: 'John Smith',
        amount: '120,000 CFA',
        date: '02/10/2025',
        method: 'Orange Money',
        status: 'Approved',
    },
    {
        id: 'TXN003',
        user: 'Sarah Johnson',
        amount: '25,000 CFA',
        date: '01/20/2025',
        method: 'Moov Money',
        status: 'Rejected',
    },
    {
        id: 'TXN004',
        user: 'Emily Davis',
        amount: '60,000 CFA',
        date: '02/15/2025',
        method: 'Orange Money',
        status: 'Approved',
    },
    {
        id: 'TXN005',
        user: 'David Wilson',
        amount: '150,000 CFA',
        date: '01/30/2025',
        method: 'Moov Money',
        status: 'Rejected',
    },
    {
        id: 'TXN006',
        user: 'Olivia Martinez',
        amount: '500,000 CFA',
        date: '03/01/2025',
        method: 'MTN Mobile Money',
        status: 'Pending',
    },
    {
        id: 'TXN007',
        user: 'James Lee',
        amount: '1,000,000 CFA',
        date: '02/28/2025',
        method: 'Orange Money',
        status: 'Pending',
    },
    {
        id: 'TXN008',
        user: 'Sophia Harris',
        amount: '750,000 CFA',
        date: '03/10/2025',
        method: 'Moov Money',
        status: 'Pending',
    },
    {
        id: 'TXN009',
        user: 'William Clark',
        amount: '200,000 CFA',
        date: '01/25/2025',
        method: 'MTN Mobile Money',
        status: 'Pending',
    },
];

const headers = [
    { label: "Widthdrawal ID", className: "text-left" },
    { label: "User", className: "text-left" },
    { label: "Amount", className: "text-left" },
    { label: "Status", className: "text-left" },
    { label: "Date", className: "text-left" },
    { label: "Method", className: "text-left" },
    { label: "Actions", className: "text-center" },
]

function Withdrawals() {
    const { setTitle } = useHeaderProps();
    const [isWithdrawalRequestDetailModalOpen, setIsWithdrawalRequestDetailModalOpen] = useState(false);
    const [selectedWithdrawalRequest, setSelectedWithdrawalRequest] = useState<Withdrawals | null>(null);
    const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');



    useEffect(() => setTitle("Withdrawals"), [setTitle]);

    const handleView = (listing: Withdrawals) => {
        setSelectedWithdrawalRequest(listing);
        setIsWithdrawalRequestDetailModalOpen(true);
    };

    const handleApprove = (listingId: string) => {
        console.log('Approve listing:', listingId);
        setStatusMessage('Withdrawal Request Approved');
        setIsDoneModalOpen(true);
        setIsWithdrawalRequestDetailModalOpen(false);
        setTimeout(() => {
            setIsDoneModalOpen(false);
            setStatusMessage('');
        }, 1000);
    };

    const handleReject = (listingId: string) => {
        console.log('Reject listing:', listingId);
        setStatusMessage('Withdrawal Request Rejected');
        setIsDoneModalOpen(true);
        setIsWithdrawalRequestDetailModalOpen(false);
        setTimeout(() => {
            setIsDoneModalOpen(false);
            setStatusMessage('');
        }, 1000);
    };

    const handleCloseWithdrawalRequestDetail = () => {
        setIsWithdrawalRequestDetailModalOpen(false);
        setSelectedWithdrawalRequest(null);
    };

    const getStatusClass = (status: string) => {
        if (status === 'Approved') return 'bg-[#EAF6ED] text-[#166C3B] border border-[#D3EFDA] shadow-[0px_0px_10px_#0000000A]';
        if (status === 'Pending') return 'bg-[#FDF2DC] text-warning border border-[#FBE5B6] shadow-[0px_0px_10px_#0000000A]';
        if (status === 'Rejected') return 'bg-[#FFF0EE] text-danger border border-[#FFE1DE] shadow-[0px_0px_10px_#0000000A]';
        return '';
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
                                        className={`xl:px-4 px-2 py-3 text-nowrap ${header.className} font-medium text-sm`}
                                    >
                                        {header.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawalHistory.map((withdrawal) => (
                                <tr
                                    onDoubleClick={() => handleView(withdrawal)}
                                    key={withdrawal.id}
                                    className={`bg-[#FFFFFF9C] hover:bg-[#FFFFFF] transition-colors duration-300 cursor-pointer text-sm`}
                                >
                                    <td className="xl:px-4 px-2 py-3 ">
                                        {withdrawal.id}
                                    </td>
                                    <td className="xl:px-4 px-2 py-3 ">
                                        {withdrawal.user}
                                    </td>
                                    <td className="xl:px-4 px-2 py-3 ">
                                        {withdrawal.amount}
                                    </td>
                                    <td className="xl:px-4 px-2 py-3">
                                        <div className={`px-2 py-2 capitalize w-30 text-center rounded-md ${getStatusClass(withdrawal.status)}`}>
                                            {withdrawal.status}
                                        </div>
                                    </td>
                                    <td className="xl:px-4 px-2 py-3 ">
                                        {withdrawal.date}
                                    </td>
                                    <td className="xl:px-4 px-2 py-3 ">
                                        {withdrawal.method}
                                    </td>
                                    <td className="xl:px-4 px-2 py-3">
                                        <div className='flex-centered'>
                                            <div className="w-[130px] flex items-center justify-start gap-1">
                                                <button
                                                    onClick={() => handleView(withdrawal)}
                                                    className="p-2 rounded-md hover:bg-blue-50 transition-colors text-blue-600 hover:text-blue-700"
                                                    title="View"
                                                >
                                                    <EyeIcon />
                                                </button>
                                                {withdrawal.status === 'Pending' &&
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(withdrawal.id)}
                                                            className="p-2 rounded-md hover:bg-green-50 transition-colors text-green-600 hover:text-green-700"
                                                            title="Approve"
                                                        >
                                                            <CheckIcon />
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(withdrawal.id)}
                                                            className="p-2 rounded-md hover:bg-red-50 transition-colors text-red-600 hover:text-red-700"
                                                            title="Reject"
                                                        >
                                                            <XIcon />
                                                        </button>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Listing Detail Modal */}
            <WithdrawalRequestDetailModal
                isOpen={isWithdrawalRequestDetailModalOpen}
                onClose={handleCloseWithdrawalRequestDetail}
                withdrawalRequest={selectedWithdrawalRequest}
                onApprove={handleApprove}
                onReject={handleReject}
            />

            {/* Done Modal */}
            <DoneModal
                isOpen={isDoneModalOpen}
                description={statusMessage}
            />

        </section>
    )
}

export default Withdrawals