import { Spin } from "antd"

interface FallBackLoaderTypes {
    isModal?: boolean,
    size?: "default" | "large" | "small",
    className?: string,
    removeHeight?: boolean
}

const FallbackLoader = ({ isModal = false, size = "default", className = "", removeHeight = false }: FallBackLoaderTypes) => {
    const modalClass = "absolute backdrop-blur-sm w-full h-full z-50 centered-xy flex justify-center items-center"
    return (
        <div className={`${isModal ? modalClass : `flex justify-center items-center ${removeHeight ? "" : "h-32"}`} ${className}`}>
            <Spin size={size} />
        </div>
    )
}


export default FallbackLoader;