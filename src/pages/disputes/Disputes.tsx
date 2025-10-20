import { useHeaderProps } from 'components/core/use-header-props';
import { useEffect } from 'react'

function Disputes() {
    const { setTitle } = useHeaderProps();

    useEffect(() => setTitle("Disputes"), [setTitle]);

    return (
        <div>Disputes</div>
    )
}

export default Disputes