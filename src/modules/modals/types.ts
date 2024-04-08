import { Fee, Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";

export enum ModalType {
  Wallet = "wallet",
  Transaction = "transaction",
  CrowdfundGroupBuy = "crowdfundgroupbuy",
}

export interface WalletModalProps {
  modalType: ModalType.Wallet;
}

export interface CrowdfundGroupBuyModalProps {
  crowdfundAddress: string;
  modalType: ModalType.CrowdfundGroupBuy;
}

export interface TransactionModalProps {
  contractAddress: string;
  funds: Coin[];
  simulate: boolean;
  msg: Msg;
  modalType: ModalType.Transaction;
  fee?: Fee;
  memo?: string;
}

export type ModalProps =
  | WalletModalProps
  | TransactionModalProps
  | CrowdfundGroupBuyModalProps;
