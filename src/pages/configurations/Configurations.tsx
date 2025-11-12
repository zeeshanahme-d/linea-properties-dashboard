import { useHeaderProps } from 'components/core/use-header-props';
import { useEffect, useState } from 'react';
import { Card, Slider, Input, Button } from 'antd';
import { useGetConfigurationDataFromStore } from 'store/configurationData';
import FallbackLoader from 'components/core-ui/fallback-loader/FallbackLoader';
import useChangeConfiguration from './core/hooks/useChangeConfiguration';
import { showErrorMessage, showSuccessMessage } from 'utils/messageUtils';

function Configurations() {
    const { setTitle } = useHeaderProps();
    const { configurationData, isLoading, setConfigurationData } = useGetConfigurationDataFromStore();
    const { changeConfigurationMutate, isLoading: changeLoading } = useChangeConfiguration();
    const [serviceFeePercentage, setServiceFeePercentage] = useState<number>(configurationData?.value || 0);

    useEffect(() => setTitle("Configurations"), [setTitle]);
    useEffect(() => setServiceFeePercentage(configurationData?.value || 0), [configurationData]);

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
        const body = {
            value: serviceFeePercentage || 0,
            valueType: "PERCENTAGE",
        }

        changeConfigurationMutate(body,
            {
                onSuccess: (res) => {
                    setServiceFeePercentage(res.value);
                    setConfigurationData(res)
                    showSuccessMessage("Service fee updated successfully!");
                },
                onError: (error: any) => {
                    showErrorMessage(error?.response?.data?.message);
                },
            },
        );
    };

    return (
        <section>
            <Card
                title="Financial Settings"
                className="w-[400px] h-[380px]">
                {isLoading || changeLoading ? <FallbackLoader isModal={true} size='large' /> : null}
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
                                className="w-full h-12 px-4 text-medium-gray"
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
                    disabled={isLoading || changeLoading || serviceFeePercentage === configurationData?.value}
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