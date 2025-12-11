import { useHeaderProps } from 'components/core/use-header-props';
import { useEffect, useState } from 'react';
import { Card, Slider, Input, Button } from 'antd';
import { useGetConfigurationDataFromStore } from 'store/configurationData';
import { useGetPromotionFeeDataFromStore } from 'store/promotionFeeData';
import FallbackLoader from 'components/core-ui/fallback-loader/FallbackLoader';
import useChangeConfiguration from './core/hooks/useChangeConfiguration';
import useChangePromotionFee from './core/hooks/useChangePromotionFee';
import { showErrorMessage, showSuccessMessage } from 'utils/messageUtils';

function Configurations() {
    const { setTitle } = useHeaderProps();
    const { configurationData, isLoading, setConfigurationData } = useGetConfigurationDataFromStore();
    const { promotionFeeData, isLoading: promotionFeeLoading, setPromotionFeeData } = useGetPromotionFeeDataFromStore();
    const { changeConfigurationMutate, isLoading: changeLoading } = useChangeConfiguration();
    const { changePromotionFeeMutate, isLoading: changePromotionFeeLoading } = useChangePromotionFee();
    const [serviceFeePercentage, setServiceFeePercentage] = useState<string>(configurationData?.value.toString() || "0");
    const [promotionFee, setPromotionFee] = useState<string>(promotionFeeData?.value.toString() || "0");

    useEffect(() => setTitle("Configurations"), [setTitle]);
    useEffect(() => setServiceFeePercentage(configurationData?.value.toString() || "0"), [configurationData]);
    useEffect(() => setPromotionFee(promotionFeeData?.value.toString() || "0"), [promotionFeeData]);

    const handleSliderChange = (value: number) => {
        setServiceFeePercentage(value.toString());
    };

    const handleSaveChanges = () => {
        const body = {
            value: Number(serviceFeePercentage) || 0,
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

    const handleSavePromotionFeeChanges = () => {
        const body = {
            value: Number(promotionFee) || 0,
        }

        changePromotionFeeMutate(body,
            {
                onSuccess: (res) => {
                    setPromotionFee(res.value);
                    setPromotionFeeData(res)
                    showSuccessMessage("Promotion fee updated successfully!");
                },
                onError: (error: any) => {
                    showErrorMessage(error?.response?.data?.message);
                },
            },
        );
    };

    return (
        <section className='flex items-center flex-wrap gap-10'>
            <div>
                <Card
                    title="Financial Settings"
                    className="w-[400px] h-[380px] financialSettings">
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
                                    value={Number(serviceFeePercentage)}
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
                                    // onChange={handleInputChange}
                                    onChange={(e) => {
                                        // Allow only numbers
                                        if (e.target.value <= "20") {
                                            const value = e.target.value.replace(/\D/g, "");
                                            setServiceFeePercentage(value);
                                        }
                                    }}
                                    className="w-full h-12 px-4 text-medium-gray focus:!bg-[#ffffff]"
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
                        disabled={isLoading || changeLoading || serviceFeePercentage === configurationData?.value.toString()}
                        type="primary"
                        onClick={handleSaveChanges}
                        className="font-normal px-8 py-3 h-12"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
            <div>
                <Card
                    title="Promotion Settings"
                    className="w-[400px] h-[380px] financialSettings">
                    {promotionFeeLoading || changePromotionFeeLoading ? <FallbackLoader isModal={true} size='large' /> : null}
                    <div>
                        <div className="mb-4">
                            <p className="text-sm text-medium-gray">
                                Current promotion fee will be applied to all new listing promotions.
                            </p>
                        </div>
                        {/* Promotion Fee Input */}
                        <div className="mb-1">
                            <label className="block text-sm text-black mb-2">
                                Promotion Fee
                            </label>
                            <Input
                                type="text"
                                value={promotionFee}
                                onChange={(e) => {
                                    // Allow only numbers
                                    const value = e.target.value.replace(/\D/g, "");
                                    setPromotionFee(value);
                                }}
                                className="w-full h-12 px-4 text-medium-gray focus:!bg-[#ffffff]"
                                min={0}
                            />
                        </div>
                    </div>
                </Card>
                <div className=" mt-5 ml-[13.5rem]">
                    <Button
                        disabled={promotionFeeLoading || changePromotionFeeLoading || promotionFee === promotionFeeData?.value.toString()}
                        type="primary"
                        onClick={handleSavePromotionFeeChanges}
                        className="font-normal px-8 py-3 h-12"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Configurations