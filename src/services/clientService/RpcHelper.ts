import { RPC_COLLECTION, RpcFields, RpcStatus } from '$shared'
import { ClientResponseError } from 'pocketbase'
import { JsonObject } from 'type-fest'
import { MixinContext } from './PbClient'

export enum RecordSubscriptionActions {
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

export type RpcHelperConfig = MixinContext

export type RpcHelper = ReturnType<typeof createRpcHelper>

export const createRpcHelper = (config: RpcHelperConfig) => {
  const { client, rawDb, logger } = config
  const onNewRpc = async (cb: (e: RpcFields<any, any>) => void) => {
    const unsub = await client
      .collection(RPC_COLLECTION)
      .subscribe<RpcFields<any, any>>('*', (e) => {
        if (e.action !== RecordSubscriptionActions.Create) return
        cb(e.record)
      })
    return unsub
  }

  const resetRpcs = async () =>
    rawDb(RPC_COLLECTION)
      .whereNotIn('status', [
        RpcStatus.FinishedError,
        RpcStatus.FinishedSuccess,
      ])
      .update<RpcFields<any, any>>({
        status: RpcStatus.FinishedError,
        result: `Canceled by reset`,
      })

  const incompleteRpcs = async () => {
    return client
      .collection(RPC_COLLECTION)
      .getFullList<RpcFields<any, any>>(100, {
        filter: `status != '${RpcStatus.FinishedError}' && status != '${RpcStatus.FinishedSuccess}'`,
      })
  }

  const rejectRpc = async (
    rpc: RpcFields<any, any>,
    err: ClientResponseError,
  ) => {
    const fields: Partial<RpcFields<any, any>> = {
      status: RpcStatus.FinishedError,
      result: err,
    }
    return client
      .collection(RPC_COLLECTION)
      .update<RpcFields<any, any>>(rpc.id, fields)
  }

  const setRpcStatus = async (
    rpc: RpcFields<any, any>,
    status: RpcStatus,
    result: JsonObject = {},
  ) => {
    return client.collection(RPC_COLLECTION).update(rpc.id, { status, result })
  }

  return {
    incompleteRpcs,
    resetRpcs,
    onNewRpc,
    rejectRpc,
    setRpcStatus,
  }
}