import { useCallback, useState } from 'react'
import { Empty, Input, Pagination, Select } from 'antd';
import DoneModal from 'components/modals/DoneModal';
import ListingDetailModal from 'components/modals/ListingDetailModal';
//icons
import SearchIcon from 'assets/icons/search-icon.svg?react';
import EyeIcon from "assets/icons/view-icon.svg?react";
import CheckIcon from "assets/icons/check-icon.svg?react";
import XIcon from "assets/icons/cross-icon.svg?react";
import ArrowDownIcon from 'assets/icons/arrow-down-icon.svg?react';
import { debounce } from 'helpers/CustomHelpers';
import FallbackLoader from 'components/core-ui/fallback-loader/FallbackLoader';
import useGetListingData from './core/hooks/useGetListingData';
import { showErrorMessage } from 'utils/messageUtils';
import useUpdateListingStatus from './core/hooks/useUpdateListingStatus';

const saleStatusOptions = [
    { label: 'For Sale', value: 'forSale' },
    { label: 'For Rent', value: 'forRent' },
];


const headers = [
    { label: "Title", className: "text-left" },
    { label: "Lister Name", className: "text-left" },
    { label: "Location", className: "text-left" },
    { label: "Status", className: "text-left" },
    { label: "Price", className: "text-left" },
    { label: "Actions", className: "text-center max-w-[100px]" },
]

function AiFlagListings() {
    const [isListingProfileModalOpen, setIsListingProfileModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState<any | null>(null);
    const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [search, setSearch] = useState('');
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
        status: "AI FLAGGED",
        pricingType: "forSale"
    })
    const { listingsData, isLoading, refetch } = useGetListingData(params);
    const { updateListingStatusMutate, isLoading: isUpdateListingStatusLoading } = useUpdateListingStatus();


    const handleView = (listing: any) => {
        setSelectedListing(listing);
        setIsListingProfileModalOpen(true);
    };

    const handleApprove = (listing: any) => {
        handleCloseListingDetail();
        setSelectedListing(listing);

        updateListingStatusMutate({ id: listing._id, status: 'APPROVED' },
            {
                onSuccess: () => {
                    setIsDoneModalOpen(true);
                    setStatusMessage('Listing Approved');
                    setSelectedListing(null);
                    if (listingsData?.data.length >= 1) {
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

    const handleReject = (listing: any) => {
        handleCloseListingDetail();
        setSelectedListing(listing);

        updateListingStatusMutate({ id: listing._id, status: 'REJECTED' },
            {
                onSuccess: () => {
                    setIsDoneModalOpen(true);
                    setStatusMessage('Listing Rejected');
                    setSelectedListing(null);
                    if (listingsData?.data.length >= 1) {
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

    const handleCloseListingDetail = () => {
        setIsListingProfileModalOpen(false);
        setSelectedListing(null);
    };

    const getStatusClass = (status: string) => {
        if (status === 'AI FLAGGED') return 'bg-[#F59E0B1A] text-[#F59E0B] border border-[#F59E0B1A] shadow-[0px_0px_10px_#0000000A]';
        return '';
    };


    const debouncedSetParams = useCallback(
        debounce((value: string) => {
            setParams(prev => ({ ...prev, propertyTitle: value }))
        }, 600),
        []
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        debouncedSetParams(e.target.value.trim());
    };

    const handlePageChange = (page: number) => {
        setParams(prev => ({ ...prev, page }));
    };

    return (
        <section className='mt-5'>
            <div className='flex items-center gap-4'>
                <Input
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search Listing"
                    prefix={<SearchIcon className='mr-2' />}
                    className='w-full min-w-[300px] h-12'
                />
                <Select
                    options={saleStatusOptions}
                    placeholder="Select Sale Status"
                    className='w-72 h-12 rounded-xl'
                    suffixIcon={<ArrowDownIcon />}
                    defaultValue="For Sale"
                    onChange={value => setParams(prev => ({ ...prev, pricingType: value }))}

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
                                {listingsData?.data && listingsData?.data.length > 0 ?
                                    <>
                                        {listingsData?.data.map((listing: any) => (
                                            <tr
                                                onDoubleClick={() => handleView(listing)}
                                                key={listing?._id}
                                                className="bg-[#FFFFFF9C] hover:bg-[#FFFFFF] transition-colors duration-300 cursor-pointer text-sm"
                                            >
                                                <td className="xl:px-4 px-2 py-3 capitalize">
                                                    {listing?.propertyTitle || "-"}
                                                </td>
                                                <td className="xl:px-4 px-2 py-3 capitalize">
                                                    {listing?.user?.name || "-"}
                                                </td>
                                                <td className="xl:px-4 px-2 py-3 capitalize">
                                                    {listing?.city || "-"}
                                                </td>
                                                <td className="xl:px-4 px-2 py-3">
                                                    <div className={`px-2 py-2 capitalize w-30 text-center rounded-md ${getStatusClass(listing?.status)}`}>
                                                        {listing?.status === "AI FLAGGED" ? "AI flagged" : listing?.status}
                                                    </div>
                                                </td>
                                                <td className="xl:px-4 px-2 py-3 ">
                                                    {`${listing?.monthlyRent || listing?.salePrice} CFA` || "-"}
                                                </td>
                                                <td className="xl:px-4 px-2  py-3">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <button
                                                            onClick={() => handleView(listing)}
                                                            className="p-2 rounded-md hover:bg-blue-50 transition-colors text-blue-600 hover:text-blue-700"
                                                            title="View"
                                                        >
                                                            <EyeIcon />
                                                        </button>
                                                        {isUpdateListingStatusLoading && selectedListing?._id === listing?._id ?
                                                            <FallbackLoader className='!h-fit' />
                                                            :
                                                            <>
                                                                <button
                                                                    onClick={() => handleApprove(listing)}
                                                                    className="p-2 rounded-md hover:bg-green-50 transition-colors text-green-600 hover:text-green-700"
                                                                    title="Approve"
                                                                >
                                                                    <CheckIcon />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject(listing)}
                                                                    className="p-2 rounded-md hover:bg-red-50 transition-colors text-red-600 hover:text-red-700"
                                                                    title="Reject"
                                                                >
                                                                    <XIcon />
                                                                </button>
                                                            </>
                                                        }
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
            {listingsData?.totalItems > params?.limit && <Pagination
                className="mt-5 justify-center"
                current={params?.page}
                pageSize={params?.limit}
                total={listingsData?.totalItems}
                onChange={handlePageChange}
                showSizeChanger={false}
            />}

            {/* Listing Detail Modal */}
            {isListingProfileModalOpen && <ListingDetailModal
                isOpen={isListingProfileModalOpen}
                onClose={handleCloseListingDetail}
                listingId={selectedListing?._id || selectedListing?.id}
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

export default AiFlagListings
