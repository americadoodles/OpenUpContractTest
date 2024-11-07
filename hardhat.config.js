/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
require("hardhat-contract-sizer");
require('hardhat-deploy');
require("solidity-coverage");
require("dotenv").config();
const { utils } = require("ethers");

module.exports = {
    etherscan: {
        apiKey: {
            blast_sepolia: process.env.BLAST_SEPOLIA_API_KEY,
            ethereum_sepolia: process.env.ETHEREUM_SEPOLIA_API_KEY,
            blast_mainnet: process.env.BLAST_MAINNET_API_KEY,
        },
        customChains: [
            {
                network: "blast_sepolia",
                chainId: 168587773,
                urls: {
                    apiURL: process.env.BLAST_SEPOLIA_API_URL,
                    browserURL: "https://testnet.blastscan.io"
                }
            },
            {
                network: "ethereum_sepolia",
                chainId: 11155111,
                urls: {
                    apiURL: process.env.ETHEREUM_SEPOLIA_API_URL,
                    browserURL: "https://sepolia.etherscan.io/"
                }
            },
            {
                network: "blast_mainnet",
                chainId: 81457,
                urls: {
                    apiURL: process.env.BLAST_MAINNET_API_URL,
                    browserURL: "https://blastexplorer.io"
                }
            }
        ]
    },
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545"
        },
        hardhat: {

        },
        blast_sepolia: {
            url: process.env.BLAST_SEPOLIA_RPC_URL,
            chainId: 168587773,
            accounts: [process.env.BLAST_SEPOLIA_INIT_ADMIN],
        },
        ethereum_sepolia: {
            url: process.env.ETHEREUM_SEPOLIA_RPC_URL,
            chainId: 11155111,
            accounts: [process.env.ETHEREUM_SEPOLIA_INIT_ADMIN],
        },
        blast_mainnet: {
            url: process.env.BLAST_MAINNET_RPC_URL,
            chainId: 81457,
            accounts: [process.env.BLAST_MAINNET_INIT_ADMIN],
        },
    },
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            },
            viaIR: true
        }
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    mocha: {
        timeout: 4000000
    }
};
