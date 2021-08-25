# idbable

[![npm](https://img.shields.io/npm/v/idbable?color=green)]((https://www.npmjs.com/package/idbable))
[![npm](https://img.shields.io/npm/dm/idbable.svg)](https://www.npmjs.com/package/idbable)

The promisify indexDB wrapper for browser which supports IE

## Installation

```
npm i idable

import idable from 'idable'

// or
import { idable } from 'idable'

const dao = new idable('dbName', 'tableName')

```

## Usage

- `setItem`:

```js
await dao.setItem('key', 'value')
```

- `getItem`:

```js
await dao.getItem('key')
```

- `delItem`:

```js
await dao.delItem('key')
```

- `keys`:

```js
await dao.keys()
```

- `values`:

```js
await dao.values()
```

- `clear`:
```js
await dao.clear()
```

- `dropDb`:
```js
await dao.dropDb()
```
