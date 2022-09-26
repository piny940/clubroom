import { useState } from 'react'
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
  const [hasCopied, setHasCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setHasCopied(true)
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
        className="lh-1"
        data-tip="Copy!"
        onClick={async () => await copy()}
        data-testid={testID}
      >
        <Tooltip
          text={hasCopied ? 'Copied!' : 'Copy!'}
          onHidden={() => setHasCopied(false)}
        >
          <MaterialIcon name="content_copy" />
        </Tooltip>
      </a>
    </div>
  )
}
