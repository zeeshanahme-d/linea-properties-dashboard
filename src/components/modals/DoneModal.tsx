import { Modal } from 'antd';
import React from 'react';

interface DoneModalProps {
    isOpen: boolean;
    description?: string;
}

const DoneModal: React.FC<DoneModalProps> = ({
    isOpen,
    description = 'Done',
}) => {
    return (
        <Modal
            open={isOpen}
            centered
            width={350}
            className="done-modal"
            footer={null}
            closeIcon={false}
        >
            <div className="text-center py-3">
                {/* Done Icon */}
                <div className="flex justify-center mb-4">
                    <img src="/images/check-animation-icon.gif" alt="done" />
                </div>

                {/* Modal Content */}
                <p className="text-gray-900 text-lg font-medium">
                    {description}
                </p>
            </div>
        </Modal>
    );
};

export default DoneModal;
