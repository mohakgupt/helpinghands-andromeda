import { ICollectionType, IConfig } from "./lib/app/types";

const CONFIG: IConfig = {
  coinDenom: "uandr",
  name: "Helping Hands",
  chainId: "elgafar-1",
  createdDate: "2024-04-08T11:24:48.162Z",
  modifiedDate: "2024-04-08T11:24:48.162Z",
  id: "andromeda",
  collections: [
    {
      crowdfund:
        "andr1hm6nj95fest0phk6xh735phx2jtmh9j7wlcysptwnqf5673d0qas5jl5jq",
      cw721: "andr1ju5p6ljz479wr56r2x8puwy000pwzgpz7eug93dqajkygv0a4jfs7v8eup",
      name: "Open for Funds",
      type: ICollectionType.CROWDFUND,
      id: "crowdfund",
    },
  ],
};

export default CONFIG;
