import { useHeaderProps } from 'components/core/use-header-props';
import { useEffect, useState } from 'react';
import { Card, Slider, Input, Button } from 'antd';

function Configurations() {
    const { setTitle } = useHeaderProps();
    const [serviceFeePercentage, setServiceFeePercentage] = useState(4);

    useEffect(() => setTitle("Configurations"), [setTitle]);

    const handleSliderChange = (value: number) => {
        setServiceFeePercentage(value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        if (value >= 0 && value <= 20) {
            setServiceFeePercentage(value);
        }
    };

    const handleSaveChanges = () => {
        // Handle save logic here
        console.log('Saving service fee percentage:', serviceFeePercentage);
    };

    return (
        <section>
            <Card
                title="Financial Settings"
                className="w-[400px] h-[380px]">
                <div>
                    {/* Service Fee Percentage Slider */}
                    <div className="mb-1">
                        <div className="relative">
                            <p className="text-sm text-black">
                                Service Fee Percentage
                            </p>
                            <Slider
                                min={0}
                                max={20}
                                value={serviceFeePercentage}
                                onChange={handleSliderChange}
                            />
                            <div className="flex justify-between text-xs text-medium-gray mt-2">
                                <span>{`${serviceFeePercentage}%`}</span>
                                <span>20%</span>
                            </div>
                        </div>
                        <p className="text-sm text-medium-gray mt-3">
                            Current service fee will be applied to all new bookings.
                        </p>
                    </div>

                    {/* Service Fee Percentage Input */}
                    <div className="mb-1">
                        <label className="block text-sm text-black mb-2 mt-4">
                            Service Fee Percentage
                        </label>
                        <div className="relative">
                            <Input
                                type="number"
                                value={serviceFeePercentage}
                                onChange={handleInputChange}
                                className="w-full h-12 px-4"
                                min={0}
                                max={20}
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-medium-gray">
                                %
                            </span>
                        </div>
                    </div>

                    {/* Save Changes Button */}
                </div>
            </Card>
            <div className=" mt-5 ml-[13.5rem]">
                <Button
                    type="primary"
                    onClick={handleSaveChanges}
                    className="font-normal px-8 py-3 h-12"
                >
                    Save Changes
                </Button>
            </div>
        </section>
    )
}

export default Configurations