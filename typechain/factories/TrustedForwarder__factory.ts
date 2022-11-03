/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  TrustedForwarder,
  TrustedForwarderInterface,
} from "../TrustedForwarder";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct MinimalForwarder.ForwardRequest",
        name: "req",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
    ],
    name: "getNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct MinimalForwarder.ForwardRequest",
        name: "req",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "verify",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x61014060405234801561001157600080fd5b50604080518082018252601081526f26b4b734b6b0b62337b93bb0b93232b960811b602080830191825283518085019094526005845264302e302e3160d81b908401528151902060e08190527fae209a0b48f21c054280f2455d32cf309387644879d9acbd8ffc1991638118856101008190524660a0529192917f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6100fb8184846040805160208101859052908101839052606081018290524660808201523060a082015260009060c0016040516020818303038152906040528051906020012090509392505050565b6080523060c052610120525061011092505050565b60805160a05160c05160e0516101005161012051610af161015f6000396000610512015260006105610152600061053c01526000610495015260006104bf015260006104e90152610af16000f3fe6080604052600436106100345760003560e01c80632d0335ab1461003957806347153f8214610082578063bf5d3bdb146100a3575b600080fd5b34801561004557600080fd5b5061006f61005436600461089a565b6001600160a01b031660009081526020819052604090205490565b6040519081526020015b60405180910390f35b6100956100903660046108ca565b6100d3565b60405161007992919061098d565b3480156100af57600080fd5b506100c36100be3660046108ca565b610277565b6040519015158152602001610079565b600060606100e2858585610277565b6101595760405162461bcd60e51b815260206004820152603260248201527f4d696e696d616c466f727761726465723a207369676e617475726520646f657360448201527f206e6f74206d617463682072657175657374000000000000000000000000000060648201526084015b60405180910390fd5b610168608086013560016109c9565b600080610178602089018961089a565b6001600160a01b03166001600160a01b03168152602001908152602001600020819055506000808660200160208101906101b2919061089a565b6001600160a01b0316606088013560408901356101d260a08b018b6109ea565b6101df60208d018d61089a565b6040516020016101f193929190610a31565b60408051601f198184030181529082905261020b91610a57565b600060405180830381858888f193505050503d8060008114610249576040519150601f19603f3d011682016040523d82523d6000602084013e61024e565b606091505b509092509050610263603f6060890135610a73565b5a1161026b57fe5b90969095509350505050565b60008061038a84848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061038492507fdd8f4b70b0f4393e889bd39128a30628a78b61816a9eb8199759e7a349657e4891506102e7905060208a018a61089a565b6102f760408b0160208c0161089a565b60408b013560608c013560808d013561031360a08f018f6109ea565b604051610321929190610a95565b6040805191829003822060208301989098526001600160a01b0396871690820152949093166060850152608084019190915260a083015260c082015260e081019190915261010001604051602081830303815290604052805190602001206103f5565b90610464565b905060808501356000806103a1602089018961089a565b6001600160a01b03166001600160a01b03168152602001908152602001600020541480156103ec57506103d7602086018661089a565b6001600160a01b0316816001600160a01b0316145b95945050505050565b600061045e610402610488565b836040517f19010000000000000000000000000000000000000000000000000000000000006020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b92915050565b600080600061047385856105af565b91509150610480816105f4565b509392505050565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161480156104e157507f000000000000000000000000000000000000000000000000000000000000000046145b1561050b57507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b60008082516041036105e55760208301516040840151606085015160001a6105d9878285856107ad565b945094505050506105ed565b506000905060025b9250929050565b600081600481111561060857610608610aa5565b036106105750565b600181600481111561062457610624610aa5565b036106715760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610150565b600281600481111561068557610685610aa5565b036106d25760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610150565b60038160048111156106e6576106e6610aa5565b0361073e5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610150565b600481600481111561075257610752610aa5565b036107aa5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610150565b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156107e45750600090506003610891565b8460ff16601b141580156107fc57508460ff16601c14155b1561080d5750600090506004610891565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015610861573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661088a57600060019250925050610891565b9150600090505b94509492505050565b6000602082840312156108ac57600080fd5b81356001600160a01b03811681146108c357600080fd5b9392505050565b6000806000604084860312156108df57600080fd5b833567ffffffffffffffff808211156108f757600080fd5b9085019060c0828803121561090b57600080fd5b9093506020850135908082111561092157600080fd5b818601915086601f83011261093557600080fd5b81358181111561094457600080fd5b87602082850101111561095657600080fd5b6020830194508093505050509250925092565b60005b8381101561098457818101518382015260200161096c565b50506000910152565b821515815260406020820152600082518060408401526109b4816060850160208701610969565b601f01601f1916919091016060019392505050565b8082018082111561045e57634e487b7160e01b600052601160045260246000fd5b6000808335601e19843603018112610a0157600080fd5b83018035915067ffffffffffffffff821115610a1c57600080fd5b6020019150368190038213156105ed57600080fd5b8284823760609190911b6bffffffffffffffffffffffff19169101908152601401919050565b60008251610a69818460208701610969565b9190910192915050565b600082610a9057634e487b7160e01b600052601260045260246000fd5b500490565b8183823760009101908152919050565b634e487b7160e01b600052602160045260246000fdfea26469706673582212209d50fc9b6e9d9695b979d4ca347467b338947ee7a9528a47e694c931f0f0c32c64736f6c63430008110033";

type TrustedForwarderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TrustedForwarderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TrustedForwarder__factory extends ContractFactory {
  constructor(...args: TrustedForwarderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TrustedForwarder> {
    return super.deploy(overrides || {}) as Promise<TrustedForwarder>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TrustedForwarder {
    return super.attach(address) as TrustedForwarder;
  }
  override connect(signer: Signer): TrustedForwarder__factory {
    return super.connect(signer) as TrustedForwarder__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TrustedForwarderInterface {
    return new utils.Interface(_abi) as TrustedForwarderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TrustedForwarder {
    return new Contract(address, _abi, signerOrProvider) as TrustedForwarder;
  }
}
