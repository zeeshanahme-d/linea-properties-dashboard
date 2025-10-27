import React from 'react';
import { Button, Modal, Divider } from 'antd';

//icons
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { CloseOutlined } from '@ant-design/icons';
import GoArrowIcon from 'assets/icons/go-arrow-icon.svg?react';



interface WithdrawalRequestDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    withdrawalRequest: any;
    onReject?: (listingId: string) => void;
    onApprove?: (listingId: string) => void;
}

const WithdrawalRequestDetailModal: React.FC<WithdrawalRequestDetailModalProps> = ({
    isOpen,
    onClose,
    withdrawalRequest,
    onReject,
    onApprove,
}) => {

    if (!withdrawalRequest) return null;

    // Static data matching the image
    const staticWithdrawalRequestData = {
        title: "Request WD001",
        price: "40,000 CFA",
        requestDate: "2024-01-15",
        method: "MTN Mobile Money",
        contactInfo: "+237 6 50 12 34 56",
        balance: {
            availableBalance: "100,000 CFA",
            requestedAmount: "100,000 CFA",
            totalBalance: "100,000 CFA",
        },
        listerInfo: {
            name: "Jacob Jones",
            email: "john@example.com",
            joinedDate: "2024-01-15",
            location: "Douala",
            profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        }
    };

    // Use static data if no listing provided, otherwise use listing data
    const withdrawalRequestData = staticWithdrawalRequestData;

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={650}
            className="withdrawal-request-detail-modal"
            centered
            title={
                <div className='flex justify-between items-center'>
                    <p className='font-medium text-2xl'>Withdrawals Request Detail</p>
                    <button onClick={onClose}>
                        <CloseOutlined size={24} />
                    </button>
                </div>
            }
            closable={false}
        >
            <Divider />
            <div className='py-2 px-8'>
                {/* Listing Overview */}
                <div className="mb-6">
                    <div className="flex items-start justify-between">
                        <div className="flex-1 flex items-center justify-between">
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-medium text-gray-800">{withdrawalRequestData.title}</h2>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl text-primary">
                                    {withdrawalRequestData.price}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Key Attributes */}
                    <div className="flex items-center gap-1 mb-3 font-normal">
                        <div className="flex items-center gap-1 text-medium-gray">
                            <CiCalendar size={16} />
                            <span>{withdrawalRequestData.requestDate}</span>
                        </div>
                        <div className="flex items-center text-medium-gray">
                            <GoArrowIcon />
                            <span>{withdrawalRequestData.method}</span>
                        </div>
                        <div className="flex items-center text-medium-gray">
                            <GoArrowIcon />
                            <span>{withdrawalRequestData.contactInfo}</span>
                        </div>
                        <div className="flex items-center text-medium-gray ml-auto">
                            <span>Requested Amount</span>
                        </div>
                    </div>
                </div>

                {/* Financial Summary Card */}
                <div className="mb-6">
                    <div className="bg-[#EFF4FE] rounded-2xl p-4 border border-gray-200">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-medium-gray font-normal text-sm">Available:</span>
                                <span className="text-medium-gray font-normal text-sm">{withdrawalRequestData.balance.availableBalance}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-medium-gray font-normal text-sm">Requested:</span>
                                <span className="text-medium-gray font-normal text-sm">{withdrawalRequestData.balance.requestedAmount}</span>
                            </div>
                            <div className="border-t border-[#C3C3C3] pt-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-black font-normal text-sm">Total:</span>
                                    <span className="text-black font-normal text-sm">{withdrawalRequestData.balance.totalBalance}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Listed By Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">User Information</h3>
                    <div className="bg-white border border-border-gray rounded-2xl py-5 px-4">
                        <div className="flex items-center gap-4">
                            <div className="w-[100px] h-[100px] bg-orange-200 rounded-full flex items-center justify-center">
                                <img
                                    src={withdrawalRequestData.listerInfo.profilePicture}
                                    alt={withdrawalRequestData.listerInfo.name}
                                    className="w-[100px] h-[100px] rounded-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-lg text-black">{withdrawalRequestData.listerInfo.name}</h4>
                                <p className="text-medium-gray text-base">{withdrawalRequestData.listerInfo.email}</p>
                                <div className="flex items-center gap-3 mt-1">
                                    <div className="flex items-center gap-1 text-sm text-medium-gray">
                                        <CiCalendar size={16} />
                                        <span>Joined {withdrawalRequestData.listerInfo.joinedDate}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-medium-gray">
                                        <IoLocationOutline size={16} />
                                        <span>{withdrawalRequestData.listerInfo.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons - Only show when listing status is AI flag */}
                {withdrawalRequest?.status === 'Panding' && (
                    <div className="flex gap-3">
                        <Button
                            onClick={() => onReject?.(withdrawalRequest.id)}
                            className="h-[52px] rounded-2xl flex-1 border-red-500 text-red-500 hover:bg-red-50"
                            type="default"
                        >
                            Reject
                        </Button>
                        <Button
                            onClick={() => onApprove?.(withdrawalRequest.id)}
                            className="h-[52px] rounded-2xl flex-1 border-green-500 text-green-500 hover:bg-green-50"
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

export default WithdrawalRequestDetailModal;
