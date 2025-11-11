import { useCallback, useState } from 'react'
import { Empty, Input, Pagination, Select } from 'antd';
import DoneModal from 'components/modals/DoneModal';
import ListingDetailModal from 'components/modals/ListingDetailModal';
import useGetListingData from './core/hooks/useGetListingData';
import FallbackLoader from 'components/core-ui/fallback-loader/FallbackLoader';
import { debounce } from 'helpers/CustomHelpers';
//icons
import SearchIcon from 'assets/icons/search-icon.svg?react';
import EyeIcon from "assets/icons/view-icon.svg?react";
import ArrowDownIcon from 'assets/icons/arrow-down-icon.svg?react';

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

function ApprovedListings() {
    const [isListingProfileModalOpen, setIsListingProfileModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState<any | null>(null);
    const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [search, setSearch] = useState('');
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
        status: "APPROVED",
        pricingType: "forSale"
    })

    const { listingsData, isLoading } = useGetListingData(params);

    const handleView = (listing: any) => {
        setSelectedListing(listing);
        setIsListingProfileModalOpen(true);
    };

    const handleApprove = (listingId: string) => {
        console.log('Approve listing:', listingId);
        setStatusMessage('Listing Approved');
        setIsDoneModalOpen(true);
        setIsListingProfileModalOpen(false);
        setTimeout(() => {
            setIsDoneModalOpen(false);
            setStatusMessage('');
        }, 1000);
    };

    const handleReject = (listingId: string) => {
        console.log('Reject listing:', listingId);
        setStatusMessage('Listing Rejected');
        setIsDoneModalOpen(true);
        setIsListingProfileModalOpen(false);
        setTimeout(() => {
            setIsDoneModalOpen(false);
            setStatusMessage('');
        }, 1000);
    };

    const handleCloseListingDetail = () => {
        setIsListingProfileModalOpen(false);
        setSelectedListing(null);
    };

    const getStatusClass = (status: string) => {
        if (status === 'APPROVED') return 'bg-[#EAF6ED] text-[#166C3B] border border-[#D3EFDA] shadow-[0px_0px_10px_#0000000A]';
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
                                                        {listing?.status === "APPROVED" ? "Approved" : listing?.status}
                                                    </div>
                                                </td>
                                                <td className="xl:px-4 px-2 py-3 ">
                                                    {`${listing?.monthlyRent || listing?.salePrice} CFA` || "-"}
                                                </td>
                                                <td className="xl:px-4 px-2 py-3">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button
                                                            onClick={() => handleView(listing)}
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

export default ApprovedListings
