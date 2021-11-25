import { BaseProps } from 'danholibraryrjs';
import React from 'react'
import TodosProvider from './TodosProvider';

type Props = BaseProps & {

}

export default function Providers({ children }: Props) {
    return (
        <TodosProvider>
            {children}
        </TodosProvider>
    )
}
