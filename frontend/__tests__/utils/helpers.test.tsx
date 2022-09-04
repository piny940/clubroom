import { toClass } from '../../utils/helpers'
import { expect } from '@jest/globals'

describe('toClass', () => {
  test('正常にclassNameに変換できる', () => {
    expect(toClass('aa', 'bb', 'cc')).toBe('aa bb cc')
  })

  test('引数に何も与えられなかった場合は空文字を返す', () => {
    expect(toClass()).toBe('')
  })
})
