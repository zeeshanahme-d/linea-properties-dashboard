import React from 'react';
import { Button, Modal, Divider } from 'antd';
import dayjs from 'dayjs';

//icons
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
                                <h2 className="text-2xl font-medium text-gray-800">Request {withdrawalRequest?._id}</h2>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl text-primary">
                                    {withdrawalRequest?.amount} CFA
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Key Attributes */}
                    <div className="flex items-center gap-1 mb-3 font-normal">
                        <div className="flex items-center gap-1 text-medium-gray">
                            <CiCalendar size={16} />
                            <span>{withdrawalRequest?.createdAt ? dayjs(withdrawalRequest?.createdAt).format("YYYY-MM-DD") : ""}</span>
                        </div>
                        <div className="flex items-center text-medium-gray">
                            <GoArrowIcon />
                            <span>{withdrawalRequest?.method}</span>
                        </div>
                        <div className="flex items-center text-medium-gray">
                            <GoArrowIcon />
                            <span>{withdrawalRequest?.phoneNumber}</span>
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
                                <span className="text-medium-gray font-normal text-sm">{withdrawalRequest?.availableBalance} CFA</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-medium-gray font-normal text-sm">Requested:</span>
                                <span className="text-medium-gray font-normal text-sm">{withdrawalRequest?.amount} CFA</span>
                            </div>
                            <div className="border-t border-[#C3C3C3] pt-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-black font-normal text-sm">Total:</span>
                                    <span className="text-black font-normal text-sm">{withdrawalRequest?.totalBalance} CFA</span>
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
                            <div className="w-[100px] h-[100px] rounded-full border flex items-center justify-center">
                                <img
                                    src={withdrawalRequest?.user.profilePicture || "/images/dummy-profile-pic.jpg"}
                                    alt={withdrawalRequest?.user.name}
                                    className="w-[100px] h-[100px] rounded-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-lg text-black">{withdrawalRequest?.user.name}</h4>
                                <p className="text-medium-gray text-base">{withdrawalRequest?.user.email}</p>
                                <div className="flex items-center gap-3 mt-1">
                                    <div className="flex items-center gap-1 text-sm text-medium-gray">
                                        <CiCalendar size={16} />
                                        Joined {withdrawalRequest?.user?.createdAt ? dayjs(withdrawalRequest.user.createdAt).format("YYYY-MM-DD") : ""}
                                    </div>
                                    {/* <div className="flex items-center gap-1 text-sm text-medium-gray">
                                        <IoLocationOutline size={16} />
                                        <span>{withdrawalRequest?.user.location}</span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons - Only show when listing status is AI flag */}
                {withdrawalRequest?.status === 'PENDING' && (
                    <div className="flex gap-3">
                        <Button
                            onClick={() => onReject?.(withdrawalRequest)}
                            className="h-[52px] rounded-2xl flex-1 border-red-500 text-red-500 hover:bg-red-50"
                            type="default"
                        >
                            Reject
                        </Button>
                        <Button
                            onClick={() => onApprove?.(withdrawalRequest)}
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
