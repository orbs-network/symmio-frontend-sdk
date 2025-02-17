import { useMemo } from "react";

import useActiveWagmi from "../lib/hooks/useActiveWagmi";
import { useActiveAccountAddress } from "../state/user/hooks";
import { useSingleContractMultipleMethods } from "../lib/hooks/multicall";
import { useMultiAccountAddress, useTpSlWalletAddress } from "../state/chains";
import {
  CANCEL_CLOSE_QUOTE_HASH_CONTRACT,
  CLOSE_QUOTE_HASH_CONTRACT,
  MULTI_ACCOUNT_ABI,
} from "../constants";

export function useContractDelegateTpSl(): [boolean, boolean] {
  const activeAccountAddress = useActiveAccountAddress();
  const { chainId } = useActiveWagmi();
  const MULTI_ACCOUNT_ADDRESS_CHAIN = useMultiAccountAddress();
  const MULTI_ACCOUNT_ADDRESS = useMemo(
    () => (chainId ? MULTI_ACCOUNT_ADDRESS_CHAIN[chainId] : ""),
    [MULTI_ACCOUNT_ADDRESS_CHAIN, chainId]
  );
  const TPSL_WALLET_ADDRESS_CHAIN = useTpSlWalletAddress();
  const TPSL_WALLET_ADDRESS = useMemo(
    () => (chainId ? TPSL_WALLET_ADDRESS_CHAIN[chainId] : ""),
    [TPSL_WALLET_ADDRESS_CHAIN, chainId]
  );

  const calls =
    activeAccountAddress && chainId
      ? [
          {
            functionName: "delegatedAccesses",
            callInputs: [
              activeAccountAddress,
              TPSL_WALLET_ADDRESS,
              CLOSE_QUOTE_HASH_CONTRACT,
            ],
          },
          {
            functionName: "delegatedAccesses",
            callInputs: [
              activeAccountAddress,
              TPSL_WALLET_ADDRESS,
              CANCEL_CLOSE_QUOTE_HASH_CONTRACT,
            ],
          },
        ]
      : [];
  const { data: delegateResult, isSuccess: isDelegateSuccess } =
    useSingleContractMultipleMethods(
      MULTI_ACCOUNT_ADDRESS,
      MULTI_ACCOUNT_ABI,
      calls
    );

  return [
    isDelegateSuccess && delegateResult?.[0]?.result ? true : false,
    isDelegateSuccess && delegateResult?.[1]?.result ? true : false,
  ];
}
