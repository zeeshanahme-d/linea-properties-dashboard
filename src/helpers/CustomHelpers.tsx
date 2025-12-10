
export function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export const getShortMonthName = (month: string) => {
    const months: Record<string, string> = {
        January: "Jan",
        February: "Feb",
        March: "Mar",
        April: "Apr",
        May: "May",
        June: "Jun",
        July: "Jul",
        August: "Aug",
        September: "Sep",
        October: "Oct",
        November: "Nov",
        December: "Dec",
    };
    return months[month] || month;
};

export const handleErrorMineImg: React.EventHandler<React.SyntheticEvent<HTMLImageElement, Event>> = (e) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png'
};

export const formatFileSize = (bytes: number | undefined): number => {
    if (!bytes) return 0;
    const mb = bytes / (1024 * 1024);
    return parseFloat(mb.toFixed(2));
};

export const getFirstCharacterOfTheName = (name: string = "") => {
    return name.trim().charAt(0).toUpperCase();
};
