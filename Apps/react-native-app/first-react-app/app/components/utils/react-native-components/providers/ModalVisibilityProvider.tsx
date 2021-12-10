import { BaseProps } from 'danholibraryrjs'
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

type SetModalType = [setModalVisibility: Dispatch<SetStateAction<boolean>>, showing: boolean];
type ModalsContextType = [modals: Map<string, boolean>, setModals: Dispatch<SetStateAction<Map<string, boolean>>>];
const ModalsContext = createContext<ModalsContextType>([new Map(), () => new Map()])

export function useModalVisibility(id: string): SetModalType {
    const [modals, setModals] = useContext(ModalsContext);
    const [visible, _setVisible] = useState(modals.get(id) ?? false);
    const setVisible = (state: SetStateAction<boolean>) => {
        console.log(state);
        
        setModals(ms => ms.set(id, 
            typeof state === 'function' ? 
            state(visible) : 
            state
        ));
        _setVisible(state);
    }

    console.log(`useModalVisibility, ${id}: ${visible}`);

    return [setVisible, visible]
}

type Props = BaseProps & {

}

export default function ModalVisibilityProvider({ children }: Props) {
    const [modals, setModals] = useState<Map<string, boolean>>(new Map());
    const getModal = (id: string): SetModalType => {
        const visibility = modals.get(id) ?? false;
        const setVisibility = (state: boolean | ((preState: boolean) => boolean)) => setModals(ms => ms.set(id, typeof state === 'function' ? state(visibility) : state));
        return [setVisibility, visibility];
    }

    return (
        <ModalsContext.Provider value={getModal}>
            {children}
        </ModalsContext.Provider>
    )
}
