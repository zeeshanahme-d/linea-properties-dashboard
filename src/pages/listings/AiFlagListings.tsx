import { useState } from 'react'
import { Input, Select } from 'antd';
import DoneModal from 'components/modals/DoneModal';
import ListingDetailModal from 'components/modals/ListingDetailModal';
//icons
import SearchIcon from 'assets/icons/search-icon.svg?react';
import EyeIcon from "assets/icons/view-icon.svg?react";
import CheckIcon from "assets/icons/check-icon.svg?react";
import XIcon from "assets/icons/cross-icon.svg?react";
import ArrowDownIcon from 'assets/icons/arrow-down-icon.svg?react';

const saleStatusOptions = [
    { label: 'For Sale', value: 'for_sale' },
    { label: 'For Rent', value: 'for_rent' },
];

interface Listing {
    id: string;
    title: string;
    listerName: string;
    location: string;
    price: string;
    status: 'Approved' | 'AI Flagged' | 'Rejected';
    ai_flag_status?: boolean;
    listerInfo?: {
        name: string;
        email: string;
        joinedDate: string;
        location: string;
        profilePicture: string;
    };
}

const aiFlaggedListings: Listing[] = [
    {
        id: '7',
        title: 'Suspicious Property Listing',
        listerName: 'Olivia Martinez',
        location: 'Douala',
        price: '500,000 CFA',
        status: 'AI Flagged',
        ai_flag_status: true,
        listerInfo: {
            name: 'Olivia Martinez',
            email: 'olivia@example.com',
            joinedDate: '2024-03-01',
            location: 'Douala',
            profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
        }
    },
    {
        id: '8',
        title: 'Potentially Fraudulent Listing',
        listerName: 'James Lee',
        location: 'Douala',
        price: '1,000,000 CFA',
        status: 'AI Flagged',
        ai_flag_status: true,
        listerInfo: {
            name: 'James Lee',
            email: 'james@example.com',
            joinedDate: '2024-02-28',
            location: 'Douala',
            profilePicture: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
        }
    },
    {
        id: '9',
        title: 'Questionable Property',
        listerName: 'Sophia Harris',
        location: 'Douala',
        price: '750,000 CFA',
        status: 'AI Flagged',
        ai_flag_status: true,
        listerInfo: {
            name: 'Sophia Harris',
            email: 'sophia@example.com',
            joinedDate: '2024-03-10',
            location: 'Douala',
            profilePicture: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face'
        }
    },
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
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
    const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const handleView = (listing: Listing) => {
        setSelectedListing(listing);
        setIsListingProfileModalOpen(true);
    };

    const handleApprove = (listingId: string) => {
        console.log(listingId)
        setStatusMessage('Listing Approved');
        setIsDoneModalOpen(true);
        setIsListingProfileModalOpen(false);
        setTimeout(() => {
            setIsDoneModalOpen(false);
            setStatusMessage('');
        }, 1000);
    };

    const handleReject = (listingId: string) => {
        console.log(listingId)

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
        if (status === 'AI Flagged') return 'bg-[#F59E0B1A] text-[#F59E0B] border border-[#F59E0B1A] shadow-[0px_0px_10px_#0000000A]';
        return '';
    };

    return (
        <section className='mt-5'>
            <div className='flex items-center gap-4'>
                <Input
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
                />
            </div>

            <div className='mt-5 border rounded-xl py-1 px-5 w-full overflow-x-auto '>
                <div className="max-h-[800px] min-w-[900px] w-full">
                    <table className="border-separate border-spacing-y-2 w-full">
                        <thead>
                            <tr>
                                {headers.map((header) => (
                                    <th
                                        key={header.label}
                                        className={`xl:px-4 px-2 py-3 ${header.className} text-sm font-medium`}
                                    >
                                        {header.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {aiFlaggedListings.map((listing) => (
                                <tr
                                    onDoubleClick={() => handleView(listing)}
                                    key={listing.id}
                                    className="bg-[#FFFFFF9C] hover:bg-[#FFFFFF]transition-colors duration-300 cursor-pointer text-sm"
                                >
                                    <td className="xl:px-4 px-2 py-3 ">
                                        {listing.title}
                                    </td>
                                    <td className="xl:px-4 px-2 py-3 ">
                                        {listing.listerName}
                                    </td>
                                    <td className="xl:px-4 px-2 py-3 ">
                                        {listing.location}
                                    </td>
                                    <td className="xl:px-4 px-2 py-3">
                                        <div className={`px-2 py-2 capitalize w-30 text-center rounded-md ${getStatusClass(listing.status)}`}>
                                            {listing.status}
                                        </div>
                                    </td>
                                    <td className="xl:px-4 px-2 py-3 ">
                                        {listing.price}
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
            </div>

            {/* Listing Detail Modal */}
            {isListingProfileModalOpen && <ListingDetailModal
                isOpen={isListingProfileModalOpen}
                onClose={handleCloseListingDetail}
                listingId={selectedListing?.id || ""}
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
