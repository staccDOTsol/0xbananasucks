import { IdlAccounts, Idl } from '@project-serum/anchor';
export const ChatIDLJson: Idl & { metadata?: { address: string } } = {
  "version": "3.2.5",
  "name": "chat",
  "instructions": [
    {
      "name": "initializeChatV0",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "chat",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "InitializeChatArgsV0"
          }
        }
      ]
    },
    {
      "name": "initializeProfileV0",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "usernameProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "walletProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerWallet",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "delegateWallet",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "InitializeProfileArgsV0"
          }
        }
      ]
    },
    {
      "name": "sendMessageV0",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "chat",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sender",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "profile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "postPermissionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "postPermissionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "MessageV0"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "ChatV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "postPermissionMint",
            "type": "publicKey"
          },
          {
            "name": "readPermissionMint",
            "type": "publicKey"
          },
          {
            "name": "postPermissionAmount",
            "type": "u64"
          },
          {
            "name": "postPermissionAction",
            "type": {
              "defined": "PostAction"
            }
          },
          {
            "name": "identifier",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "metadataUrl",
            "type": "string"
          },
          {
            "name": "postPayDestination",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "defaultAccessControlConditions",
            "type": "bytes"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "ProfileV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ownerWallet",
            "type": "publicKey"
          },
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "metadataUrl",
            "type": "string"
          },
          {
            "name": "delegateWallet",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitializeChatArgsV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "postPermissionMint",
            "type": "publicKey"
          },
          {
            "name": "readPermissionMint",
            "type": "publicKey"
          },
          {
            "name": "postPermissionAmount",
            "type": "u64"
          },
          {
            "name": "postPermissionAction",
            "type": {
              "defined": "PostAction"
            }
          },
          {
            "name": "postPayDestination",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "identifier",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "metadataUrl",
            "type": "string"
          },
          {
            "name": "defaultAccessControlConditions",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "InitializeProfileArgsV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "metadataUrl",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "MessageV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "encryptedSymmetricKey",
            "type": "string"
          },
          {
            "name": "accessControlConditions",
            "type": "string"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "nextId",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "PostAction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Hold"
          },
          {
            "name": "Burn"
          },
          {
            "name": "Pay"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidStringLength",
      "msg": "Invalid string length, your string was likely too long"
    },
    {
      "code": 6001,
      "name": "PermissionDenied",
      "msg": "You do not have enough tokens to post here"
    },
    {
      "code": 6002,
      "name": "StringNotAlphanumeric",
      "msg": "The string was not alphanumeric"
    }
  ],
  "metadata": {
    "address": "2hC44EVzM4JoL5EWU4ezcZsY6ns2puwxpivQdeUMTzZM"
  }
};
export type ChatIDL = {"version":"3.2.5","name":"chat","instructions":[{"name":"initializeChatV0","accounts":[{"name":"payer","isMut":true,"isSigner":true},{"name":"chat","isMut":true,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"InitializeChatArgsV0"}}]},{"name":"initializeProfileV0","accounts":[{"name":"payer","isMut":true,"isSigner":true},{"name":"usernameProfile","isMut":true,"isSigner":false},{"name":"walletProfile","isMut":true,"isSigner":false},{"name":"ownerWallet","isMut":false,"isSigner":true},{"name":"delegateWallet","isMut":false,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"InitializeProfileArgsV0"}}]},{"name":"sendMessageV0","accounts":[{"name":"payer","isMut":true,"isSigner":true},{"name":"chat","isMut":false,"isSigner":false},{"name":"sender","isMut":false,"isSigner":true},{"name":"profile","isMut":false,"isSigner":false},{"name":"postPermissionAccount","isMut":true,"isSigner":false},{"name":"postPermissionMint","isMut":true,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"MessageV0"}}]}],"accounts":[{"name":"chatV0","type":{"kind":"struct","fields":[{"name":"admin","type":"publicKey"},{"name":"postPermissionMint","type":"publicKey"},{"name":"readPermissionMint","type":"publicKey"},{"name":"postPermissionAmount","type":"u64"},{"name":"postPermissionAction","type":{"defined":"PostAction"}},{"name":"identifier","type":"string"},{"name":"name","type":"string"},{"name":"imageUrl","type":"string"},{"name":"metadataUrl","type":"string"},{"name":"postPayDestination","type":{"option":"publicKey"}},{"name":"defaultAccessControlConditions","type":"bytes"},{"name":"bump","type":"u8"}]}},{"name":"profileV0","type":{"kind":"struct","fields":[{"name":"ownerWallet","type":"publicKey"},{"name":"username","type":"string"},{"name":"imageUrl","type":"string"},{"name":"metadataUrl","type":"string"},{"name":"delegateWallet","type":"publicKey"},{"name":"bump","type":"u8"}]}}],"types":[{"name":"InitializeChatArgsV0","type":{"kind":"struct","fields":[{"name":"admin","type":"publicKey"},{"name":"postPermissionMint","type":"publicKey"},{"name":"readPermissionMint","type":"publicKey"},{"name":"postPermissionAmount","type":"u64"},{"name":"postPermissionAction","type":{"defined":"PostAction"}},{"name":"postPayDestination","type":{"option":"publicKey"}},{"name":"identifier","type":"string"},{"name":"name","type":"string"},{"name":"imageUrl","type":"string"},{"name":"metadataUrl","type":"string"},{"name":"defaultAccessControlConditions","type":"bytes"}]}},{"name":"InitializeProfileArgsV0","type":{"kind":"struct","fields":[{"name":"username","type":"string"},{"name":"imageUrl","type":"string"},{"name":"metadataUrl","type":"string"}]}},{"name":"MessageV0","type":{"kind":"struct","fields":[{"name":"id","type":"string"},{"name":"encryptedSymmetricKey","type":"string"},{"name":"accessControlConditions","type":"string"},{"name":"content","type":"string"},{"name":"nextId","type":{"option":"string"}}]}},{"name":"PostAction","type":{"kind":"enum","variants":[{"name":"Hold"},{"name":"Burn"},{"name":"Pay"}]}}],"errors":[{"code":6000,"name":"InvalidStringLength","msg":"Invalid string length, your string was likely too long"},{"code":6001,"name":"PermissionDenied","msg":"You do not have enough tokens to post here"},{"code":6002,"name":"StringNotAlphanumeric","msg":"The string was not alphanumeric"}],"metadata":{"address":"2hC44EVzM4JoL5EWU4ezcZsY6ns2puwxpivQdeUMTzZM"}};

export type PostAction = Record<string, Record<string, any>>
export const PostAction = {
  Hold: { hold: {} },
  Burn: { burn: {} },
  Pay: { pay: {} }
}
    

  

export type ChatV0 = IdlAccounts<ChatIDL>["chatV0"]

export type ProfileV0 = IdlAccounts<ChatIDL>["profileV0"]
  
          