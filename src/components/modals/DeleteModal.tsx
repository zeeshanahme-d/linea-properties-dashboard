import React from 'react';
import { Button, Modal } from 'antd';
import DeleteIcon from 'assets/icons/delete-modal-icon.svg?react';

interface DeleteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    description?: string;
}

const DeleteModal: React.FC<DeleteUserModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    description = 'Are you sure you want Delete this User?',
}) => {
    return (
        <Modal
            open={isOpen}
            centered
            onCancel={onClose}
            width={390}
            height={240}
            className="delete-user-modal"
            footer={null}
            closeIcon={false}
            title={false}
        // closeIcon={<CloseOutlined className="text-gray-400 hover:text-gray-600" />}
        >
            <div className="text-center pb-5 px-8">
                {/* Delete Icon */}
                <div className="flex justify-center mb-4">
                    <DeleteIcon />
                </div>

                {/* Modal Content */}
                <p className="text-black text-base font-normal">
                    {description}
                </p>
            </div>
            <div className="flex justify-center gap-4 px-8">
                <Button onClick={onConfirm} className="w-64 h-[42px] bg-[#EF4444] text-white rounded-xl">Yes, Delete</Button>
                <Button type="default" onClick={onClose} className="w-64 h-[42px] rounded-xl">Cancel</Button>
            </div>
        </Modal>
    );
};

export default DeleteModal;
