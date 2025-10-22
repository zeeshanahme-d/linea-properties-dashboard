import { useState } from 'react'
import { Input, Select } from 'antd';
import DoneModal from 'components/modals/DoneModal';
import ListingDetailModal from 'components/modals/ListingDetailModal';
//icons
import SearchIcon from 'assets/icons/search-icon.svg?react';
import EyeIcon from "assets/icons/view-icon.svg?react";
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

const approvedListings: Listing[] = [
    {
        id: '1',
        title: 'Modern 3-Bed Apartment',
        listerName: 'Annette Black',
        location: 'Douala',
        price: '40,000 CFA',
        status: 'Approved',
        ai_flag_status: false,
        listerInfo: {
            name: 'Annette Black',
            email: 'annette@example.com',
            joinedDate: '2024-01-15',
            location: 'Douala',
            profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
        }
    },
    {
        id: '2',
        title: 'Luxury Villa with Pool',
        listerName: 'John Smith',
        location: 'Douala',
        price: '120,000 CFA',
        status: 'Approved',
        ai_flag_status: false,
        listerInfo: {
            name: 'John Smith',
            email: 'john@example.com',
            joinedDate: '2024-02-10',
            location: 'Douala',
            profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
        }
    },
    {
        id: '3',
        title: 'Cozy Studio Apartment',
        listerName: 'Sarah Johnson',
        location: 'Douala',
        price: '25,000 CFA',
        status: 'Approved',
        ai_flag_status: false,
        listerInfo: {
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            joinedDate: '2024-01-20',
            location: 'Douala',
            profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
        }
    },
    {
        id: '5',
        title: 'Modern Office Space',
        listerName: 'Emily Davis',
        location: 'Douala',
        price: '60,000 CFA',
        status: 'Approved',
        ai_flag_status: false,
        listerInfo: {
            name: 'Emily Davis',
            email: 'emily@example.com',
            joinedDate: '2024-02-15',
            location: 'Douala',
            profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
        }
    },
    {
        id: '10',
        title: 'Premium Penthouse',
        listerName: 'William Clark',
        location: 'Douala',
        price: '200,000 CFA',
        status: 'Approved',
        ai_flag_status: false,
        listerInfo: {
            name: 'William Clark',
            email: 'william@example.com',
            joinedDate: '2024-01-25',
            location: 'Douala',
            profilePicture: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face'
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

function ApprovedListings() {
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

    const getStatusClass = (status: string) => {
        if (status === 'Approved') return 'bg-[#EAF6ED] text-[#166C3B] border border-[#D3EFDA]';
        return '';
    };

    return (
        <section className='mt-5'>
            <div className='flex items-center gap-4'>
                <Input
                    placeholder="Search Listing"
                    prefix={<SearchIcon className='mr-2' />}
                    className='w-full min-w-[300px]'
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
                <div className="max-h-[800px] h-[800px] min-w-[900px] w-full">
                    <table className="border-separate border-spacing-y-2 w-full">
                        <thead>
                            <tr>
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
                            {approvedListings.map((listing) => (
                                <tr
                                    onDoubleClick={() => handleView(listing)}
                                    key={listing.id}
                                    className="bg-[#FFFFFF9C] hover:bg-[#FFFFFF] transition-colors duration-300 cursor-pointer"
                                >
                                    <td className="px-4 py-3 text-gray-900">
                                        {listing.title}
                                    </td>
                                    <td className="px-4 py-3 text-gray-700">
                                        {listing.listerName}
                                    </td>
                                    <td className="px-4 py-3 text-gray-700">
                                        {listing.location}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className={`px-2 py-2 capitalize w-30 text-center rounded-md ${getStatusClass(listing.status)}`}>
                                            {listing.status}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-700">
                                        {listing.price}
                                    </td>
                                    <td className="px-4 py-3">
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
                        </tbody>
                    </table>
                </div>
            </div>

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
        </section>
    )
}

export default ApprovedListings
