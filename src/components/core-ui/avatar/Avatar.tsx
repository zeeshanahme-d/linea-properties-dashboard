import { useEffect, useState } from 'react';
import { getFirstCharacterOfTheName } from 'helpers/CustomHelpers';

interface AvatarProps {
  profilePicture?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-lg',
  lg: 'w-16 h-16 text-xl',
  xl: 'w-[100px] h-[100px] text-2xl',
};

function Avatar({ profilePicture, name = 'Admin', size = 'md', className = '' }: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Reset image error when profile picture URL changes
    setImageError(false);
  }, [profilePicture]);

  const sizeClass = sizeClasses[size];
  const baseClasses = 'bg-gray-200 font-semibold rounded-full flex items-center justify-center cursor-pointer';

  return (
    <div className={`${baseClasses} ${sizeClass} ${className}`}>
      {profilePicture && !imageError ? (
        <img
          src={profilePicture}
          alt="Profile Picture"
          className="w-full h-full object-contain rounded-full"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-medium capitalize">
          {getFirstCharacterOfTheName(name)}
        </span>
      )}
    </div>
  );
}

export default Avatar;
