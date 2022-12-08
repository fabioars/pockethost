import { createEvent, EventHandler, EventSubscriber } from '@pockethost/tools'
import { createServer, IncomingMessage, ServerResponse } from 'http'
import httpProxy from 'http-proxy'
import { AsyncReturnType } from 'type-fest'
import { DaemonService, ServicesConfig } from '..'
import { dbg, error, info } from '../../util/logger'

export type MiddlewareProvider<TEvent> = { use: EventSubscriber<TEvent> }

export type ProxyEventHandler = EventHandler<ProxyRequestEvent>
export type ProxyMiddleware = {
  handle: ProxyEventHandler
}

export type ProxyServiceApi = AsyncReturnType<typeof createProxyService>

export type ProxyRequestEvent = {
  host: string
  subdomain: string
  req: IncomingMessage
  res: ServerResponse<IncomingMessage>
  proxy: httpProxy
}

export type ProxyServiceConfig = {}
export const createProxyService = async (
  config: ProxyServiceConfig
): Promise<DaemonService & MiddlewareProvider<ProxyRequestEvent>> => {
  const {} = config

  const proxy = httpProxy.createProxyServer({})

  const [onRequest, fireRequest] = createEvent<ProxyRequestEvent>((payload) => {
    const { req, res } = payload
    res.writeHead(404, {
      'Content-Type': `text/plain`,
    })
    res.end(`No handler found for ${req.url}`)
    return true
  })

  const server = createServer(async (req, res) => {
    dbg(`Incoming request ${req.headers.host}${req.url}`)
    // dbg(req.headers)
    res.setHeader(`Access-Control-Allow-Origin`, `*`)

    try {
      const host = req.headers.host
      if (!host) {
        throw new Error(`Host not found`)
      }

      const [subdomain, ...junk] = host.split('.')
      if (!subdomain) {
        throw new Error(`${host} has no subdomain.`)
      }
      const handled = await fireRequest(
        { host, subdomain, req, res, proxy },
        true
      )
      if (!handled) throw new Error(`No handler for ${req.url}`)
    } catch (e) {
      const msg = `${e}`
      error(msg)
      res.writeHead(403, {
        'Content-Type': `text/plain`,
      })
      res.end(msg)
    }
  })

  info('daemon on port 3000')
  server.listen(3000)

  const shutdown = async () => {
    info(`Shutting down proxy server`)
    server.close()
  }

  return { shutdown, use: onRequest }
}

let _service: ProxyServiceApi | undefined
export const getProxyService = async (config?: ServicesConfig) => {
  if (config) {
    _service?.shutdown()
    _service = await createProxyService(config)
    dbg(`Proxy service initialized`)
  }
  if (!_service) {
    throw new Error(`Attempt to use proxy service before initialization`)
  }
  return _service
}
