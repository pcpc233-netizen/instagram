"use client";

import { useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const ConnectButton = () => {
  const { address, status, isConnecting, isReconnecting } = useAccount();
  const { connect, connectors, status: connectStatus, error } = useConnect();
  const { disconnect } = useDisconnect();

  const primaryConnector = connectors[0];
  const isConnected = status === "connected";
  const isBusy = isConnecting || isReconnecting || connectStatus === "pending";

  const truncatedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}…${address.slice(-4)}`;
  }, [address]);

  const handleClick = () => {
    if (isBusy) return;
    if (isConnected) {
      disconnect();
    } else if (primaryConnector) {
      connect({ connector: primaryConnector });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={isBusy || (!primaryConnector && !isConnected)}
        className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isBusy && "Connecting..."}
        {!isBusy && isConnected && truncatedAddress}
        {!isBusy && !isConnected && "Connect Wallet"}
      </button>
      {error && (
        <p className="text-sm text-red-400" role="alert" aria-live="polite">
          {error.shortMessage ?? error.message}
        </p>
      )}
    </div>
  );
};

export default ConnectButton;

