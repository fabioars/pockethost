#!/usr/bin/env tsx

import { uniq } from '@s-libs/micro-dash'
import { boolean } from 'boolean'
import { program } from 'commander'
import { readFileSync } from 'fs'
import minimist from 'minimist'
import updateNotifier from 'update-notifier'
import { PH_PLUGINS, PH_PROJECT_DIR } from '../../core'
import {
  DEBUG,
  LogLevelName,
  LoggerService,
  doAfterPluginsLoadedAction,
  doCliCommandsFilter,
  loadPlugins,
} from '../common'
import { pockethost } from '../plugin'
import { ConfigCommand } from './commands/ConfigCommand'
import { PluginCommand } from './commands/PluginCommand'
import { ServeCommand } from './commands/ServeCommand'

export const { dbg, info, error } = LoggerService({
  level: DEBUG() ? LogLevelName.Debug : LogLevelName.Info,
})

export type GlobalOptions = {
  extraPlugins: string[]
}

export const main = async () => {
  const pkg = await JSON.parse(
    readFileSync(PH_PROJECT_DIR(`package.json`), 'utf8').toString(),
  )
  updateNotifier({ pkg }).notify()

  const { version } = pkg

  const argv = minimist<{ e: string }>(process.argv.slice(2), {
    alias: { e: 'extra-plugins' },
    default: { e: '', debug: DEBUG() },
  })
  const extraPlugins = argv.e
    .split(/,/)
    .map((s) => s.trim())
    .filter((v) => !!v)

  const isDebug = boolean(argv.debug)
  process.env.PH_DEBUG = isDebug.toString()

  const filteredArgv = process.argv.filter(
    (arg) => ![`--debug`, `--extraPlugins`].includes(arg),
  )

  await loadPlugins([pockethost, ...uniq(PH_PLUGINS()), ...extraPlugins])

  await doAfterPluginsLoadedAction()

  program
    .name('pockethost')
    .description('Multitenant PocketBase hosting')
    .version(version)
    .option(`-e, --extra-plugins <plugins...>`, `Extra plugins to load`, [])

  const commands = await doCliCommandsFilter([
    await ServeCommand(),
    ConfigCommand(),
    PluginCommand(),
  ])

  for (const command of commands) {
    program.addCommand(command)
  }

  await program.parseAsync(filteredArgv)
}

main()
