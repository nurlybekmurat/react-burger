import { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode
}

export const Layout:FC <IProps> = ({children}) => {
  return (
    <main className='constructor pl-5 pr-5 container'>
      {children}
    </main>
  )
}
