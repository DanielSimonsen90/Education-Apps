import { BaseProps } from 'danholibraryrjs'
import React from 'react'
import ModalVisibilityProvider from './ModalVisibilityProvider'

type Props = BaseProps & {

}

export default function Prodivders({ children }: Props) {
    return (
        <ModalVisibilityProvider>
            {children}
        </ModalVisibilityProvider>
    )
}
