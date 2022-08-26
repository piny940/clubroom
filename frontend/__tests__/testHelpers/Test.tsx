import { TestID } from '../../resources/TestID'

export interface TestProps {
  textContent?: string
}

export const Test: React.FC<TestProps> = ({ textContent }) => {
  return <div data-testid={TestID.TEST}>{textContent}</div>
}
