import { Collection, SchemaField } from 'pocketbase'

export type Collection_Serialized = Omit<Partial<Collection>, 'schema'> & {
  schema: Array<Partial<SchemaField>>
}

export const schema: Collection_Serialized[] = [
  {
    id: 'etae8tuiaxl6xfv',
    name: 'instances',
    type: 'base',
    system: false,
    schema: [
      {
        id: 'qdtuuld1',
        name: 'subdomain',
        type: 'text',
        system: false,
        required: true,
        unique: true,
        options: {
          min: null,
          max: 50,
          pattern: '^[a-z][\\-a-z]+$',
        },
      },
      {
        id: 'rbj14krn',
        name: 'uid',
        type: 'relation',
        system: false,
        required: true,
        unique: false,
        options: {
          maxSelect: 1,
          collectionId: 'systemprofiles0',
          cascadeDelete: false,
        },
      },
      {
        id: 'c2y74d7h',
        name: 'status',
        type: 'text',
        system: false,
        required: true,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: '',
        },
      },
      {
        id: 'yxby5r6b',
        name: 'platform',
        type: 'text',
        system: false,
        required: true,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: '',
        },
      },
      {
        id: '4ydffkv3',
        name: 'version',
        type: 'text',
        system: false,
        required: true,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: '',
        },
      },
      {
        id: '1arlklqq',
        name: 'secondsThisMonth',
        type: 'number',
        system: false,
        required: false,
        unique: false,
        options: {
          min: null,
          max: null,
        },
      },
      {
        id: '66vjgzcg',
        name: 'isBackupAllowed',
        type: 'bool',
        system: false,
        required: false,
        unique: false,
        options: {},
      },
      {
        id: 'qew2o2d6',
        name: 'currentWorkerBundleId',
        type: 'text',
        system: false,
        required: false,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: '',
        },
      },
      {
        id: '3yu1db4p',
        name: 'secrets',
        type: 'json',
        system: false,
        required: false,
        unique: false,
        options: {},
      },
    ],
    listRule: 'uid=@request.auth.id',
    viewRule: 'uid = @request.auth.id',
    createRule: null,
    updateRule: null,
    deleteRule: null,
    options: {},
  },
  {
    id: 'systemprofiles0',
    name: 'users',
    type: 'auth',
    system: false,
    schema: [
      {
        id: 'pbfieldname',
        name: 'name',
        type: 'text',
        system: false,
        required: false,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: '',
        },
      },
      {
        id: 'pbfieldavatar',
        name: 'avatar',
        type: 'file',
        system: false,
        required: false,
        unique: false,
        options: {
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/svg+xml',
            'image/gif',
          ],
          thumbs: null,
        },
      },
    ],
    listRule: 'id = @request.auth.id',
    viewRule: 'id = @request.auth.id',
    createRule: '',
    updateRule: 'id = @request.auth.id',
    deleteRule: null,
    options: {
      allowEmailAuth: true,
      allowOAuth2Auth: true,
      allowUsernameAuth: false,
      exceptEmailDomains: null,
      manageRule: null,
      minPasswordLength: 8,
      onlyEmailDomains: null,
      requireEmail: true,
    },
  },
  {
    id: 'aiw8te7y7atklwn',
    name: 'invocations',
    type: 'base',
    system: false,
    schema: [
      {
        id: 'st9ydrbo',
        name: 'instanceId',
        type: 'relation',
        system: false,
        required: true,
        unique: false,
        options: {
          maxSelect: 1,
          collectionId: 'etae8tuiaxl6xfv',
          cascadeDelete: false,
        },
      },
      {
        id: 'av4mpuyh',
        name: 'startedAt',
        type: 'date',
        system: false,
        required: true,
        unique: false,
        options: {
          min: '',
          max: '',
        },
      },
      {
        id: 'fnwatixg',
        name: 'endedAt',
        type: 'date',
        system: false,
        required: false,
        unique: false,
        options: {
          min: '',
          max: '',
        },
      },
      {
        id: 'awjozhbn',
        name: 'pid',
        type: 'number',
        system: false,
        required: false,
        unique: false,
        options: {
          min: null,
          max: null,
        },
      },
      {
        id: 'vdkfqege',
        name: 'totalSeconds',
        type: 'number',
        system: false,
        required: false,
        unique: false,
        options: {
          min: null,
          max: null,
        },
      },
    ],
    listRule: null,
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null,
    options: {},
  },
  {
    id: 'v7s41iokt1vizxd',
    name: 'rpc',
    type: 'base',
    system: false,
    schema: [
      {
        id: 'yv38czcf',
        name: 'userId',
        type: 'relation',
        system: false,
        required: true,
        unique: false,
        options: {
          maxSelect: 1,
          collectionId: 'systemprofiles0',
          cascadeDelete: false,
        },
      },
      {
        id: 'tgvaxwfv',
        name: 'payload',
        type: 'json',
        system: false,
        required: true,
        unique: false,
        options: {},
      },
      {
        id: 'zede8pci',
        name: 'status',
        type: 'text',
        system: false,
        required: false,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: '',
        },
      },
      {
        id: 'nd7cwqmn',
        name: 'result',
        type: 'json',
        system: false,
        required: false,
        unique: false,
        options: {},
      },
      {
        id: '2hlrcx5j',
        name: 'cmd',
        type: 'text',
        system: false,
        required: true,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: '',
        },
      },
    ],
    listRule: 'userId = @request.auth.id',
    viewRule: 'userId = @request.auth.id',
    createRule:
      "userId = @request.auth.id && status='' && (cmd='backup-instance' || cmd='restore-instance' || cmd='create-instance' || cmd='publish-bundle' || cmd='save-secrets' ) && payload!='' && result=''",
    updateRule: null,
    deleteRule: null,
    options: {},
  },
  {
    id: '72clb6v41bzsay9',
    name: 'backups',
    type: 'base',
    system: false,
    schema: [
      {
        id: 'someqtjw',
        name: 'message',
        type: 'text',
        system: false,
        required: false,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: '',
        },
      },
      {
        id: 'jk4zwiaj',
        name: 'instanceId',
        type: 'relation',
        system: false,
        required: true,
        unique: false,
        options: {
          maxSelect: 1,
          collectionId: 'etae8tuiaxl6xfv',
          cascadeDelete: false,
        },
      },
      {
        id: 'wsy3l5gm',
        name: 'status',
        type: 'text',
        system: false,
        required: true,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: '',
        },
      },
      {
        id: 'gmkrc5d9',
        name: 'bytes',
        type: 'number',
        system: false,
        required: false,
        unique: false,
        options: {
          min: null,
          max: null,
        },
      },
      {
        id: '4lmammjz',
        name: 'platform',
        type: 'text',
        system: false,
        required: true,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: '',
        },
      },
      {
        id: 'fheqxmbj',
        name: 'version',
        type: 'text',
        system: false,
        required: true,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: '',
        },
      },
      {
        id: 'cinbmdwe',
        name: 'progress',
        type: 'json',
        system: false,
        required: false,
        unique: false,
        options: {},
      },
    ],
    listRule: '@request.auth.id = instanceId.uid',
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null,
    options: {},
  },
  {
    id: 'f7d215ezw8ka531',
    name: 'workers',
    type: 'base',
    system: false,
    schema: [
      {
        id: '8ydyahbe',
        name: 'instanceId',
        type: 'relation',
        system: false,
        required: true,
        unique: false,
        options: {
          maxSelect: 1,
          collectionId: 'etae8tuiaxl6xfv',
          cascadeDelete: false,
        },
      },
      {
        id: 'fium401j',
        name: 'bundle',
        type: 'text',
        system: false,
        required: true,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: '',
        },
      },
      {
        id: 'aqgswjsy',
        name: 'isActive',
        type: 'bool',
        system: false,
        required: false,
        unique: false,
        options: {},
      },
    ],
    listRule: '@request.auth.id = instanceId.uid',
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null,
    options: {},
  },
  {
    id: 'voda4z0jkvpyyqt',
    name: 'worker_logs',
    type: 'base',
    system: false,
    schema: [
      {
        id: 'qvdtcmd8',
        name: 'workerId',
        type: 'relation',
        system: false,
        required: true,
        unique: false,
        options: {
          maxSelect: 1,
          collectionId: 'f7d215ezw8ka531',
          cascadeDelete: false,
        },
      },
      {
        id: 'senra1ih',
        name: 'instanceId',
        type: 'relation',
        system: false,
        required: true,
        unique: false,
        options: {
          maxSelect: 1,
          collectionId: 'etae8tuiaxl6xfv',
          cascadeDelete: false,
        },
      },
      {
        id: 'nzapaza1',
        name: 'body',
        type: 'text',
        system: false,
        required: true,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: '',
        },
      },
      {
        id: '3ydvokm9',
        name: 'stream',
        type: 'text',
        system: false,
        required: true,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: '/stdout|stderr/',
        },
      },
    ],
    listRule: '@request.auth.id = instanceId.uid',
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null,
    options: {},
  },
]
