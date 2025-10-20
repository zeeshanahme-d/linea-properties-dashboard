import { useHeaderProps } from 'components/core/use-header-props';
import { useEffect } from 'react'

function Withdrawals() {
    const { setTitle } = useHeaderProps();

    useEffect(() => setTitle("Withdrawals"), [setTitle]);

    return (
        <div>Withdrawals</div>
    )
}

export default Withdrawals