"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostAction = exports.ChatIDLJson = void 0;
exports.ChatIDLJson = {
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
            "name": "initializeDelegateWalletV0",
            "accounts": [
                {
                    "name": "payer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "delegateWallet",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "owner",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "delegate",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
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
                        "name": "defaultReadPermissionAmount",
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
                        "name": "bump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "DelegateWalletV0",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "ownerWallet",
                        "type": "publicKey"
                    },
                    {
                        "name": "delegateWallet",
                        "type": "publicKey"
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
                        "name": "defaultReadPermissionAmount",
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
                        "name": "readPermissionAmount",
                        "type": "u64"
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
        },
        {
            "code": 6003,
            "name": "IncorrectSender",
            "msg": "The sender must either be a delegate or owner wallet"
        }
    ]
};
exports.PostAction = {
    Hold: { hold: {} },
    Burn: { burn: {} },
    Pay: { pay: {} }
};
//# sourceMappingURL=chat.js.map