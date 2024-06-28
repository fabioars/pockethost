/// <require "node">

import chalk from 'chalk'
import stringify from 'json-stringify-safe'
import { doLogAction, mergeConfig, mkSingleton } from '.'

export type LoggerConfig = {
  level: LogLevelName
  pfx: string[]
}

export type Logger = ReturnType<typeof createLogger>

export const isLevelLte = (a: LogLevelName, b: LogLevelName) => {
  return LogLevels[a] <= LogLevels[b]
}

export const isLevelGt = (a: LogLevelName, b: LogLevelName) => {
  return LogLevels[a] > LogLevels[b]
}

export const isLevelGte = (a: LogLevelName, b: LogLevelName) => {
  return LogLevels[a] >= LogLevels[b]
}

export enum LogLevelName {
  Trace = 'trace',
  Raw = 'raw',
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
  Abort = 'abort',
}

export const LEVEL_NAMES = [
  LogLevelName.Trace,
  LogLevelName.Raw,
  LogLevelName.Debug,
  LogLevelName.Info,
  LogLevelName.Warn,
  LogLevelName.Error,
  LogLevelName.Abort,
]

export const LogLevels = {
  [LogLevelName.Trace]: 0,
  [LogLevelName.Raw]: 1,
  [LogLevelName.Debug]: 2,
  [LogLevelName.Info]: 3,
  [LogLevelName.Warn]: 4,
  [LogLevelName.Error]: 5,
  [LogLevelName.Abort]: 6,
} as const

export const namespace = (...names: string[]) =>
  names
    .filter((v) => !!v)
    .map((p) => `[${p}]`)
    .join(' ')

export const createLogger = (config: Partial<LoggerConfig>) => {
  const _config = mergeConfig<LoggerConfig>(
    {
      level: LogLevelName.Debug,
      pfx: [''],
    },
    config,
  )
  const { pfx } = _config

  const setLevel = (level: LogLevelName) => {
    _config.level = level
  }

  const _pfx = (s: string) => namespace(s, ...pfx)

  const _log = (levelIn: LogLevelName, ...args: any[]) => {
    doLogAction({
      currentLevel: _config.level,
      levelIn,
      args,
    })
  }

  const raw = (...args: any[]) => {
    _log(LogLevelName.Raw, _pfx('RAW'), ...args)
  }

  const trace = (...args: any[]) => {
    _log(LogLevelName.Trace, _pfx(`TRACE`), ...args)
  }

  const dbg = (...args: any[]) => {
    _log(LogLevelName.Debug, _pfx(chalk.blueBright('DBG')), ...args)
  }

  const info = (...args: any[]) => {
    const _args = (() => {
      if (isLevelGt(LogLevelName.Info, _config.level)) {
        return [_pfx(chalk.gray(`INFO`)), ...args]
      }
      return [...args]
    })()
    _log(
      LogLevelName.Info,

      ..._args,
    )
  }

  const warn = (...args: any[]) => {
    _log(
      LogLevelName.Warn,
      _pfx(chalk.yellow(chalk.cyanBright('WARN'))),
      ...args,
    )
  }

  const error = (...args: any[]) => {
    _log(LogLevelName.Error, ...[_pfx(chalk.bgRed(`ERROR`)), ...args])
  }

  const criticalError = (...args: any[]) => {
    _log(LogLevelName.Error, ...[_pfx(chalk.bgRed(`ERROR`)), ...args])
    new Error().stack?.split(/\n/).forEach((line) => {
      _log(LogLevelName.Debug, _pfx(chalk.bgRed(`ERROR`)), line)
    })
  }

  const abort = (...args: any[]): never => {
    _log(LogLevelName.Abort, true, ...[_pfx(chalk.bgRed(`ABORT`)), ...args])
    throw new Error(`Fatal error: ${stringify(args)}`)
  }

  const create = (s: string, configOverride?: Partial<LoggerConfig>) =>
    createLogger({
      ..._config,
      ...configOverride,
      pfx: [..._config.pfx, s],
    })

  const breadcrumb = (s: string) => {
    pfx.push(s)
    return api
  }

  // Compatibility func
  const child = (extra: any) => create(stringify(extra))

  const api = {
    raw,
    dbg,
    warn,
    info,
    error,
    criticalError,
    create,
    child,
    trace,
    debug: dbg,
    breadcrumb,
    abort,
    shutdown() {
      dbg(`Logger shutting down`)
    },
    setLevel,
  }
  return api
}

export const LoggerService = mkSingleton((config: Partial<LoggerConfig> = {}) =>
  createLogger(config),
)
