import { useHeaderProps } from 'components/core/use-header-props';
import { useEffect } from 'react'

function Users() {
    const { setTitle } = useHeaderProps();

    useEffect(() => setTitle("Users"), [setTitle]);

    return (
        <div>Users</div>
    )
}

export default Users