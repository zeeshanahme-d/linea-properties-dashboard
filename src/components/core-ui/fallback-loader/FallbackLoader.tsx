import { Spin } from "antd"


const FallbackLoader = ({ isModal = false, size = "default", className = "" }: { isModal?: boolean, size?: "default" | "large" | "small", className?: string }) => {
    const modalClass = "absolute backdrop-blur-sm w-full h-full z-50 centered-xy flex justify-center items-center"
    return (
        <div className={`${isModal ? modalClass : 'flex justify-center items-center h-32'} ${className}`}>
            <Spin size={size} />
        </div>
    )
}


export default FallbackLoader;