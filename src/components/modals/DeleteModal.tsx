import React from 'react';
import { Button, Modal } from 'antd';
import DeleteIcon from 'assets/icons/delete-modal-icon.svg?react';
import { CloseOutlined } from '@ant-design/icons';

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
            width={450}
            className="delete-user-modal"
            footer={null}
            closeIcon={<CloseOutlined className="text-gray-400 hover:text-gray-600" />}
        >
            <div className="text-center py-5">
                {/* Delete Icon */}
                <div className="flex justify-center mb-4">
                    <DeleteIcon />
                </div>

                {/* Modal Content */}
                <p className="text-gray-900 text-lg font-medium">
                    {description}
                </p>
            </div>
            <div className="flex justify-center gap-4">
                <Button type="primary" onClick={onConfirm} className="w-64 h-12">Yes, Delete</Button>
                <Button type="default" onClick={onClose} className="w-64 h-12">Cancel</Button>
            </div>
        </Modal>
    );
};

export default DeleteModal;
