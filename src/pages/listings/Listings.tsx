import { useHeaderProps } from 'components/core/use-header-props';
import { useEffect } from 'react'

function Listings() {
    const { setTitle } = useHeaderProps();

    useEffect(() => setTitle("Listings"), [setTitle]);

    return (
        <div>Listings</div>
    )
}

export default Listings