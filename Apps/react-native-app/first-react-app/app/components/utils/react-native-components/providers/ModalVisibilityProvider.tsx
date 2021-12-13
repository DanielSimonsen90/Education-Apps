import { BaseProps } from 'danholibraryrjs';
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
export type ModalMountable = {
    onMount?: (id: string, showing: boolean) => void
    onUnmount?: (id: string, showing: boolean) => void
}

type ModalContextType = (id: string, props?: ModalMountable) => ModalContextReturnType;
type ModalContextReturnType = [setVisibility: Dispatch<SetStateAction<boolean>>, visibility: boolean]

const ModalContext = createContext<ModalContextType>(() => [() => false, false]);
export function useModalVisibility(id: string, props?: ModalMountable) {
    return useContext(ModalContext)(id, props);
}

export default function ModalVisibilityProvider({ children }: BaseProps) {
    const [modals, setModals] = useState(new Map<string, boolean>());
    const getModal = (id: string, props?: ModalMountable): ModalContextReturnType => {
        const visibility = modals.get(id);
        const setVisibility = (state: boolean) => {
            if (props) state ? props.onMount?.(id, state) : props.onUnmount?.(id, state);
            setModals(ms => new Map([...ms, [id, state]]));
        }

        if (visibility === undefined) setVisibility(false);

        return [setVisibility, visibility] as ModalContextReturnType
    }

    return (
        <ModalContext.Provider value={getModal}>
            {children}
        </ModalContext.Provider>
    )
}