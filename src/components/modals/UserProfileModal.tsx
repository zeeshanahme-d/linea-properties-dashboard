import React from 'react';
import { Button, Divider, Modal } from 'antd';

//icons
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { CloseOutlined } from '@ant-design/icons';
import RatingIcon from 'assets/icons/rating-icon.svg?react';

interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
    onBanUser?: (userId: string) => void;
    onDeleteUser?: (userId: string) => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
    isOpen,
    onClose,
    user,
    onBanUser,
    onDeleteUser,
}) => {
    if (!user) return null;

    // Mock user statistics - in real app, this would come from API
    const userStats = {
        listings: 12,
        revenue: '50,000 CFA',
        bookings: 24,
        rating: 4.9,
    };

    const userDetails = {
        email: 'michael.mitc@example.com',
        phone: '+237 6 50 12 34 56',
        location: 'Douala',
        joinDate: '2024-01-15',
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={700}
            className="user-profile-modal"
            centered
            closeIcon={<CloseOutlined className="text-gray-400 hover:text-gray-600" />}
            title={<p className='font-normal text-2xl'>User Profile</p>}
        >
            <Divider />
            <div className="py-2">
                {/* User Information */}
                <div className="flex items-start gap-4 mb-6 border rounded-2xl p-4">
                    {/* Profile Picture */}
                    <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-orange-600">
                            {user.name.charAt(0)}
                        </span>
                    </div>

                    {/* User Details */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-medium">{user.name}</h3>
                            <div className={`px-2 py-1 capitalize w-20 text-center rounded-md ${user.status === 'active'
                                ? 'bg-[#EAF6ED] text-[#166C3B]'
                                : 'bg-[#FFF0EE] text-danger'
                                }`}>
                                {user.status}
                            </div>
                        </div>
                        <p className="text-medium-gray mb-1">{user.email}</p>
                        <div className="flex items-center gap-1 text-sm text-medium-gray">
                            <p className="flex items-center gap-1 text-medium-gray">
                                <CiCalendar size={18} /> <span>Joined {userDetails.joinDate}</span>
                            </p>
                            <p className="flex items-center gap-1 text-medium-gray">
                                <IoLocationOutline size={18} /> <span>{userDetails.location}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="text-center py-5 px-2  rounded-2xl border">
                        <div className="flex-centered text-2xl h-3/4 font-bold text-primary mb-1">
                            {userStats.listings}
                        </div>
                        <div className="text-sm text-medium-gray">Listings</div>
                    </div>
                    <div className="text-center py-5 px-2  rounded-2xl border">
                        <div className="flex-centered text-2xl h-3/4 font-bold text-success mb-1">
                            {userStats.revenue}
                        </div>
                        <div className="text-sm text-medium-gray">Revenue</div>
                    </div>
                    <div className="text-center py-5 px-2  rounded-2xl border">
                        <div className="flex-centered text-2xl h-3/4 font-bold text-[#1B279E] mb-1">
                            {userStats.bookings}
                        </div>
                        <div className="text-sm text-medium-gray">Bookings</div>
                    </div>
                    <div className="text-center py-5 px-2 rounded-2xl border">
                        <div className="flex-centered gap-3 text-2xl h-3/4 font-bold mb-1">
                            <RatingIcon /> {userStats.rating}
                        </div>
                        <div className="text-sm text-medium-gray">Rating</div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="mb-6 border rounded-2xl p-4">
                    <h4 className="text-lg mb-2 font-medium">Contact Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm block mb-2">Email</label>
                            <div className="flex items-center gap-2 text-medium-gray">
                                <MdOutlineMailOutline size={18} />
                                <span>{userDetails.email}</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm block mb-2">Phone</label>
                            <div className="flex items-center gap-2 text-medium-gray">
                                <FiPhone size={18} />
                                <span>{userDetails.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end">
                    <Button
                        onClick={() => onBanUser?.(user.id)}
                        className="h-12 w-full"
                        type="default"
                        danger
                    >
                        {user.status === 'active' ? "Ban User" : "Unban User"}
                    </Button>
                    <Button
                        type="default"
                        danger
                        className="h-12 w-full"
                        onClick={() => onDeleteUser?.(user.id)}
                    >
                        Delete User
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default UserProfileModal;
