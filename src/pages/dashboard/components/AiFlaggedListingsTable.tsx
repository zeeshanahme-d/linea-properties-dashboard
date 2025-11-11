import React, { useState } from 'react';
import EyeIcon from "assets/icons/view-icon.svg?react";
import CheckIcon from "assets/icons/check-icon.svg?react";
import XIcon from "assets/icons/cross-icon.svg?react";
import { Card, Empty, Tooltip } from 'antd';
import ListingDetailModal from 'components/modals/ListingDetailModal';
import DoneModal from 'components/modals/DoneModal';
import FallbackLoader from 'components/core-ui/fallback-loader/FallbackLoader';
import useUpdateListingStatus from 'pages/listings/core/hooks/useUpdateListingStatus';
import { showErrorMessage } from 'utils/messageUtils';

interface AiFlaggedListingsTableProps {
    isLoading?: boolean;
    data?: any[];
    refetch?: () => void;
}

const AiFlaggedListingsTable: React.FC<AiFlaggedListingsTableProps> = ({ isLoading, data, refetch }) => {
    const [isListingProfileModalOpen, setIsListingProfileModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState<any | null>(null);
    const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
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
                    refetch?.();
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
                    refetch?.();
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

    const headers = [
        { label: "Title", className: "text-left" },
        { label: "Lister Name", className: "text-left" },
        { label: "Location", className: "text-left" },
        { label: "Price", className: "text-left" },
        { label: "Actions", className: "text-center" },
    ]

    return (
        <>
            <Card
                title=" Recent AI Flagged Listing"
                className="w-full h-[300px]"
            >

                {isLoading ? <FallbackLoader size="large" className="h-[220px]" />
                    :
                    <div className="hidden md:block h-[220px] overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-nowrap border-b border-gray-200">
                                    {headers.map((header) => (
                                        <th
                                            key={header.label}
                                            className={`px-4 py-3 ${header.className} text-base font-medium `}
                                        >
                                            {header.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ?
                                    <>
                                        {data?.map((listing: any) => (
                                            <tr
                                                key={listing._id}
                                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                            >
                                                <Tooltip title={listing?.propertyTitle}>
                                                    <td className="px-4 py-4 text-sm truncate max-w-[200px] capitalize">
                                                        {listing?.propertyTitle || "-"}
                                                    </td>
                                                </Tooltip>
                                                <td className="px-4 py-4 text-sm capitalize">
                                                    {listing?.user?.name || "-"}
                                                </td>
                                                <td className="px-4 py-4 text-sm capitalize">
                                                    {listing?.city || "-"}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium">
                                                    {`${listing?.salePrice || listing?.monthlyRent} CFA` || "-"}
                                                </td>
                                                <td className="px-4 py-4">
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
                                        <td colSpan={5}>
                                            <Empty />
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </Card>
            {/* Listing Detail Modal */}
            {isListingProfileModalOpen && <ListingDetailModal
                isOpen={isListingProfileModalOpen}
                onClose={handleCloseListingDetail}
                listingId={selectedListing?._id}
                onApprove={handleApprove}
                onReject={handleReject}
                loading={isUpdateListingStatusLoading}
            />}

            {/* Done Modal */}
            <DoneModal
                isOpen={isDoneModalOpen}
                description={statusMessage}
            />
        </>
    );
};

export default AiFlaggedListingsTable;