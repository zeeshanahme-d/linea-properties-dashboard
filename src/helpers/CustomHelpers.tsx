
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

export const handleDownloadFile = async (doc: string) => {
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