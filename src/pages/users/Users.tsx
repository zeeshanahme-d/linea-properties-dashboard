import { useEffect, useState } from 'react'
import { Input, Select } from 'antd';
import { useHeaderProps } from 'components/core/use-header-props';
import DeleteModal from 'components/modals/DeleteModal';
import UserProfileModal from 'components/modals/UserProfileModal';
//icons
import SearchIcon from 'assets/icons/search-icon.svg?react';
import ArrowDownIcon from 'assets/icons/arrow-down-icon.svg?react';
import EyeIcon from "assets/icons/view-icon.svg?react";
import DeleteIcon from "assets/icons/delete-icon.svg?react";
import DoneModal from 'components/modals/DoneModal';


const statusOptions = [
    { label: 'All Status', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Banned', value: 'banned' },
]


interface User {
    id: string;
    name: string;
    email: string;
    status: 'active' | 'banned';
    joinDate: string;
}

const users: User[] = [
    {
        id: '1',
        name: 'Annette Black',
        email: 'annette.black@email.com',
        status: 'active',
        joinDate: '01/01/2025',
    },
    {
        id: '2',
        name: 'John Smith',
        email: 'john.smith@email.com',
        status: 'active',
        joinDate: '02/20/2025',
    },
    {
        id: '3',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        status: 'banned',
        joinDate: '01/10/2025',
    },
    {
        id: '4',
        name: 'Michael Brown',
        email: 'michael.brown@email.com',
        status: 'active',
        joinDate: '03/05/2025',
    },
    {
        id: '5',
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        status: 'active',
        joinDate: '02/28/2025',
    },
    {
        id: '6',
        name: 'David Wilson',
        email: 'david.wilson@email.com',
        status: 'banned',
        joinDate: '01/05/2025',
    },
    {
        id: '7',
        name: 'Olivia Martinez',
        email: 'olivia.martinez@email.com',
        status: 'active',
        joinDate: '03/15/2025',
    },
    {
        id: '8',
        name: 'James Lee',
        email: 'james.lee@email.com',
        status: 'banned',
        joinDate: '02/10/2025',
    },
    {
        id: '9',
        name: 'Sophia Harris',
        email: 'sophia.harris@email.com',
        status: 'active',
        joinDate: '01/25/2025',
    },
    {
        id: '10',
        name: 'William Clark',
        email: 'william.clark@email.com',
        status: 'banned',
        joinDate: '03/20/2025',
    },
];

const headers = [
    { label: "Name", className: "text-left" },
    { label: "Email", className: "text-left" },
    { label: "Status", className: "text-left" },
    { label: "Join Date", className: "text-left" },
    { label: "Actions", className: "text-center" },
]

function Users() {
    const { setTitle } = useHeaderProps();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);



    useEffect(() => setTitle("Users"), [setTitle]);

    const handleView = (user: User) => {
        setSelectedUser(user);
        setIsUserProfileModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (userToDelete) {
            console.log('Delete user:', userToDelete.id);
            // Here you would typically make an API call to delete the user
            // For now, we'll just close the modal
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
            setIsDoneModalOpen(true);
            setTimeout(() => {
                setIsDoneModalOpen(false);
            }, 1000);
        }
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    };

    const handleBanUser = (userId: string) => {
        console.log('Ban user:', userId);
        // Here you would typically make an API call to ban the user
        setIsUserProfileModalOpen(false);
        setSelectedUser(null);
    };

    const handleDeleteUserFromProfile = (userId: string) => {
        console.log('Delete user from profile:', userId);
        // Here you would typically make an API call to delete the user
        setIsDeleteModalOpen(true);
        setIsUserProfileModalOpen(false);
        setUserToDelete(users.find(user => user.id === userId) || null);
    };

    const handleCloseUserProfile = () => {
        setIsUserProfileModalOpen(false);
        setSelectedUser(null);
    };

    const getStatusClass = (status: string) => {
        if (status === 'active') return 'bg-[#EAF6ED] text-[#166C3B] border border-[#D3EFDA]';
        if (status === 'banned') return 'bg-[#FFF0EE] text-danger border border-[#FFE1DE]';
        return '';
    };

    return (
        <section>
            <div className='flex items-center gap-4'>
                <Input
                    placeholder="Search User"
                    prefix={<SearchIcon className='mr-2' />}
                    className='w-full min-w-[300px]'
                />
                <Select
                    options={statusOptions}
                    placeholder="Select Status"
                    className='w-72 h-12 rounded-xl'
                    suffixIcon={<ArrowDownIcon />}
                    defaultValue="All Status"
                />
            </div>

            <div className='mt-10 border rounded-xl py-1 px-5 w-full overflow-x-auto '>
                <div className="max-h-[800px] min-w-[900px] w-full">
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
                            {users.map((user) => (
                                <tr
                                    onDoubleClick={() => handleView(user)}
                                    key={user.id}
                                    className="bg-[#FFFFFF9C] hover:bg-[#FFFFFF] transition-colors duration-300 cursor-pointer"
                                >
                                    <td className="px-4 py-3 text-gray-900">
                                        {user.name}
                                    </td>
                                    <td className="px-4 py-3 text-gray-700">
                                        {user.email}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className={`px-2 py-2 capitalize w-30 text-center rounded-md ${getStatusClass(user.status)}`}>
                                            {user.status}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-700">
                                        {user.joinDate}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => handleView(user)}
                                                className="p-2 rounded-md hover:bg-blue-50 transition-colors text-blue-600 hover:text-blue-700"
                                                title="View"
                                            >
                                                <EyeIcon />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUserFromProfile(user.id)}
                                                className="p-2 rounded-md hover:bg-red-50 transition-colors text-red-600 hover:text-red-700"
                                                title="Delete"
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                description={`Are you sure you want Delete this user "${userToDelete?.name}"?`}
            />

            {/* User Profile Modal */}
            <UserProfileModal
                isOpen={isUserProfileModalOpen}
                onClose={handleCloseUserProfile}
                user={selectedUser}
                onBanUser={handleBanUser}
                onDeleteUser={handleDeleteUserFromProfile}
            />

            {/* Done Modal */}
            <DoneModal
                isOpen={isDoneModalOpen}
                description="User Deleted"
            />

        </section>
    )
}

export default Users