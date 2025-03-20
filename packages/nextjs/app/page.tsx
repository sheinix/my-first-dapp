"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: beneficiary } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getBeneficiary",
  });

  const { data: contractAddress } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getContractAddress",
  });

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract({ contractName: "YourContract" });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">My First Dapp</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            Beneficiary: <Address address={beneficiary} />
            Total: <Balance address="0x34aA3F359A9D614239015126635CE7732c18fDF3" />
            Withdraw:{" "}
            <button
              className="btn btn-primary"
              onClick={async () => {
                try {
                  await writeYourContractAsync({
                    functionName: "withdraw",
                  });
                } catch (e) {
                  console.error("Error withdrawing:", e);
                }
              }}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
