import React from 'react';
import { Button, Modal, Divider } from 'antd';
import dayjs from "dayjs"

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
import useGetSingleListingData from 'pages/listings/core/hooks/useGetSingleListingData';
import FallbackLoader from 'components/core-ui/fallback-loader/FallbackLoader';


interface ListingDetailModalProps {
    isOpen: boolean;
    loading?: boolean;
    onClose: () => void;
    listingId: string;
    onReject?: (listingId: string) => void;
    onApprove?: (listingId: string) => void;
}

const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
    isOpen,
    onClose,
    loading,
    listingId,
    onReject,
    onApprove,
}) => {
    const { singleListingData, isLoading } = useGetSingleListingData(listingId);

    const amenitiesIcon = [
        { name: "wifi", icon: WifiIcon },
        { name: "covered parking", icon: CoveredParkingIcon },
        { name: "parking", icon: ParkingIcon },
        { name: "cable TV", icon: TvIcon },
        { name: "heating", icon: HeatCoilIcon },
        { name: "hot Water", icon: HotWaterIcon },
        { name: "elevator", icon: ElevatorIcon },
        { name: "wardrobes", icon: WardrobesIcon }
    ];

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={800}
            className="listing-detail-modal"
            centered
            title={
                <div className='flex justify-between items-center'>
                    <p className='font-medium text-2xl'>Listing Detail</p>
                    <button onClick={onClose}>
                        <CloseOutlined size={24} />
                    </button>
                </div>
            }
            closable={false}
        >
            <Divider />
            <div className='py-2 px-8'>
                {isLoading || loading ? <FallbackLoader size='large' /> :

                    <>
                        {/* Listing Overview */}
                        <div className="mb-6">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1 flex items-center justify-between">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-2xl font-medium text-gray-800">{singleListingData?.propertyTitle}</h2>
                                        <div className="px-3 h-6 bg-primary flex-centered text-white text-xs rounded-full">
                                            {singleListingData?.pricingType === "forSale" ? "For Sale" : "For Rent"}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl text-primary">
                                            {singleListingData?.salePrice || singleListingData?.monthlyRent} CFA <span className="text-lg text-black">{singleListingData?.pricingType === "forRent" && "/monthly"}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Key Attributes */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex items-center gap-1 text-medium-gray">
                                    <IoLocationOutline size={16} />
                                    <span className='capitalize'>{singleListingData?.city}</span>
                                </div>
                                {singleListingData?.bedrooms && <div className="flex items-center gap-1 text-medium-gray">
                                    <BedroomIcon />
                                    <span>{singleListingData?.bedrooms} Bedrooms</span>
                                </div>}
                                {singleListingData?.bathrooms && <div className="flex items-center gap-1 text-medium-gray">
                                    <BathroomIcon />
                                    <span>{singleListingData?.bathrooms} Bathrooms</span>
                                </div>}
                                <div className="flex items-center gap-1 text-medium-gray">
                                    <AreaIcon />
                                    <span>{singleListingData?.size}</span>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                <RatingIcon />
                                <span className="text-lg font-medium">{singleListingData?.averageRating || 0}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-3">Description</h3>
                            <p className="text-medium-gray text-base font-normal leading-relaxed">{singleListingData?.description}</p>
                        </div>

                        {/* Amenities */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-3">Amenities</h3>
                            <div className="grid grid-cols-4 gap-3">
                                {singleListingData?.amenities.map((amenity: any, index: number) => {
                                    const name = amenity?.toLowerCase();
                                    const IconComponent = amenitiesIcon.find(v => v.name === name)?.icon;
                                    return (
                                        <div key={index} className="flex items-center gap-2 p-3 border border-border-gray rounded-xl">
                                            {IconComponent ? <IconComponent /> : null}
                                            <span className="text-base font-normal capitalize">{name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Listed By Section */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-3">Listed by</h3>
                            <div className="bg-white border border-border-gray rounded-2xl py-6 px-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-[100px] h-[100px] border border-border-gray rounded-full flex items-center justify-center">
                                        <img
                                            src={singleListingData?.user?.profilePicture || "/images/dummy-profile-pic.jpg"}
                                            alt={singleListingData?.user?.name}
                                            className="w-[100px] h-[100px] rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-normal text-lg text-black capitalize">{singleListingData?.user?.name}</h4>
                                        <p className="text-medium-gray text-base">{singleListingData?.user?.email}</p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <div className="flex items-center gap-1 text-sm text-medium-gray">
                                                <CiCalendar size={16} />
                                                Joined {singleListingData?.user?.createdAt ? dayjs(singleListingData.user.createdAt).format("YYYY-MM-DD") : ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons - Only show when listing status is AI flag */}
                        {singleListingData?.status === "AI FLAGGED" && (
                            <div className="flex gap-3">
                                <Button
                                    onClick={() => onReject?.(listingId)}
                                    className="h-[52px] flex-1 border-red-500 text-red-500 font-normal hover:bg-red-50 rounded-2xl"
                                    type="default"
                                >
                                    Reject
                                </Button>
                                <Button
                                    onClick={() => onApprove?.(listingId)}
                                    className="h-[52px] flex-1 border-green-500 text-green-500 font-normal hover:bg-green-50 rounded-2xl"
                                    type="default"
                                >
                                    Approve
                                </Button>
                            </div>
                        )}
                    </>
                }

            </div>
        </Modal>
    );
};

export default ListingDetailModal;
