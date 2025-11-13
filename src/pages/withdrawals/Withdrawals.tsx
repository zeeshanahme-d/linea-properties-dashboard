import { useEffect, useState } from 'react'
import { Empty, Pagination, Select } from 'antd';
import { useHeaderProps } from 'components/core/use-header-props';
//icons
import ArrowDownIcon from 'assets/icons/arrow-down-icon.svg?react';
import EyeIcon from "assets/icons/view-icon.svg?react";
import CheckIcon from "assets/icons/check-icon.svg?react";
import XIcon from "assets/icons/cross-icon.svg?react";
import DoneModal from 'components/modals/DoneModal';
import WithdrawalRequestDetailModal from 'components/modals/WithdrawalRequestDetailModal';
import useGetAllWithdrawalsData from './core/hooks/useGetAllWithdrawals';
import FallbackLoader from 'components/core-ui/fallback-loader/FallbackLoader';
import dayjs from 'dayjs';
import { showErrorMessage } from 'utils/messageUtils';
import useChangeWithdrawalsStatus from './core/hooks/useChangeWithdrawalsStatus';

const statusOptions = [
    { label: 'All Status', value: 'all' },
    { label: 'Pending', value: 'PENDING' },
    { label: 'Approved', value: 'APPROVED' },
    { label: 'Rejected', value: 'REJECTED' },
];

const WITHDRAWAL_STATUS = {
    APPROVED: "Approved",
    PENDING: "Pending",
    REJECTED: "Rejected"
}

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
    const [selectedWithdrawalRequest, setSelectedWithdrawalRequest] = useState<any | null>(null);
    const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
    })

    const { withdrawalsData, isLoading, refetch } = useGetAllWithdrawalsData(params);
    const { updateWithdrawalsStatuMutate, isLoading: statusChangeLoading } = useChangeWithdrawalsStatus();

    console.log(withdrawalsData)

    useEffect(() => setTitle("Withdrawals"), [setTitle]);

    const handleView = (withdrawal: any) => {
        setSelectedWithdrawalRequest(withdrawal);
        setIsWithdrawalRequestDetailModalOpen(true);
    };

    const handleApprove = (withdrawal: any) => {
        handleCloseWithdrawalRequestDetail();
        setSelectedWithdrawalRequest(withdrawal);

        updateWithdrawalsStatuMutate({ id: withdrawal._id, status: 'APPROVED' },
            {
                onSuccess: () => {
                    setStatusMessage('Withdrawal Request Approved');
                    setIsDoneModalOpen(true);
                    setSelectedWithdrawalRequest(null);
                    if (withdrawalsData?.data.length >= 1) {
                        refetch();
                    } else {
                        setParams(prev => ({ ...prev, page: 1 }));
                    }
                    setTimeout(() => {
                        setIsDoneModalOpen(false);
                        setStatusMessage('');
                    }, 1000);
                },
                onError: (error: any) => {
                    showErrorMessage(error?.response?.data?.message)
                },
            },
        );
    };

    const handleReject = (withdrawal: any) => {
        handleCloseWithdrawalRequestDetail();
        setSelectedWithdrawalRequest(withdrawal);

        updateWithdrawalsStatuMutate({ id: withdrawal._id, status: 'REJECTED' },
            {
                onSuccess: () => {
                    setStatusMessage('Withdrawal Request Rejected');
                    setIsDoneModalOpen(true);
                    setSelectedWithdrawalRequest(null);
                    if (withdrawalsData?.data.length >= 1) {
                        refetch();
                    } else {
                        setParams(prev => ({ ...prev, page: 1 }));
                    }
                    setTimeout(() => {
                        setIsDoneModalOpen(false);
                        setStatusMessage('');
                    }, 1000);
                },
                onError: (error: any) => {
                    showErrorMessage(error?.response?.data?.message)
                },
            },
        );
    };

    const handleCloseWithdrawalRequestDetail = () => {
        setIsWithdrawalRequestDetailModalOpen(false);
        setSelectedWithdrawalRequest(null);
    };

    const getStatusClass = (status: string) => {
        if (status === 'APPROVED') return 'bg-[#EAF6ED] text-[#166C3B] border border-[#D3EFDA] shadow-[0px_0px_10px_#0000000A]';
        if (status === 'PENDING') return 'bg-[#FDF2DC] text-warning border border-[#FBE5B6] shadow-[0px_0px_10px_#0000000A]';
        if (status === 'REJECTED') return 'bg-[#FFF0EE] text-danger border border-[#FFE1DE] shadow-[0px_0px_10px_#0000000A]';
        return '';
    };

    const handlePageChange = (page: number) => {
        setParams(prev => ({ ...prev, page }));
    };

    return (
        <section>
            <div className='flex items-center justify-end'>
                <Select
                    options={statusOptions}
                    placeholder="Select Withdrawal Status"
                    className='w-72 h-12 rounded-xl'
                    suffixIcon={<ArrowDownIcon />}
                    onChange={value => setParams(prev => ({ ...prev, status: value === "all" ? undefined : value, page: 1 }))}
                    defaultValue="All Status"
                />
            </div>

            <div className='mt-5 border rounded-xl py-1 px-5 w-full overflow-x-auto '>
                {isLoading ?
                    <FallbackLoader size='large' />
                    :
                    <div className="max-h-[800px] min-w-[900px] w-full">
                        <table className="border-separate border-spacing-y-2 w-full">
                            <thead>
                                <tr>
                                    {headers.map((header) => (
                                        <th
                                            key={header.label}
                                            className={`xl:px-4 px-2 py-3 ${header.className} font-medium text-sm`}
                                        >
                                            {header.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawalsData?.data && withdrawalsData?.data.length > 0 ?
                                    <>
                                        {withdrawalsData?.data?.map((withdrawal: any) => (
                                            <tr
                                                onDoubleClick={() => handleView(withdrawal)}
                                                key={withdrawal.id}
                                                className={`bg-[#FFFFFF9C] hover:bg-[#FFFFFF] transition-colors duration-300 cursor-pointer text-sm`}
                                            >
                                                <td className="xl:px-4 px-2 py-3 ">
                                                    {withdrawal?._id}
                                                </td>
                                                <td className="xl:px-4 px-2 py-3 capitalize">
                                                    {withdrawal?.user.name || "-"}
                                                </td>
                                                <td className="xl:px-4 px-2 py-3 ">
                                                    {withdrawal?.amount || "-"}
                                                </td>
                                                <td className="xl:px-4 px-2 py-3">
                                                    <div className={`px-2 py-2 capitalize w-30 text-center rounded-md ${getStatusClass(withdrawal?.status)}`}>
                                                        {WITHDRAWAL_STATUS[withdrawal?.status as keyof typeof WITHDRAWAL_STATUS] || "-"}
                                                    </div>
                                                </td>
                                                <td className="xl:px-4 px-2 py-3 ">
                                                    {withdrawal?.createdAt ? dayjs(withdrawal?.createdAt).format("YYYY/MM/DD") : ""}
                                                </td>
                                                <td className="xl:px-4 px-2 py-3">
                                                    {withdrawal?.method || "-"}
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
                                                            {withdrawal.status === 'PENDING' &&
                                                                <>
                                                                    {selectedWithdrawalRequest?._id === withdrawal?._id && statusChangeLoading ?
                                                                        <FallbackLoader className='!h-10' />
                                                                        :
                                                                        <>
                                                                            <button
                                                                                onClick={() => handleApprove(withdrawal)}
                                                                                className="p-2 rounded-md hover:bg-green-50 transition-colors text-green-600 hover:text-green-700"
                                                                                title="Approve"
                                                                            >
                                                                                <CheckIcon />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleReject(withdrawal)}
                                                                                className="p-2 rounded-md hover:bg-red-50 transition-colors text-red-600 hover:text-red-700"
                                                                                title="Reject"
                                                                            >
                                                                                <XIcon />
                                                                            </button>
                                                                        </>
                                                                    }
                                                                </>
                                                            }

                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                    :
                                    <tr >
                                        <td colSpan={6}>
                                            <Empty />
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>

            {withdrawalsData?.totalItems > params?.limit &&
                <Pagination
                    className="mt-5 justify-center"
                    current={params?.page}
                    pageSize={params?.limit}
                    total={withdrawalsData?.totalItems}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />}

            {/* Listing Detail Modal */}
            {selectedWithdrawalRequest && isWithdrawalRequestDetailModalOpen && <WithdrawalRequestDetailModal
                isOpen={isWithdrawalRequestDetailModalOpen}
                onClose={handleCloseWithdrawalRequestDetail}
                withdrawalRequest={selectedWithdrawalRequest}
                onApprove={handleApprove}
                onReject={handleReject}
            />}

            {/* Done Modal */}
            <DoneModal
                isOpen={isDoneModalOpen}
                description={statusMessage}
            />

        </section>
    )
}

export default Withdrawals