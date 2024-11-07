const { expect } = require("chai");
const { parseEther } = require("ethers/lib/utils");
const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.BLAST_SEPOLIA_RPC_URL);
    const admin = new ethers.Wallet(process.env.BLAST_SEPOLIA_INIT_ADMIN, provider);

    const adminAddress = "";
    const pauserAddress = "";

    const contract_deploy = true;
    const contract_upgrade = false;
    const contract_verify = false;

    const existing_test_contract = "";

    let contract_instance;

    if (contract_deploy) {
        const ContractInstance = await ethers.getContractFactory("TestContract");
        contract_instance = await upgrades.deployProxy(ContractInstance.connect(admin), [adminAddress, pauserAddress], { initializer: 'initialize' });
        await contract_instance.deployed();
        console.log(`TestContract Proxy deployed to ${contract_instance.address}`);
    }
    if (contract_upgrade) {
        const ContractInstance = await ethers.getContractFactory('TestContract');
        contract_instance = await upgrades.upgradeProxy(existing_test_contract, ContractInstance);
        console.log(`TestContract Proxy upgraded to ${contract_instance.address}`);
    }
    if (contract_verify) {
        const testContractImple = await upgrades.erc1967.getImplementationAddress(contract_instance.address);
        await hre.run("verify:verify", { address: testContractImple, constructorArguments: [], });
        console.log("TestContract Imple address: ", testContractImple);
    }
    
    {
        let balance = await ethers.provider.getBalance(admin.address);
        balance = ethers.utils.formatEther(balance);
        console.log("Account address: ", admin.address, " Balance: ", balance, "ETH");
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
