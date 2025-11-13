import React from 'react';
import { Button, Modal, Divider, Tooltip } from 'antd';
import useGetSingleDisputeData from 'pages/disputes/core/hooks/useGetSingleDisputeData';
import FallbackLoader from 'components/core-ui/fallback-loader/FallbackLoader';
import dayjs from 'dayjs';
import useReleaseDisputeFunds from 'pages/disputes/core/hooks/useReleaseDisputeFunds';
import { showErrorMessage } from 'utils/messageUtils';

//icons
import { CloseOutlined } from '@ant-design/icons';
import ImageIcon from 'assets/icons/image-icon.svg?react';
import FileViewIcon from 'assets/icons/file-view-icon.svg?react';
import FileDownloadIcon from 'assets/icons/download-icon.svg?react';
import VsIcon from 'assets/icons/vs-icon.svg?react';


interface DisputeDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    refetch: () => void;
    disputeId: string;
    setStatusMessage: any;
    setIsDoneModalOpen: any;
}

const DisputeDetailModal: React.FC<DisputeDetailModalProps> = ({
    isOpen,
    refetch,
    onClose,
    disputeId,
    setIsDoneModalOpen,
    setStatusMessage,
}) => {

    const { singleDisputeData, isLoading } = useGetSingleDisputeData(disputeId);
    const { releaseDisputeFundsMutate, isLoading: fundReleaseLoading } = useReleaseDisputeFunds();

    const handleReleaseFund = (releaseFundsTo: string) => {
        const upperCaseStatus = releaseFundsTo?.toUpperCase();

        releaseDisputeFundsMutate({ id: singleDisputeData?._id || disputeId, releaseFundsTo: upperCaseStatus },
            {
                onSuccess: () => {
                    setStatusMessage(`Funds Released To ${releaseFundsTo}`);
                    setIsDoneModalOpen(true);
                    refetch?.();
                    onClose();
                    setTimeout(() => {
                        setIsDoneModalOpen(false);
                        setStatusMessage('');
                    }, 1000);
                },
                onError: (error: any) => {
                    showErrorMessage(error?.response?.data?.message)
                },
            },
        );
    };

    const handleDownloadFile = async (doc: string) => {
        try {
            // Extract the file name from the URL
            const urlParts = doc.split('/');
            const fileName = urlParts[urlParts.length - 1]; // e.g., "animal-planet.png"

            // Fetch the file
            const response = await fetch(doc);
            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);

            // Create a temporary link and trigger download
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = fileName; // use extracted file name
            document.body.appendChild(link);
            link.click();
            link.remove();

            // Clean up
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error(error);
            alert('Error downloading the file.');
        }
    };


    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={670}
            className="dispute-detail-modal"
            centered
            title={
                <div className='flex justify-between items-center'>
                    <p className='font-medium text-2xl'>Dispute Detail</p>
                    <button onClick={onClose}>
                        <CloseOutlined size={24} />
                    </button>
                </div>
            }
            closable={false}
        >
            <Divider />
            {fundReleaseLoading ? <FallbackLoader isModal={true} size='large' /> : null}
            <div className='py-2 px-8'>
                {isLoading ? <FallbackLoader size='large' /> :
                    <>
                        {/* Dispute Information Card */}
                        <div className="mb-6">
                            <div className="bg-[#EFF4FE] rounded-2xl p-4">
                                <div className="flex flex-col text-sm text-medium-gray gap-3">
                                    <div className='flex items-center justify-between gap-2'>
                                        <span>Dispute ID:</span>
                                        <p>{singleDisputeData?._id}</p>
                                    </div>
                                    <div className='flex items-center justify-between gap-2'>
                                        <span>Amount in Dispute:</span>
                                        <p>{singleDisputeData?.amountInDispute} CFA</p>
                                    </div>
                                    <div className='flex items-center justify-between gap-2'>
                                        <span>Created:</span>
                                        <p>{singleDisputeData?.createdAt ? dayjs(singleDisputeData?.createdAt).format("YYYY-MM-DD") : ""}</p>
                                    </div>
                                    <div className='flex items-center justify-between gap-2'>
                                        <span>Dispute Reason:</span>
                                        <p>{singleDisputeData?.disputeReason}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="mb-6">
                            <h3 className="text-base font-medium mb-2">Description</h3>
                            <p className="text-medium-gray text-base font-normal leading-relaxed">{singleDisputeData?.description}</p>
                        </div>

                        {/* Parties Involved Section */}
                        <div className="mb-6">
                            <h3 className="text-base font-medium mb-2">Parties Involved</h3>
                            <div className="flex items-center justify-center gap-3">
                                {/* Dispute Initiator */}
                                <div className="bg-white border gap-4 border-border-gray rounded-2xl px-4 py-3 text-center w-full items-center flex">
                                    <img
                                        src={singleDisputeData?.creator?.profilePicture || "/images/dummy-profile-pic.jpg"}
                                        alt={singleDisputeData?.creator?.name}
                                        className="w-10 h-10 rounded-full object-cover border"
                                    />
                                    <div className='text-left'>
                                        <h4 className="font-medium text-base">{singleDisputeData?.creator?.name}</h4>
                                        <p className="text-sm text-medium-gray -mt-1">Dispute Initiator</p>
                                    </div>
                                </div>

                                {/* VS Text */}
                                <div className="flex-centered">
                                    <VsIcon />
                                </div>

                                {/* Property Lister */}
                                <div className="bg-white border gap-4 border-border-gray rounded-2xl px-4 py-3 text-center w-full items-center flex">
                                    <img
                                        src={singleDisputeData?.createdAgainst?.profilePicture || "/images/dummy-profile-pic.jpg"}
                                        alt={singleDisputeData?.createdAgainst?.name}
                                        className="w-10 h-10 rounded-full object-cover border"
                                    />
                                    <div className='text-left'>
                                        <h4 className="font-medium text-base">{singleDisputeData?.createdAgainst?.name}</h4>
                                        <p className="text-sm text-medium-gray -mt-1">Property Lister</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Evidence & Documents Section */}
                        <div className="mb-6">
                            <h3 className="text-base font-medium mb-2">Evidence & Documents</h3>
                            <div className="space-y-[6px] border border-border-gray rounded-2xl px-5 py-6">
                                {singleDisputeData?.evidenceDocuments.map((doc: string, index: number) => (
                                    <div key={index} className="bg-[#EEEEEE] rounded-xl p-3 h-[52px] flex items-center justify-between">
                                        <div className="flex items-center w-[50%]">
                                            <span className='w-6' > <ImageIcon /></span>
                                            <div className='w-full'>
                                                <Tooltip title={decodeURIComponent(doc).split("/").pop()}>
                                                    <p className="text-sm truncate max-w-full ml-3">{decodeURIComponent(doc).split("/").pop()}</p>
                                                </Tooltip>                                                {/* <p className="text-xs text-medium-gray">{doc.fileSize}</p> */}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => window.open(doc, '_blank')}
                                                icon={<FileViewIcon className='mt-1' />}
                                                className="text-medium-gray px-2 py-[14px] text-sm rounded-lg"
                                                size="small"
                                            >
                                                View
                                            </Button>
                                            <Button
                                                onClick={() => handleDownloadFile(doc)}
                                                icon={<FileDownloadIcon className='mt-1' />}
                                                className="text-medium-gray px-2 py-[14px] text-sm rounded-lg flex-centered"
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
                        {singleDisputeData?.status === "OPEN" && <div className="flex gap-4">
                            <Button
                                variant='text'
                                onClick={() => handleReleaseFund("Property Seeker")}
                                className="h-12 rounded-2xl flex-1 border-primary text-primary hover:bg-red-50"
                                type="default"
                                danger
                            >
                                Release Funds to Property Seeker
                            </Button>
                            <Button
                                onClick={() => handleReleaseFund("Lister")}
                                className="flex-1 h-12 rounded-2xl border-primary text-primary hover:bg-red-50"
                                type="default"
                                danger
                            >
                                Release Funds to Lister
                            </Button>
                        </div>}
                    </>
                }
            </div>
        </Modal>
    );
};

export default DisputeDetailModal;
