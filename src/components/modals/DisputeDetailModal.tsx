import React from 'react';
import { Button, Modal, Divider } from 'antd';

//icons
import { CloseOutlined } from '@ant-design/icons';
import ImageIcon from 'assets/icons/image-icon.svg?react';
import FileViewIcon from 'assets/icons/file-view-icon.svg?react';
import FileDownloadIcon from 'assets/icons/download-icon.svg?react';


interface DisputeDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    dispute: any;
    onReleaseToSeeker?: (disputeId: string) => void;
    onReleaseToLister?: (disputeId: string) => void;
}

const DisputeDetailModal: React.FC<DisputeDetailModalProps> = ({
    isOpen,
    onClose,
    dispute,
    onReleaseToSeeker,
    onReleaseToLister,
}) => {

    if (!dispute) return null;

    // Static data matching the image
    const staticDisputeData = {
        disputeId: "DSP000001",
        amount: "500,000 CFA",
        createdDate: "2024-01-13",
        reason: "Property not as described",
        description: "The apartment was significantly smaller than advertised and lacked the amenities mentioned in the listing.",
        parties: {
            initiator: {
                name: "Ahmed",
                role: "Dispute Initiator",
                profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            },
            lister: {
                name: "Alex",
                role: "Property Lister",
                profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            }
        },
        evidence: [
            {
                fileName: "property_photos.jpg",
                fileSize: "5MB"
            },
            {
                fileName: "property_photos.jpg",
                fileSize: "5MB"
            },
            {
                fileName: "property_photos.jpg",
                fileSize: "5MB"
            }
        ]
    };

    // Use static data if no dispute provided, otherwise use dispute data
    const disputeData = staticDisputeData;

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={670}
            className="dispute-detail-modal"
            centered
            closeIcon={<CloseOutlined className="text-gray-400 hover:text-gray-600" />}
            title={<p className='font-bold text-2xl'>Dispute Detail</p>}
        >
            <Divider />
            <div className='py-3'>
                {/* Dispute Information Card */}
                <div className="mb-6">
                    <div className="bg-[#EFF4FE] rounded-2xl p-4">
                        <div className="flex flex-col text-sm text-medium-gray gap-3">
                            <div className='flex items-center justify-between gap-2'>
                                <span>Dispute ID:</span>
                                <p>{disputeData.disputeId}</p>
                            </div>
                            <div className='flex items-center justify-between gap-2'>
                                <span>Amount in Dispute:</span>
                                <p>{disputeData.amount}</p>
                            </div>
                            <div className='flex items-center justify-between gap-2'>
                                <span>Created:</span>
                                <p>{disputeData.createdDate}</p>
                            </div>
                            <div className='flex items-center justify-between gap-2'>
                                <span>Dispute Reason:</span>
                                <p>{disputeData.reason}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="mb-6">
                    <h3 className="text-base font-medium mb-2">Description</h3>
                    <p className="text-medium-gray text-base font-normal leading-relaxed">{disputeData.description}</p>
                </div>

                {/* Parties Involved Section */}
                <div className="mb-6">
                    <h3 className="text-base font-medium mb-2">Parties Involved</h3>
                    <div className="flex items-center justify-center gap-8">
                        {/* Dispute Initiator */}
                        <div className="bg-white border gap-4 border-border-gray rounded-2xl px-4 py-3 text-center w-full items-center flex">
                            <img
                                src={disputeData.parties.initiator.profilePicture}
                                alt={disputeData.parties.initiator.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className='text-left'>
                                <h4 className="font-medium text-base">{disputeData.parties.initiator.name}</h4>
                                <p className="text-sm text-medium-gray -mt-1">{disputeData.parties.initiator.role}</p>
                            </div>
                        </div>

                        {/* VS Text */}
                        <div className="text-2xl font-bold text-[#e56b5d]">VS</div>

                        {/* Property Lister */}
                        <div className="bg-white border gap-4 border-border-gray rounded-2xl px-4 py-3 text-center w-full items-center flex">
                            <img
                                src={disputeData.parties.lister.profilePicture}
                                alt={disputeData.parties.lister.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className='text-left'>
                                <h4 className="font-medium text-base">{disputeData.parties.lister.name}</h4>
                                <p className="text-sm text-medium-gray -mt-1">{disputeData.parties.lister.role}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Evidence & Documents Section */}
                <div className="mb-6">
                    <h3 className="text-base font-medium mb-2">Evidence & Documents</h3>
                    <div className="space-y-3">
                        {disputeData.evidence.map((doc, index) => (
                            <div key={index} className="bg-[#EEEEEE] rounded-xl px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <ImageIcon />
                                    <div>
                                        <p className="text-sm">{doc.fileName}</p>
                                        <p className="text-xs text-medium-gray">{doc.fileSize}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        icon={<FileViewIcon className='mt-1' />}
                                        className="text-medium-gray px-2 py-4 text-sm rounded-lg"
                                        size="small"
                                    >
                                        View
                                    </Button>
                                    <Button
                                        icon={<FileDownloadIcon className='mt-1' />}
                                        className="text-medium-gray px-2 py-4 text-sm rounded-lg flex-centered"
                                        size="small"
                                    >
                                        Download
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <Button
                        variant='text'
                        onClick={() => onReleaseToSeeker?.(dispute.id)}
                        className="h-10 rounded-2xl flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                        type="default"
                    >
                        Release Funds to Property Seeker
                    </Button>
                    <Button
                        onClick={() => onReleaseToLister?.(dispute.id)}
                        className="flex-1 h-10 rounded-2xl border-primary text-primary hover:bg-primary hover:text-white"
                        type="default"
                    >
                        Release Funds to Lister
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DisputeDetailModal;
