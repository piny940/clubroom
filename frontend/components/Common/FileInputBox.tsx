import { useEffect, useRef } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'
import { BreakPoint } from '../../resources/types'

export interface FileInputBoxProps {
  label: string
  name: string
  required?: boolean
  testID: string
  breakPoint?: BreakPoint
  setValue: UseFormSetValue<FieldValues>
  accept: string[]
}

export const FileInputBox: React.FC<FileInputBoxProps> = ({
  label,
  name,
  required = false,
  testID,
  breakPoint = 'lg',
  setValue,
  accept,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.addEventListener('change', () => {
      if (!inputRef.current?.files) return
      setValue(name, inputRef.current?.files[0])
    })
  }, [])

  return (
    <label className="row form-group my-3">
      <div className={`col-form-label col-${breakPoint}-3`}>{label}</div>
      <div className={`col-${breakPoint}-9`}>
        <input
          type="file"
          name={name}
          className="form-control"
          data-test-id={testID}
          required={required}
          ref={inputRef}
          accept={accept.join(',')}
        />
      </div>
    </label>
  )
}
