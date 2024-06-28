import { PropsWithChildren } from 'react'

const Box = ({ children }: PropsWithChildren) => {
  return <div data-testid="box-test">{children}</div>
}

export default Box
