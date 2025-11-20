import { useRef, useState } from "react";
import { Button, Form, Input } from "antd";
//Hooks & Utils & Helpers
import { IMAGE_FILE_TYPES } from "utils/Interfaces";
import { showErrorMessage } from "utils/messageUtils";
import { formatFileSize, handleErrorMineImg } from "helpers/CustomHelpers";
import { useUserProfile } from "store/userProfile";
import useUploadFile from "../core/hooks/useUploadFile";
import useChangeProfile from "../core/hooks/useChangeProfile";
import * as authHelper from '../../../auth/core/auth-helpers';

import { MdDelete, MdEdit } from "react-icons/md";


function ProfileInformation() {
    const [fileObj, setFileObj] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const { getFileUrl } = useUploadFile();
    const { mutateChangeProfile } = useChangeProfile();

    // Reference to the hidden file input
    const fileInputRef = useRef<any>(null);

    const [form] = Form.useForm();
    const { userProfile } = useUserProfile();
    const { setUserProfile } = useUserProfile();

    // Watch the name field value dynamically
    const nameValue = Form.useWatch("name", form);

    const handleDisabled = () => {
        const nameUnchanged = nameValue === userProfile?.name;
        const hasNewImage = !!uploadedImageUrl && !!fileObj;
        return nameUnchanged && !hasNewImage;
    };

    const fileValidation = (file: File | undefined) => {
        if (!file) {
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return { error: true, message: "Please select a file" };
        }

        const fileExt = file.type.split("/")[1] || file.name.split(".").pop();
        const fileSizeMB = formatFileSize(file.size);

        // File type and size limits configuration
        const fileConfig = {
            image: {
                allowedTypes: IMAGE_FILE_TYPES,
                maxSize: 10,
                typeName: "Image"
            },
        };

        const config = fileConfig["image"];

        if (!config) {
            return { error: true, message: "Invalid file type selected." };
        }

        // Check file extension
        if (!config.allowedTypes.includes(`.${fileExt}`)) {
            return {
                error: true,
                message: `${config.typeName} file type must be valid format: ${config.allowedTypes.join(", ")}`
            };
        }

        // Check file size
        if (fileSizeMB > config.maxSize) {
            return {
                error: true,
                message: `${config.typeName} file size must be less than ${config.maxSize}MB`
            };
        }

        return { error: false, message: "" };
    };

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const error = fileValidation(file);
        if (error.error) {
            showErrorMessage(error.message);
            return;
        }

        if (file) {
            setFileObj(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveProfilePic = () => {
        setUploadedImageUrl(null);
        setFileObj(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const uploadSingleFile = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", file.name);
            formData.append("type", "user");

            getFileUrl(formData, {
                onSuccess: (data: any) => {
                    const signedUrl = data?.url;
                    if (signedUrl) {
                        resolve(signedUrl);
                    } else {
                        reject(new Error("No file Url is returned from server"));
                    }
                },
                onError: (error: any) => {
                    showErrorMessage(error?.response?.data?.message || "File upload failed");
                    reject(error);
                },
            });
        });
    };

    const validateData = () => {
        const trimmedName = nameValue?.trim() ?? "";

        if (!trimmedName) {
            showErrorMessage("Please enter your name.");
            return null;
        }

        const onlyLettersRegex = /^[A-Za-z\s]+$/;
        if (!onlyLettersRegex.test(trimmedName)) {
            showErrorMessage("Name can only contain uppercase and lowercase letters.");
            return null;
        }

        return trimmedName;
    };

    const handleChangeProfile = async () => {
        const validName = validateData();
        if (!validName) return;
        setIsLoading(true);

        let data: any = {
            name: validName,
        };

        if (fileObj && uploadedImageUrl) {
            const url = await uploadSingleFile(fileObj);
            data.profilePicture = url;
        }

        mutateChangeProfile(data, {
            onSuccess: (data: any) => {
                const userData = {
                    token: authHelper.getUser()?.token,
                    data: data
                }
                authHelper.setUser(userData);
                setUserProfile(userData.data);
                handleRemoveProfilePic();
                setIsLoading(false);
            },
            onError: (error: any) => {
                showErrorMessage(error?.response?.data?.message || "File upload failed");
                setIsLoading(false);
            },
        });
    };

    return (
        <section>
            <p className='py-5 text-2xl font-medium'>Profile Picture</p>

            {/* PROFILE PICTURE SECTION */}
            <div className='w-80 flex-centered relative'>

                {/* Hidden File Input */}
                <input
                    disabled={isLoading}
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    style={{ display: 'none' }}
                    id='imageUploadInput'
                    onChange={handleProfilePictureChange}
                />

                {/* Edit Button (click triggers input) */}
                {!isLoading && <label
                    className="flex-centered border border-border-gray cursor-pointer transition-all duration-300 hover:text-primary hover:border-primary p-1 -bottom-2 right-[120px] bg-white rounded-full absolute z-10"
                    htmlFor='imageUploadInput'
                >
                    <MdEdit size={24} />
                </label>}

                {/* Profile Image */}
                <div className='relative flex rounded-full border-2 flex-centered h-40 w-40'>
                    <img
                        src={fileObj && uploadedImageUrl || userProfile?.profilePicture}
                        alt='profile'
                        className='rounded-full w-full h-full object-contain bg-cover'
                        onError={handleErrorMineImg}
                    />
                </div>
                {!isLoading && fileObj && uploadedImageUrl && <button
                    onClick={handleRemoveProfilePic}
                    className="flex-centered border border-border-gray cursor-pointer transition-all duration-300 hover:text-primary hover:border-primary p-1 -bottom-2 left-[120px] bg-white rounded-full absolute z-10"
                >
                    <MdDelete size={24} className="text-red-500" />
                </button>}
            </div>

            {/* INFORMATION FORM */}
            <div className='flex gap-10'>
                <div className='w-80'>
                    <p className='py-5 text-2xl font-medium'>Information</p>

                    <Form
                        form={form}
                        name='information-form'
                        initialValues={{
                            name: userProfile?.name || '',
                            email: userProfile?.email || '',
                        }}
                        autoComplete='off'
                        layout="vertical"
                    >
                        <Form.Item
                            name='name'
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Name.',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input className='rounded-lg' placeholder='Name' disabled={isLoading} />
                        </Form.Item>

                        <Form.Item name='email' label="Email">
                            <Input className='rounded-lg' type='email' disabled />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                loading={isLoading}
                                type='primary'
                                disabled={handleDisabled() || isLoading}
                                onClick={handleChangeProfile}
                                className='w-full h-12 font-primary rounded-lg font-medium text-lg bg-secondary flex flex-centered transition'
                            >
                                Save Changes
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </section>
    );
}

export default ProfileInformation;
