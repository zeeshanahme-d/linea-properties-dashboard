import React from 'react';
import { Button, Divider, Modal } from 'antd';

//icons
import { CiCalendar } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { CloseOutlined } from '@ant-design/icons';
import RatingIcon from 'assets/icons/rating-icon.svg?react';
import useGetSingleUserData from 'pages/users/core/hooks/useGetSingleUserData';
import dayjs from 'dayjs';
import FallbackLoader from 'components/core-ui/fallback-loader/FallbackLoader';
import useChangeUserStatus from 'pages/users/core/hooks/useUserStatusChange';
import { showErrorMessage, showSuccessMessage } from 'utils/messageUtils';

interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    onDeleteUser?: (user: any) => void;
    refetch: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
    isOpen,
    onClose,
    userId,
    refetch,
    onDeleteUser,
}) => {

    const { singleUserData, isLoading } = useGetSingleUserData(userId);
    const { changeUserStatusMutate, isLoading: statusChangeLoading } = useChangeUserStatus();

    const getStatusClass = (status: string) => {
        if (status === 'active') return 'bg-[#EAF6ED] text-[#166C3B] border border-[#D3EFDA] shadow-[0px_0px_10px_#0000000A]';
        if (status === 'banned') return 'bg-[#FFF0EE] text-[#BB032A] border border-[#FFE1DE] shadow-[0px_0px_10px_#0000000A]';
        return '';
    };

    const handleChangeUserStatus = (id: string, status: string) => {
        const changeStatus = status === "active" ? "banned" : "active";
        changeUserStatusMutate({ id, status: changeStatus }, {
            onSuccess: (res: any) => {
                refetch?.();
                showSuccessMessage(res.message);
                onClose();
            },
            onError: (error: any) => {
                showErrorMessage(error?.response?.data?.message)
            },
        })
    }

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={670}
            className="singleUserData-profile-modal"
            centered
            title={
                <div className='flex justify-between items-center'>
                    <p className='font-medium text-2xl'>User Profile</p>
                    <button onClick={onClose}>
                        <CloseOutlined size={24} />
                    </button>
                </div>
            }
            closable={false}
        >
            <Divider />
            <div className="py-2 px-8">

                {isLoading ? <FallbackLoader size='large' /> :

                    <>
                        {statusChangeLoading ? <FallbackLoader size='large' isModal={true} /> : null}
                        {/* singleUserData Information */}
                        <div className="flex items-start gap-4 mb-6 border rounded-2xl px-4 py-6">
                            {/* Profile Picture */}
                            <div className="w-[100px] h-[100px] rounded-full border flex items-center justify-center">
                                <img
                                    src={singleUserData?.user?.profilePicture || "/images/dummy-profile-pic.jpg"}
                                    alt="User profile"
                                    className="w-[100px] h-[100px] rounded-full object-cover"
                                />
                            </div>

                            {/* singleUserData Details */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-medium capitalize">{singleUserData?.user.name}</h3>
                                    <div className={`px-2 py-1 capitalize w-14 h-6 flex-centered rounded ${getStatusClass(singleUserData?.user.status)}`}>
                                        {singleUserData?.user.status}
                                    </div>
                                </div>
                                <p className="text-medium-gray mb-1 text-base">{singleUserData?.user.email}</p>
                                <div className="flex items-center gap-3 text-sm text-medium-gray">
                                    <p className="flex items-center gap-1 text-medium-gray">
                                        <CiCalendar size={18} /> <span>Joined {singleUserData?.user.createdAt ? dayjs(singleUserData?.user.createdAt).format("YYYY-MM-DD") : ""}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="text-center py-5 px-2  rounded-2xl border">
                                <div className="flex-centered text-2xl h-3/4  text-[#DC6648] mb-1">
                                    {singleUserData?.lisingsCount}
                                </div>
                                <div className="text-sm text-medium-gray">Listings</div>
                            </div>
                            <div className="text-center py-5 px-2  rounded-2xl border">
                                <div className="flex-centered text-2xl h-3/4  text-[#22C55E] mb-1">
                                    {singleUserData?.revenue}
                                </div>
                                <div className="text-sm text-medium-gray">Revenue</div>
                            </div>
                            <div className="text-center py-5 px-2  rounded-2xl border">
                                <div className="flex-centered text-2xl h-3/4  text-[#1B279E] mb-1">
                                    {singleUserData?.bookedListingsCount}
                                </div>
                                <div className="text-sm text-medium-gray">Bookings</div>
                            </div>
                            <div className="text-center py-5 px-2 rounded-2xl border">
                                <div className="flex-centered gap-3 text-2xl h-3/4  mb-1">
                                    <RatingIcon /> {singleUserData?.averageRating}
                                </div>
                                <div className="text-sm text-medium-gray">Rating</div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="mb-6 border rounded-2xl p-4">
                            <h4 className="text-lg mb-4 font-medium">Contact Information</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm block mb-2">Email</label>
                                    <div className="flex items-center gap-2 text-medium-gray">
                                        <MdOutlineMailOutline size={18} />
                                        <span>{singleUserData?.user.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-end">
                            <Button
                                onClick={() => handleChangeUserStatus(singleUserData?.user._id, singleUserData?.user.status)}
                                className="h-[52px] w-full rounded-2xl font-normal hover:bg-red-50"
                                type="default"
                                danger
                            >
                                {singleUserData?.user.status === 'active' ? "Ban User" : "Unban User"}
                            </Button>
                            <Button
                                type="default"
                                danger
                                className="h-[52px] w-full rounded-2xl font-normal hover:bg-red-50"
                                onClick={() => onDeleteUser?.(singleUserData?.user)}
                            >
                                Delete User
                            </Button>
                        </div>
                    </>
                }
            </div>
        </Modal>
    );
};

export default UserProfileModal;
