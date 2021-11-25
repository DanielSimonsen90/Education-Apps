import { BaseProps } from 'danholibraryrjs'
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

type ModalContextType = [setShowing: Dispatch<SetStateAction<boolean>>, showing: boolean]
const ModalContext = createContext<ModalContextType>([() => false, false])

export function useModalVisibility() {
    return useContext(ModalContext);
}

type Props = BaseProps & {

}

export default function ModalVisibilityProvider({ children }: Props) {
    const [visible, setVisible] = useState(false);

    console.log("Visibility", visible);
    

    return (
        <ModalContext.Provider value={[setVisible, visible]}>
            {children}
        </ModalContext.Provider>
    )
}
