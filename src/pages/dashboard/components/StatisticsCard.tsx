import React from 'react';

interface StatisticsCardProps {
    title: string;
    data: string | number;
    icon?: React.ReactNode;
    iconColor?: string;
    className?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
    title,
    data,
    icon,
    iconColor = '#ff6b6b',
    className = ''
}) => {
    return (
        <div className={`rounded-2xl bg-white border relative ${className} py-3 px-5 flex flex-col`}>
            {/* Title */}
            <div className="text-sm text-medium-gray font-normal mb-2 flex items-center justify-between">
                {title}
                {icon && (
                    <div
                        className="w-[40px] h-[40px] rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: iconColor }}
                    >
                        {icon}
                    </div>
                )}
            </div>

            {/* Data */}
            <div className="text-xl xl:text-2xl font-bold text-black leading-tight">
                {data}
            </div>

        </div>
    );
};

export default StatisticsCard;
