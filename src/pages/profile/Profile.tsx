import React, { useEffect } from "react";
import { useHeaderProps } from "components/core/use-header-props";
import * as authHelper from '../../auth/core/auth-helpers'


const Profile: React.FC = () => {
    const { setTitle } = useHeaderProps();
    const currentUser = authHelper.getUser()?.data;
    // const { changePasswordMutate, isLoading } = useChangePassword();
    // const [passState, setPassState] = useState({
    //     currentPassword: "",
    //     newPassword: "",
    //     confirmPassword: "",
    // });

    // const handleOnChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;

    //     setPassState((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };

    useEffect(() => setTitle("Profile"), [setTitle,]);


    // const handleChangePassword = () => {
    //     if (
    //         !passState.currentPassword ||
    //         !passState.newPassword ||
    //         !passState.confirmPassword
    //     ) {
    //         showErrorMessage(t('All password fields are required'));
    //         return;
    //     }
    //     if (passState.newPassword !== passState.confirmPassword) {
    //         showErrorMessage(t('New password and confirmation password do not match'));
    //         return;
    //     }
    //     handlePasswordChange();
    // };


    // const handlePasswordChange = () => {

    //     const body = {
    //         currentPassword: passState.currentPassword.trim(),
    //         newPassword: passState.newPassword.trim(),
    //         confirmPassword: passState.confirmPassword.trim(),
    //     };
    //     changePasswordMutate(body, {
    //         onSuccess: () => {
    //             showSuccessMessage(t('Password updated successfully'));
    //             resetState();
    //         },
    //         onError: (error: any) => {
    //             showErrorMessage(error?.response?.data?.message);
    //         },
    //     }
    //     );
    // };

    // const resetState = () => {
    //     setPassState({
    //         currentPassword: "",
    //         newPassword: "",
    //         confirmPassword: "",
    //     });
    // };


    return (
        <section>
            {/* User info */}
            <div className="grid grid-cols-3 gap-6 gap-y-12 text-lg mb-10">
                <div>
                    <p className="text-medium-gray">Full Name</p>
                    <p className="mt-3 capitalize">{currentUser?.name}</p>
                </div>
                <div>
                    <p className="text-medium-gray">Email Address</p>
                    <p className="mt-3">{currentUser?.email}</p>
                </div>
                <div>
                    <p className="text-medium-gray">Role</p>
                    <p className="mt-3 capitalize">{currentUser?.role}</p>
                </div>
            </div>

            {/* <Divider /> */}

            {/* Password change */}
            {/* <div className="grid grid-cols-4 gap-4 mt-10">
                <Input.Password
                    dir={direction}
                    placeholder={t('Enter current password')}
                    name="currentPassword"
                    type="password"
                    value={passState.currentPassword}
                    onChange={(e) => handleOnChangePass(e)}
                />
                <Input.Password
                    dir={direction}
                    placeholder={t('Enter new password')}
                    type="password"
                    value={passState.newPassword}
                    onChange={(e) => handleOnChangePass(e)}
                    name="newPassword"
                />
                <Input.Password
                    dir={direction}
                    placeholder={t('Re-enter new password')}
                    type="password"
                    value={passState.confirmPassword}
                    onChange={(e) => handleOnChangePass(e)}
                    name="confirmPassword"
                />
                <Button
                    type="primary"
                    className={`bg-black text-white h-full rounded-lg`}
                    onClick={handleChangePassword}
                    loading={isLoading}
                >
                    Change Password
                </Button>
            </div> */}
        </section>
    );
};

export default Profile;
