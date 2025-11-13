import { useEffect, useState } from 'react'
import { Empty, Select, Tooltip } from 'antd';
import { useHeaderProps } from 'components/core/use-header-props';
//icons
import ArrowDownIcon from 'assets/icons/arrow-down-icon.svg?react';
import EyeIcon from "assets/icons/view-icon.svg?react";
import DoneModal from 'components/modals/DoneModal';
import DisputeDetailModal from 'components/modals/DisputeDetailModal';
import useGetAllDisputesData from './core/hooks/useGetAllDisputesData';
import FallbackLoader from 'components/core-ui/fallback-loader/FallbackLoader';
import dayjs from 'dayjs';

const statusOptions = [
    { label: 'All Status', value: 'all' },
    { label: 'Open', value: 'OPEN' },
    { label: 'Resolved', value: 'RESOLVED' },
];


interface Dispute {
    disputeId: string;
    user: string
    listing: string
    reason: string
    status: 'Open' | 'Resolved';
    date: string
}


const headers = [
    { label: "Dispute ID", className: "text-left" },
    { label: "User", className: "text-left" },
    { label: "Listing", className: "text-left" },
    { label: "Reason", className: "text-left" },
    { label: "Status", className: "text-left" },
    { label: "Date", className: "text-left" },
    { label: "Actions", className: "text-center" },
]

const DISPUTES_STATUS = {
    RESOLVED: "Resolved",
    OPEN: "Open",
}

function Disputes() {
    const { setTitle } = useHeaderProps();
    const [isDisputeDetailModalOpen, setIsDisputeDetailModalOpen] = useState(false);
    const [selectedDispute, setSelectedDispute] = useState<any | null>(null);
    const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
    })

    const { disputeData, isLoading, refetch } = useGetAllDisputesData(params);



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
        if (status === 'RESOLVED') return 'bg-[#EAF6ED] text-[#166C3B] border border-[#D3EFDA] shadow-[0px_0px_10px_#0000000A]';
        if (status === 'OPEN') return 'bg-[#FDF2DC] text-warning border border-[#FBE5B6] shadow-[0px_0px_10px_#0000000A]';
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
                    onChange={value => setParams(prev => ({ ...prev, status: value === "all" ? undefined : value }))}
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
                                {disputeData?.data && disputeData?.data.length > 0 ?
                                    <>
                                        {disputeData?.data?.map((dispute: any) => (
                                            <tr
                                                onDoubleClick={() => handleView(dispute)}
                                                key={dispute?._id}
                                                className={`bg-[#FFFFFF9C] hover:bg-[#FFFFFF] transition-colors duration-300 cursor-pointer text-sm`}
                                            >
                                                <Tooltip title={dispute?._id}>
                                                    <td className="xl:px-4 px-2 py-3 truncate max-w-40">
                                                        {dispute?._id || "-"}
                                                    </td>
                                                </Tooltip>
                                                <td className="xl:px-4 px-2 py-3 capitalize">
                                                    {dispute?.creator?.name || "-"}
                                                </td>
                                                <Tooltip title={dispute.listing}>
                                                    <td className="xl:px-4 px-2 py-3 truncate max-w-40 capitalize">
                                                        {dispute?.listing?.propertyTitle || "-"}
                                                    </td>
                                                </Tooltip>
                                                <td className="xl:px-4 px-2 py-3 ">
                                                    {dispute?.disputeReason || "-"}
                                                </td>
                                                <td className="xl:px-4 px-2 py-3">
                                                    <div className={`px-2 py-2 capitalize w-30 text-center rounded-md ${getStatusClass(dispute.status)}`}>
                                                        {DISPUTES_STATUS[dispute?.status as keyof typeof DISPUTES_STATUS] || "-"}
                                                    </div>
                                                </td>
                                                <td className="xl:px-4 px-2 py-3 ">
                                                    {dispute?.createdAt ? dayjs(dispute?.createdAt).format("YYYY/MM/DD") : ""}
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

            {/* Listing Detail Modal */}
            {selectedDispute && isDisputeDetailModalOpen && <DisputeDetailModal
                isOpen={isDisputeDetailModalOpen}
                onClose={handleCloseDisputeDetail}
                disputeId={selectedDispute?._id}
                setIsDoneModalOpen={setIsDoneModalOpen}
                setStatusMessage={setStatusMessage}
                refetch={refetch}
            />}

            {/* Done Modal */}
            <DoneModal
                isOpen={isDoneModalOpen}
                description={statusMessage}
            />

        </section>
    )
}

export default Disputes