import { MouseEventHandler } from 'react'
import { toClass } from '../../utils/helpers'
import { MaterialIcon } from './MaterialIcon'
import { Tooltip } from './Tooltip'

export interface CopyTextBoxProps {
  text: string
  className?: string
  onSuccess?: () => void
  testID?: string
}

export const CopyTextBox: React.FC<CopyTextBoxProps> = ({
  text,
  className = '',
  onSuccess = () => undefined,
  testID,
}) => {
  const copy: MouseEventHandler = async (e) => {
    await navigator.clipboard.writeText(text)
    onSuccess()
  }

  return (
    <div className={toClass('d-flex align-items-center', className)}>
      <input
        type="text"
        className="form-control py-1 me-2"
        disabled
        readOnly
        value={text}
      />
      <a
        role="button"
        className="lh-1 position-relative"
        data-tip="Copy!"
        onClick={copy}
        data-testid={testID}
      >
        <Tooltip text="Copy!" />
        <MaterialIcon name="content_copy" />
      </a>
    </div>
  )
}
