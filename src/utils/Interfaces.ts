interface User {
    _id: string;
    id: string;
    name: string;
    email: string;
    password?: string;
    role: "admin" | "user" | string; // Adjust according to your actual roles
    isVerified: boolean;
    status: "active" | "banned" | string; // Adjust according to your actual statuses
    aboutMe: string;
    appleSignInEnabled: boolean;
    appleSignInId: string;
    googleSignInEnabled: boolean;
    googleSignInId: string;
    stripeConnectedAccountId: string | null;
    notificationsEnabled: boolean;
    fcmTokens: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}