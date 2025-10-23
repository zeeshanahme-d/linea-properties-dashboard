import React, { useState } from 'react';
import EyeIcon from "assets/icons/view-icon.svg?react";
import CheckIcon from "assets/icons/check-icon.svg?react";
import XIcon from "assets/icons/cross-icon.svg?react";
import { Card } from 'antd';
import ListingDetailModal from 'components/modals/ListingDetailModal';
import DoneModal from 'components/modals/DoneModal';

interface Listing {
    id: string;
    title: string;
    listerName: string;
    location: string;
    price: string;
}
const listings: Listing[] = [
    {
        id: '1',
        title: 'Studio in City Center',
        listerName: 'Annette Black',
        location: 'Douala',
        price: '500,000 CFA',
    },
    {
        id: '2',
        title: 'Studio in City Center',
        listerName: 'Annette Black',
        location: 'Douala',
        price: '500,000 CFA',
    },
    {
        id: '3',
        title: 'Studio in City Center',
        listerName: 'Annette Black',
        location: 'Douala',
        price: '500,000 CFA',
    },
    {
        id: '4',
        title: 'Studio in City Center',
        listerName: 'Annette Black',
        location: 'Douala',
        price: '500,000 CFA',
    },
    {
        id: '5',
        title: 'Studio in City Center',
        listerName: 'Annette Black',
        location: 'Douala',
        price: '500,000 CFA',
    },
];

const AiFlaggedListingsTable: React.FC = () => {
    const [isListingProfileModalOpen, setIsListingProfileModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
    const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const handleView = (listing: Listing) => {
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
                <div className="hidden md:block h-[220px] overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-nowrap border-b border-gray-200">
                                {headers.map((header) => (
                                    <th
                                        key={header.label}
                                        className={`px-4 py-3 ${header.className} text-base font-medium`}
                                    >
                                        {header.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {listings.map((listing) => (
                                <tr
                                    key={listing.id}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-4 text-sm text-gray-900">
                                        {listing.title}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        {listing.listerName}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        {listing.location}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">
                                        {listing.price}
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
                                            <button
                                                onClick={() => handleApprove(listing.id)}
                                                className="p-2 rounded-md hover:bg-green-50 transition-colors text-green-600 hover:text-green-700"
                                                title="Approve"
                                            >
                                                <CheckIcon />
                                            </button>
                                            <button
                                                onClick={() => handleReject(listing.id)}
                                                className="p-2 rounded-md hover:bg-red-50 transition-colors text-red-600 hover:text-red-700"
                                                title="Reject"
                                            >
                                                <XIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            {/* Listing Detail Modal */}
            <ListingDetailModal
                isOpen={isListingProfileModalOpen}
                onClose={handleCloseListingDetail}
                listing={selectedListing}
                onApprove={handleApprove}
                onReject={handleReject}
            />

            {/* Done Modal */}
            <DoneModal
                isOpen={isDoneModalOpen}
                description={statusMessage}
            />
        </>
    );
};

export default AiFlaggedListingsTable;