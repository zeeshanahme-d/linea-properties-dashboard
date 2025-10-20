import { useHeaderProps } from 'components/core/use-header-props';
import { useEffect } from 'react'

function Configurations() {
    const { setTitle } = useHeaderProps();

    useEffect(() => setTitle("Configurations"), [setTitle]);

    return (
        <div>Configurations</div>
    )
}

export default Configurations