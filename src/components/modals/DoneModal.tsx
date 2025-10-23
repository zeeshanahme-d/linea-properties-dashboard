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
            width={360}
            height={210}
            className="done-modal"
            footer={null}
            closeIcon={false}
        >
            <div className="text-center py-3">
                {/* Done Icon */}
                <div className="flex justify-center mb-4">
                    <img src="/images/check-animation-icon.gif" alt="done" className='w-[200px] h-[110px]' />
                </div>

                {/* Modal Content */}
                <p className="text-black text-xl font-medium">
                    {description}
                </p>
            </div>
        </Modal>
    );
};

export default DoneModal;
