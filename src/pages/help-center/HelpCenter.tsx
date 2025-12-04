import { useEffect, useState } from 'react'
import { Empty, Pagination, Tooltip } from 'antd';
import { useHeaderProps } from 'components/core/use-header-props';
import dayjs from 'dayjs';
//icons
// import DoneModal from 'components/modals/DoneModal';
// import DisputeDetailModal from 'components/modals/DisputeDetailModal';
import FallbackLoader from 'components/core-ui/fallback-loader/FallbackLoader';
import { useSearchParams } from 'react-router-dom';
// import useGetAllDisputesData from 'pages/disputes/core/hooks/useGetAllDisputesData';
// import { getHelpCenterData } from './core/_requests';
import useGetAllHelpCenterData from './core/hooks/useGetAllHelpCenterData';

// const statusOptions = [
//     { label: 'All Status', value: 'all' },
//     { label: 'Open', value: 'OPEN' },
//     { label: 'Resolved', value: 'RESOLVED' },
// ];


const headers = [
    { label: "User Name", className: "text-left" },
    { label: "Created Date", className: "text-left" },
    // { label: "Help Title", className: "text-left" },
    { label: "Description", className: "text-left" },
]

function HelpCenter() {
    const { setTitle } = useHeaderProps();
    const [searchParams, setSearchParams] = useSearchParams();
    // const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
    // const [statusMessage, setStatusMessage] = useState('');
    const [params, setParams] = useState(() => ({
        page: Number(searchParams.get('page')) || 1,
        limit: 10,
    }))

    const { helpCenterData, isLoading } = useGetAllHelpCenterData(params);



    useEffect(() => setTitle("Help Center"), [setTitle]);

    const updatePageQuery = (page: number) => {
        const nextSearchParams = new URLSearchParams(searchParams);
        nextSearchParams.set('page', page.toString());
        setSearchParams(nextSearchParams);
    };

    // const handleView = (dispute: Dispute) => {
    //     setSelectedDispute(dispute);
    //     setIsDisputeDetailModalOpen(true);
    // };


    // const handleCloseDisputeDetail = () => {
    //     setIsDisputeDetailModalOpen(false);
    //     setSelectedDispute(null);
    // };

    // const getStatusClass = (status: string) => {
    //     if (status === 'RESOLVED') return 'bg-[#EAF6ED] text-[#166C3B] border border-[#D3EFDA] shadow-[0px_0px_10px_#0000000A]';
    //     return 'bg-[#FDF2DC] text-warning border border-[#FBE5B6] shadow-[0px_0px_10px_#0000000A]';
    // };

    return (
        <section>
            {/* <div className='flex items-center justify-end'>
                <Select
                    options={statusOptions}
                    placeholder="Select Withdrawal Status"
                    className='w-72 h-12 rounded-xl'
                    suffixIcon={<ArrowDownIcon />}
                    defaultValue="All Status"
                    onChange={value => {
                        setParams(prev => ({ ...prev, status: value === "all" ? undefined : value, page: 1 }));
                        updatePageQuery(1);
                    }}
                />
            </div> */}

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
                                {helpCenterData?.data && helpCenterData?.data.length > 0 ?
                                    <>
                                        {helpCenterData?.data?.map((help: any) => (
                                            <tr
                                                key={help?._id}
                                                className={`bg-[#FFFFFF9C] hover:bg-[#FFFFFF] transition-colors duration-300 cursor-pointer text-sm`}
                                            >
                                                <Tooltip title={help?._id}>
                                                    <td className="xl:px-4 px-2 py-3 truncate max-w-40">
                                                        {help?.user?.name || "-"}
                                                    </td>
                                                </Tooltip>
                                                <td className="xl:px-4 px-2 py-3 capitalize">
                                                    {help?.createdAt ? dayjs(help?.createdAt).format("MM-DD-YYYY") : "-"}
                                                </td>
                                                {/* <td className="xl:px-4 px-2 py-3 truncate max-w-40 capitalize">
                                                    {help?.listing?.propertyTitle || "-"}
                                                </td> */}
                                                <td className="xl:px-4 px-2 py-3 w-1/2 capitalize">
                                                    {help?.message || "-"}
                                                </td>
                                                {/* <td className="xl:px-4 px-2 py-3">
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
                                                </td> */}
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

            {helpCenterData?.totalItems > params?.limit &&
                <Pagination
                    className="mt-5 justify-center"
                    current={params?.page}
                    pageSize={params?.limit}
                    total={helpCenterData?.totalItems}
                    onChange={(page) => {
                        setParams(prev => ({ ...prev, page }));
                        updatePageQuery(page);
                    }}
                    showSizeChanger={false}
                />}

            {/* Listing Detail Modal */}
            {/* {selectedDispute && isDisputeDetailModalOpen && <DisputeDetailModal
                isOpen={isDisputeDetailModalOpen}
                onClose={handleCloseDisputeDetail}
                disputeId={selectedDispute?._id}
                setIsDoneModalOpen={setIsDoneModalOpen}
                setStatusMessage={setStatusMessage}
                refetch={refetch}
            />} */}

            {/* Done Modal */}
            {/* <DoneModal
                isOpen={isDoneModalOpen}
                description={statusMessage}
            /> */}

        </section>
    )
}

export default HelpCenter