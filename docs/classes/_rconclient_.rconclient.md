[rcon.js](../README.md) › [Globals](../globals.md) › ["RCONClient"](../modules/_rconclient_.md) › [RCONClient](_rconclient_.rconclient.md)

# Class: RCONClient

## Hierarchy

* **RCONClient**

## Index

### Constructors

* [constructor](_rconclient_.rconclient.md#constructor)

### Properties

* [client](_rconclient_.rconclient.md#private-client)

### Methods

* [command](_rconclient_.rconclient.md#command)
* [destroy](_rconclient_.rconclient.md#destroy)
* [login](_rconclient_.rconclient.md#login)

## Constructors

###  constructor

\+ **new RCONClient**(`details`: [Details](../modules/_rconclient_.md#details)): *[RCONClient](_rconclient_.rconclient.md)*

*Defined in [RCONClient.ts:10](https://github.com/dylhack/rcon.js/blob/bf1ab7f/src/RCONClient.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`details` | [Details](../modules/_rconclient_.md#details) |

**Returns:** *[RCONClient](_rconclient_.rconclient.md)*

## Properties

### `Private` client

• **client**: *Socket*

*Defined in [RCONClient.ts:10](https://github.com/dylhack/rcon.js/blob/bf1ab7f/src/RCONClient.ts#L10)*

## Methods

###  command

▸ **command**(`cmd`: string): *Promise‹[RCONPacket](../modules/_codec_.md#rconpacket)›*

*Defined in [RCONClient.ts:28](https://github.com/dylhack/rcon.js/blob/bf1ab7f/src/RCONClient.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`cmd` | string |

**Returns:** *Promise‹[RCONPacket](../modules/_codec_.md#rconpacket)›*

___

###  destroy

▸ **destroy**(): *void*

*Defined in [RCONClient.ts:40](https://github.com/dylhack/rcon.js/blob/bf1ab7f/src/RCONClient.ts#L40)*

**Returns:** *void*

___

###  login

▸ **login**(`password`: string): *Promise‹[RCONPacket](../modules/_codec_.md#rconpacket)›*

*Defined in [RCONClient.ts:16](https://github.com/dylhack/rcon.js/blob/bf1ab7f/src/RCONClient.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`password` | string |

**Returns:** *Promise‹[RCONPacket](../modules/_codec_.md#rconpacket)›*