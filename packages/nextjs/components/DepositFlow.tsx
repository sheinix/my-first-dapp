import { useState, useEffect } from "react";
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { sepolia } from "viem/chains";

interface DepositProps {
  tokenAddress: `0x${string}`;
  depositContractAddress: `0x${string}`;
  depositAmount: string;
}

const DepositFlow: React.FC<DepositProps> = ({ tokenAddress, depositContractAddress, depositAmount }) => {
  const { address } = useAccount();
  const [step, setStep] = useState<"idle" | "approving" | "approved" | "depositing" | "done">("idle");
  const [approveTxHash, setApproveTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [depositTxHash, setDepositTxHash] = useState<`0x${string}` | undefined>(undefined);

  const amountInWei = parseEther(depositAmount);

  /** Step 1: Approve Token Transfer */
  const { writeContract: approveWrite } = useWriteContract();
  const handleApprove = async () => {
    try {
      setStep("approving");
  
      // ✅ Execute the transaction, but DO NOT expect a return value
      await approveWrite({
        address: tokenAddress,
        abi: [
          {
            inputs: [
              { name: "spender", type: "address" },
              { name: "amount", type: "uint256" },
            ],
            name: "approve",
            outputs: [{ type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        functionName: "approve",
        args: [depositContractAddress, amountInWei],
      });
  
      // ✅ `useWaitForTransactionReceipt` will handle status change
    } catch (error) {
      console.error("Approval failed:", error);
      setStep("idle");
    }
  };
  
  // ✅ Listen for the transaction receipt
  const { data: approveReceipt, status: approveStatus } = useWaitForTransactionReceipt({
    chainId: sepolia.id,
    hash: approveTxHash,
  });
  
  // ✅ Update state based on receipt
  useEffect(() => {
    if (approveReceipt?.transactionHash) {
      setApproveTxHash(approveReceipt.transactionHash);
    }
  
    if (approveStatus === "success") {
      setStep("approved");
    }
  
    if (approveStatus === "error") {
      setStep("idle");
    }
  }, [approveStatus, approveReceipt]);
  
  // ✅ React to transaction status
  useEffect(() => {
    if (approveStatus === "success") setStep("approved");
    if (approveStatus === "error") setStep("idle"); // Reset if it fails
  }, [approveStatus]);

  /** Step 2: Deposit Tokens */
  const { writeContract: depositWrite } = useWriteContract();
  const handleDeposit = async () => {
    try {
      setStep("depositing");
  
      // ✅ Execute transaction (DO NOT expect return value)
      await depositWrite({
        address: depositContractAddress,
        abi: [
          {
            inputs: [{ name: "amount", type: "uint256" }],
            name: "deposit",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        functionName: "deposit",
        args: [amountInWei],
      });
  
      // ✅ The transaction receipt listener will handle the next step
    } catch (error) {
      console.error("Deposit failed:", error);
      setStep("approved"); // Reset to previous state
    }
  };
  
  // ✅ Listen for the deposit transaction receipt
  const { data: depositReceipt, status: depositStatus } = useWaitForTransactionReceipt({
    chainId: sepolia.id,
    hash: depositTxHash,
  });
  
  // ✅ Update state when deposit transaction is confirmed
  useEffect(() => {
    if (depositReceipt?.transactionHash) {
      setDepositTxHash(depositReceipt.transactionHash);
    }
  
    if (depositStatus === "success") {
      setStep("done");
    }
  
    if (depositStatus === "error") {
      setStep("approved"); // Reset state to allow retry
    }
  }, [depositStatus, depositReceipt]);
  
 
  // ✅ React to transaction status
  useEffect(() => {
    if (depositStatus === "success") setStep("done");
    if (depositStatus === "error") setStep("approved"); // Reset to previous state
  }, [depositStatus]);

  return (
    <div>
      <button onClick={handleApprove} disabled={step !== "idle"} className="btn">
        {step === "approving" ? "Approving..." : "Approve"}
      </button>

      <button onClick={handleDeposit} disabled={step !== "approved"} className="btn">
        {step === "depositing" ? "Depositing..." : "Deposit"}
      </button>

      {step === "done" && <p>Deposit successful! 🎉</p>}
    </div>
  );
};

export default DepositFlow;
