import { reduce, uniqueId, values } from '@s-libs/micro-dash'
import { LoggerService } from '.'

export type CleanupFunc = () => Promise<void> | void

type CleanupRec = {
  cleanup: CleanupFunc
  priority: number
}

export const CLEANUP_DEFAULT_PRIORITY = 10
export const CLEANUP_PRIORITY_HIGH = 1
export const CLEANUP_PRIORITY_LOW = 20
export const CLEANUP_PRIORITY_LAST = 1000

export type CleanupManagerApi = ReturnType<typeof createCleanupManager>

export const createCleanupManager = (slug?: string) => {
  const _slug = slug || uniqueId()

  const { error, warn, dbg } = LoggerService().create(`cleanupManager:${_slug}`)

  let i = 0

  const cleanups: { [_: number]: CleanupRec } = {}

  const add = (cb: CleanupFunc, priority = CLEANUP_DEFAULT_PRIORITY) => {
    const idx = i++

    const cleanup = async () => {
      await cb()
      delete cleanups[idx]
    }

    cleanups[idx] = { cleanup, priority }

    return cleanup
  }

  let _shutdownP: Promise<void> | undefined = undefined

  const shutdown: () => Promise<void> = () => {
    if (_shutdownP) return _shutdownP

    const _cleanupFuncs = values(cleanups)
      .sort((a, b) => a.priority - b.priority)
      .map((v) => v.cleanup)
    _shutdownP = reduce(
      _cleanupFuncs,
      (c, v) => {
        return c.then(() => v())
      },
      Promise.resolve(),
    ).catch((e) => {
      error(
        `Cleanup functions are failing. This should never happen, check all cleanup functions to make sure they are trapping their exceptions.`,
      )
      throw e
    })

    return _shutdownP
  }

  return { add, shutdown }
}
