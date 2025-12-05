import { useEffect, useState } from 'react'
import { Empty, Pagination, Tooltip } from 'antd';
import { useHeaderProps } from 'components/core/use-header-props';
import dayjs from 'dayjs';
import FallbackLoader from 'components/core-ui/fallback-loader/FallbackLoader';
import { useSearchParams } from 'react-router-dom';
import useGetAllHelpCenterData from './core/hooks/useGetAllHelpCenterData';



const headers = [
    { label: "Name", className: "text-left" },
    { label: "Email", className: "text-left" },
    { label: "Date", className: "text-left" },
    { label: "Description", className: "text-left" },
]

function HelpCenter() {
    const { setTitle } = useHeaderProps();
    const [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState(() => ({
        page: Number(searchParams.get('page')) || 1,
        limit: 10,
    }));
    const [modifyData, setModifyData] = useState<any[]>([]);

    const { helpCenterData, isLoading } = useGetAllHelpCenterData(params);



    useEffect(() => setTitle("Help Centre"), [setTitle]);

    useEffect(() => {
        if (helpCenterData) {
            const addNewValues = helpCenterData?.data?.map((v: any) => {
                return {
                    ...v,
                    viewFullMessage: false
                }
            });
            setModifyData(addNewValues)
        }
    }, [helpCenterData]);

    const updatePageQuery = (page: number) => {
        const nextSearchParams = new URLSearchParams(searchParams);
        nextSearchParams.set('page', page.toString());
        setSearchParams(nextSearchParams);
    };

    const handleViewFullMessage = (data: any) => {
        const modifydataToViewMessage = modifyData.map((v: any) => {
            if (data._id === v._id) return { ...v, viewFullMessage: !v.viewFullMessage }
            else return { ...v }
        });
        setModifyData(modifydataToViewMessage);
    };



    return (
        <section>

            <div className='mt-5 border rounded-xl py-1 px-5 w-full overflow-x-auto '>
                {isLoading ?
                    <FallbackLoader size='large' />
                    :
                    <div className="max-h-[800px] min-w-[1024px] w-full">
                        <table className="border-separate border-spacing-y-2 w-full">
                            <thead>
                                <tr>
                                    {headers.map((header) => (
                                        <th
                                            key={header.label}
                                            className={`xl:px-4 px-2 py-3 ${header.className} font-medium text-sm`}
                                        >
                                            {header.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {helpCenterData?.data && helpCenterData?.data.length > 0 ?
                                    <>
                                        {modifyData?.map((help: any) => (
                                            <tr
                                                key={help?._id}
                                                className={`bg-[#FFFFFF9C] hover:bg-[#FFFFFF] transition-colors duration-300 text-sm`}
                                            >
                                                <Tooltip title={help?.user?.name || "-"}>
                                                    <td className="xl:px-4 px-2 py-3 truncate max-w-52">
                                                        {help?.user?.name || "-"}
                                                    </td>
                                                </Tooltip>
                                                <td className="xl:px-4 px-2 py-3">
                                                    {help?.user?.email || "-"}
                                                </td>
                                                <td className="xl:px-4 px-2 py-3  min-w-40">
                                                    {help?.createdAt ? dayjs(help?.createdAt).format("MM-DD-YYYY") : "-"}
                                                </td>
                                                {/* <td className="xl:px-4 px-2 py-3 truncate max-w-40 capitalize">
                                                    {help?.listing?.propertyTitle || "-"}
                                                </td> */}
                                                <td className="xl:px-4 px-2 py-3 capitalize max-w-lg">
                                                    {help.viewFullMessage ? help?.message : help?.message.slice(0, 200)}
                                                    <button className='text-primary underline ml-2' onClick={() => handleViewFullMessage(help)}>{help.viewFullMessage ? "See Less" : help.message.length > 200 ? "See More" : <></>}</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                    :
                                    <tr >
                                        <td colSpan={6}>
                                            <Empty />
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>

            {helpCenterData?.totalItems > params?.limit &&
                <Pagination
                    className="mt-5 justify-center"
                    current={params?.page}
                    pageSize={params?.limit}
                    total={helpCenterData?.totalItems}
                    onChange={(page) => {
                        setParams(prev => ({ ...prev, page }));
                        updatePageQuery(page);
                    }}
                    showSizeChanger={false}
                />}

        </section>
    )
}

export default HelpCenter