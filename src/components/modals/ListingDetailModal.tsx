import React, { useState } from 'react';
import { Button, Modal, Checkbox, Divider } from 'antd';

//icons
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { CloseOutlined } from '@ant-design/icons';
import RatingIcon from 'assets/icons/rating-icon.svg?react';
import CoveredParkingIcon from 'assets/icons/covered-parking-icon.svg?react';
import HeatCoilIcon from 'assets/icons/heatingcoil-icon.svg?react';
import HotWaterIcon from 'assets/icons/hotwater-icon.svg?react';
import ElevatorIcon from 'assets/icons/elevator-icon.svg?react';
import WardrobesIcon from 'assets/icons/wardrobes-icon.svg?react';
import AreaIcon from 'assets/icons/area-icon.svg?react';
import BedroomIcon from 'assets/icons/bedroom-icon.svg?react';
import BathroomIcon from 'assets/icons/bathroom-icon.svg?react';
import WifiIcon from 'assets/icons/wifi-icon.svg?react';
import ParkingIcon from 'assets/icons/parking-icon.svg?react';
import TvIcon from 'assets/icons/tv-icon.svg?react';


interface ListingDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    listing: any;
    onReject?: (listingId: string) => void;
    onApprove?: (listingId: string) => void;
}

const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
    isOpen,
    onClose,
    listing,
    onReject,
    onApprove,
}) => {
    const [isVerified, setIsVerified] = useState(false);

    if (!listing) return null;

    // Static data matching the image
    const staticListingData = {
        title: "Modern 3-Bed Apartment",
        status: "For Rent",
        price: "40,000 CFA",
        priceUnit: "/month",
        location: "Douala",
        bedrooms: "3",
        bathrooms: "2",
        area: "2200m²",
        rating: "4.9",
        description: "Beautiful modern apartment in the heart of Islamabad. Features spacious rooms, modern appliances, and stunning city views. Perfect for professionals and families.",
        amenities: [
            { name: "Wifi", icon: WifiIcon },
            { name: "Covered Parking", icon: CoveredParkingIcon },
            { name: "Parking", icon: ParkingIcon },
            { name: "Cable TV", icon: TvIcon },
            { name: "Heating", icon: HeatCoilIcon },
            { name: "Hot Water", icon: HotWaterIcon },
            { name: "Elevator", icon: ElevatorIcon },
            { name: "Wardrobes", icon: WardrobesIcon }
        ],
        listerInfo: {
            name: "Jacob Jones",
            email: "john@example.com",
            joinedDate: "2024-01-15",
            location: "Douala",
            profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        }
    };

    // Use static data if no listing provided, otherwise use listing data
    const listingData = staticListingData;

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={800}
            className="listing-detail-modal"
            centered
            closeIcon={<CloseOutlined className="text-gray-400 hover:text-gray-600" />}
            title={<p className='font-medium text-2xl'>Listing Detail</p>}
        >
            <Divider />
            <div>
                {/* Listing Overview */}
                <div className="mb-6">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 flex items-center justify-between">
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-medium text-gray-800">{listingData.title}</h2>
                                <div className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                                    {listingData.status}
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl text-primary">
                                    {listingData.price} <span className="text-lg text-black">{listingData.priceUnit}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Key Attributes */}
                    <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2 text-gray-600">
                            <IoLocationOutline size={16} />
                            <span>{listingData.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <BedroomIcon />
                            <span>{listingData.bedrooms} Bedrooms</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <BathroomIcon />
                            <span>{listingData.bathrooms} Bathrooms</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <AreaIcon />
                            <span>{listingData.area}</span>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                        <RatingIcon />
                        <span className="text-lg font-medium">{listingData.rating}</span>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Description</h3>
                    <p className="text-medium-gray text-base font-normal leading-relaxed">{listingData.description}</p>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Amenities</h3>
                    <div className="grid grid-cols-4 gap-3">
                        {listingData.amenities.map((amenity: any, index: number) => {
                            const IconComponent = amenity.icon;
                            return (
                                <div key={index} className="flex items-center gap-2 py-4 px-4 border border-border-gray rounded-2xl">
                                    <IconComponent />
                                    <span className="text-base font-normal">{amenity.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Listed By Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Listed by</h3>
                    <div className="bg-white border border-border-gray rounded-2xl py-5 px-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-orange-200 rounded-full flex items-center justify-center">
                                <img
                                    src={listingData.listerInfo.profilePicture}
                                    alt={listingData.listerInfo.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-lg text-black">{listingData.listerInfo.name}</h4>
                                <p className="text-medium-gray text-base">{listingData.listerInfo.email}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center gap-1 text-sm text-medium-gray">
                                        <CiCalendar size={16} />
                                        <span>Joined {listingData.listerInfo.joinedDate}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-medium-gray">
                                        <IoLocationOutline size={16} />
                                        <span>{listingData.listerInfo.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Verification Checkbox */}
                <div className="mb-6 flex items-center gap-2">
                    <Checkbox
                        checked={isVerified}
                        onChange={(e) => setIsVerified(e.target.checked)}
                        className="text-black text-base font-normal"
                    >
                        Mark as verified
                    </Checkbox>
                </div>

                {/* Action Buttons - Only show when listing status is AI flag */}
                {listing?.ai_flag_status && (
                    <div className="flex gap-3">
                        <Button
                            onClick={() => onReject?.(listing.id)}
                            className="h-12 flex-1 border-red-500 text-red-500 hover:bg-red-50"
                            type="default"
                        >
                            Reject
                        </Button>
                        <Button
                            onClick={() => onApprove?.(listing.id)}
                            className="h-12 flex-1 border-green-500 text-green-500 hover:bg-green-50"
                            type="default"
                        >
                            Approve
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ListingDetailModal;
