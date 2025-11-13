import React, { useCallback, useEffect, useState } from 'react';
import dayjs from "dayjs"
import { Empty, Input, Pagination, Select } from 'antd';
import { useHeaderProps } from 'components/core/use-header-props';
import DeleteModal from 'components/modals/DeleteModal';
import UserProfileModal from 'components/modals/UserProfileModal';
import DoneModal from 'components/modals/DoneModal';
import useGetAllUserData from './core/hooks/useGetAllUserData';
import FallbackLoader from 'components/core-ui/fallback-loader/FallbackLoader';
import useDeleteUser from './core/hooks/useDeleteUser';
import { showErrorMessage, showSuccessMessage } from 'utils/messageUtils';
//icons
import SearchIcon from 'assets/icons/search-icon.svg?react';
import ArrowDownIcon from 'assets/icons/arrow-down-icon.svg?react';
import EyeIcon from "assets/icons/view-icon.svg?react";
import DeleteIcon from "assets/icons/delete-icon.svg?react";
import { debounce } from 'helpers/CustomHelpers';


const statusOptions = [
    { label: 'All Status', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Banned', value: 'banned' },
]

const headers = [
    { label: "Name", className: "text-left" },
    { label: "Email", className: "text-left" },
    { label: "Status", className: "text-center" },
    { label: "Join Date", className: "text-center" },
    { label: "Actions", className: "text-center" },
]

function Users() {
    const { setTitle } = useHeaderProps();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
    const [searchUser, setSearchUser] = useState("")
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
    });
    const { userData, isLoading, refetch } = useGetAllUserData(params);
    const { userDeleteMutate, isLoading: userDeleteLoading } = useDeleteUser();

    useEffect(() => setTitle("Users"), [setTitle]);

    const handleView = (user: any) => {
        setSelectedUser(user);
        setIsUserProfileModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedUser) {
            userDeleteMutate({ id: selectedUser?._id, status: "banned" }, {
                onSuccess: (res: any) => {
                    setIsDeleteModalOpen(false);
                    setSelectedUser(null);
                    if (userData?.data.length >= 1) {
                        refetch();
                    } else {
                        setParams(prev => ({ ...prev, page: 1 }));
                    }
                    setIsDoneModalOpen(true);
                    showSuccessMessage(res.message);
                    setTimeout(() => {
                        setIsDoneModalOpen(false);
                    }, 1000);
                },
                onError: (error: any) => {
                    showErrorMessage(error?.response?.data?.message)
                },
            })
        }
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    const handleDeleteUser = (user: any) => {
        setSelectedUser(user)
        setIsDeleteModalOpen(true);
        setIsUserProfileModalOpen(false);
    };

    const handleCloseUserProfile = () => {
        setIsUserProfileModalOpen(false);
        setSelectedUser(null);
    };

    const getStatusClass = (status: string) => {
        if (status === 'active') return 'bg-[#EAF6ED] text-[#166C3B] border border-[#D3EFDA] shadow-[0px_0px_10px_#0000000A]';
        if (status === 'banned') return 'bg-[#FFF0EE] text-[#BB032A] border border-[#FFE1DE] shadow-[0px_0px_10px_#0000000A]';
        return '';
    };

    const debouncedSetParams = useCallback(
        debounce((value: string) => {
            setParams(prev => ({ ...prev, name: value }))
        }, 600),
        []
    );

    const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchUser(e.target.value);
        debouncedSetParams(e.target.value.trim());
    };
    const handleStatus = (value: string) => {
        setParams(prev => ({ ...prev, status: value === "all" ? undefined : value, page: 1 }));
    };

    const handlePageChange = (page: number) => {
        setParams(prev => ({ ...prev, page }));
    };

    return (
        <section>
            <div className='flex items-center gap-4'>
                <Input
                    value={searchUser}
                    placeholder="Search by name"
                    onChange={handleUserSearch}
                    prefix={<SearchIcon className='mr-2' />}
                    className='w-full min-w-[300px] h-12'
                />
                <Select
                    options={statusOptions}
                    onChange={handleStatus}
                    placeholder="Select Status"
                    className='w-72 h-12 rounded-xl'
                    suffixIcon={<ArrowDownIcon />}
                    defaultValue="All Status"
                />
            </div>

            <div className='mt-5 border rounded-xl py-1 px-5 w-full overflow-x-auto '>
                {isLoading ?
                    <FallbackLoader size='large' />
                    :
                    <div className="max-h-[800px] min-w-[900px] w-full">
                        <table className="border-separate border-spacing-y-2 w-full">
                            <thead>
                                <tr>
                                    {headers.map((header) => (
                                        <th
                                            key={header.label}
                                            className={`xl:px-4 px-2 py-3 ${header.className} font-medium text-sm`}
                                        >
                                            {header.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {userData?.data && userData?.data.length > 0 ?
                                    <>
                                        {userData?.data.map((user: any) => (
                                            <tr
                                                onDoubleClick={() => handleView(user)}
                                                key={user?._id}
                                                className="bg-[#FFFFFF9C] hover:bg-[#FFFFFF] transition-colors duration-300 cursor-pointer text-sm"
                                            >
                                                <td className="xl:px-4 px-2 py-2 capitalize">
                                                    {user?.name || "-"}
                                                </td>
                                                <td className="xl:px-4 px-2 py-2 ">
                                                    {user?.email || "-"}
                                                </td>
                                                <td className="xl:px-4 px-2 py-2 text-center flex-centered">
                                                    <div className={`px-2 py-2 capitalize w-30 text-center rounded-md ${getStatusClass(user?.status)}`}>
                                                        {user?.status || "-"}
                                                    </div>
                                                </td>
                                                <td className="xl:px-4 px-2 py-2  text-center">
                                                    {user.createdAt ? dayjs(user.createdAt).format("MM/DD/YYYY") : "-"}
                                                </td>
                                                <td className="xl:px-4 px-2 py-2">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <button
                                                            onClick={() => handleView(user)}
                                                            className="p-2 rounded-md hover:bg-blue-50 transition-colors text-blue-600 hover:text-blue-700"
                                                            title="View"
                                                        >
                                                            <EyeIcon />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUser(user)}
                                                            className="p-2 rounded-md hover:bg-red-50 transition-colors text-red-600 hover:text-red-700"
                                                            title="Delete"
                                                        >
                                                            <DeleteIcon />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                    :
                                    <tr >
                                        <td colSpan={5}>
                                            <Empty />
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            {userData?.totalItems > params?.limit && <Pagination
                className="mt-5 justify-center"
                current={params?.page}
                pageSize={params?.limit}
                total={userData?.totalItems}
                onChange={handlePageChange}
                showSizeChanger={false}
            />}

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                isLoading={userDeleteLoading}
                description={`Are you sure you want Delete this user "${selectedUser?.name}"?`}
            />

            {/* User Profile Modal */}
            {selectedUser && <UserProfileModal
                isOpen={isUserProfileModalOpen}
                onClose={handleCloseUserProfile}
                userId={selectedUser?._id}
                refetch={refetch}
                onDeleteUser={handleDeleteUser}
            />}

            {/* Done Modal */}
            <DoneModal
                isOpen={isDoneModalOpen}
                description="User Deleted"
            />

        </section>
    )
}

export default Users