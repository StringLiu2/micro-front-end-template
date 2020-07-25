import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'element-react';

interface Props {
    
}

function Menu({}: Props): ReactElement {
    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    return (
        <div>
            这是Menu { user.userId }
            <Button onClick={() => {
                dispatch({ type: '' })
            }}>点击++</Button>
        </div>
    )
}

export default Menu
