import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { sepolia } from "wagmi/chains";

const defaultSepoliaRpc =
  process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL ?? "https://ethereum-sepolia.publicnode.com";

export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(defaultSepoliaRpc),
  },
  connectors: [
    injected({
      target: "metaMask",
      shimDisconnect: true,
    }),
  ],
  ssr: true,
});

