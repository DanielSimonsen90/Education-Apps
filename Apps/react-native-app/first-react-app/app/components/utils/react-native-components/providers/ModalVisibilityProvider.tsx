import { BaseProps } from 'danholibraryrjs';
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
export type ModalMountable = {
    onMount?: (id: string, showing: boolean) => void
    onUnmount?: (id: string, showing: boolean) => void
}

type ModalVisibilityState = (id: string, props?: ModalMountable) => GetModalType;
type GetModalType = [setVisibility: Dispatch<SetStateAction<boolean>>, visibility: boolean]
type ModalContextType = {
    modals: Map<string, boolean>    
    getModal: ModalVisibilityState
}

const ModalContext = createContext<ModalContextType>({ modals: new Map(), getModal: () => [() => false, false] });
export function useModalsVisible(id?: string) {
    const { modals, getModal } = useContext(ModalContext);
    if (id) return getModal(id)[1];

    return [...modals.entries()].some(([key, value]) => value);
}
export function useModalVisibility(id: string, props?: ModalMountable) {
    return useContext(ModalContext).getModal(id, props);
}

export default function ModalVisibilityProvider({ children }: BaseProps) {
    const [modals, setModals] = useState(new Map<string, boolean>());
    const getModal = (id: string, props?: ModalMountable): GetModalType => {
        const visibility = modals.get(id);
        const setVisibility = (state: boolean) => {
            if (props) state ? props.onMount?.(id, state) : props.onUnmount?.(id, state);
            setModals(ms => new Map([...ms, [id, state]]));
        }

        if (visibility === undefined) setVisibility(false);

        return [setVisibility, visibility] as GetModalType
    }

    return (
        <ModalContext.Provider value={{ modals, getModal }}>
            {children}
        </ModalContext.Provider>
    )
}