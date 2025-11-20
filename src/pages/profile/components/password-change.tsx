import { Button, Input } from "antd";
import { useState } from "react";
import { showErrorMessage, showSuccessMessage } from "utils/messageUtils";
import useChangePassword from "../core/hooks/use-change-password";


interface PasswordState {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

function PasswordChange() {
    const { changePasswordMutate, isLoading } = useChangePassword();
    const [passState, setPassState] = useState<PasswordState>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleOnChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setPassState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangePassword = () => {
        if (
            !passState.currentPassword ||
            !passState.newPassword ||
            !passState.confirmPassword
        ) {
            showErrorMessage('All password fields are required');
            return;
        }
        if (passState.newPassword !== passState.confirmPassword) {
            showErrorMessage('New password and confirmation password do not match');
            return;
        }
        handlePasswordChange();
    };


    const handlePasswordChange = () => {

        const body = {
            oldPassword: passState.currentPassword.trim(),
            newPassword: passState.newPassword.trim(),
        };
        changePasswordMutate(body, {
            onSuccess: () => {
                showSuccessMessage('Password change successfull.');
                resetState();
            },
            onError: (error: any) => {
                showErrorMessage(error?.response?.data?.message);
            },
        }
        );
    };

    const resetState = () => {
        setPassState({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };


    return (
        <section>
            {/* Password change */}
            <p className='py-5 text-2xl font-medium'>Password</p>

            <div className="flex flex-col gap-4 mt-5 max-w-sm">
                <Input.Password
                    placeholder='Enter current password'
                    name="currentPassword"
                    type="password"
                    value={passState.currentPassword}
                    disabled={isLoading}
                    onChange={(e) => handleOnChangePass(e)}
                    className={`h-12 rounded-lg`}
                />
                <Input.Password
                    placeholder='Enter new password'
                    type="password"
                    value={passState.newPassword}
                    onChange={(e) => handleOnChangePass(e)}
                    name="newPassword"
                    disabled={isLoading}
                    className={`h-12 rounded-lg`}
                />
                <Input.Password
                    placeholder='Re-enter new password'
                    type="password"
                    value={passState.confirmPassword}
                    onChange={(e) => handleOnChangePass(e)}
                    name="confirmPassword"
                    disabled={isLoading}
                    className={`h-12 rounded-lg`}
                />
                <Button
                    type="primary"
                    className={`h-12 rounded-lg`}
                    onClick={handleChangePassword}
                    loading={isLoading}
                >
                    Change Password
                </Button>
            </div>
        </section>
    );
};


export default PasswordChange;