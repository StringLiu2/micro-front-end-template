import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import Logo from '../../assets/logo.png';

interface Props {
    
}

function Node({}: Props): ReactElement {
    const user = useSelector((state: any) => state.user);
    return (
        <div>
            这是Node { user.userId }
            <img src={Logo}/>
        </div>
    )
}

export default Node
