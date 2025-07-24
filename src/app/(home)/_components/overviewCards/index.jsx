import { compactFormat } from "@/lib/formatNumber";
import { OverviewCard } from "./card";
import { getOverviewData } from "../../fetch";
import { ProductIcon, ProfitIcon, UsersIcon, ViewsIcon } from "@/assets/icons";

export async function OverviewCardsGroup() {
  const { views, profit, products, users } = await getOverviewData();

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="Total Views"
        data={{
          ...views,
          value: compactFormat(views.value),
        }}
        Icon={ViewsIcon}
      />

      <OverviewCard
        label="Total Profit"
        data={{
          ...profit,
          value: "$" + compactFormat(profit.value),
        }}
        Icon={ProfitIcon}
      />

      <OverviewCard
        label="Total Products"
        data={{
          ...products,
          value: compactFormat(products.value),
        }}
        Icon={ProductIcon}
      />

      <OverviewCard
        label="Total Users"
        data={{
          ...users,
          value: compactFormat(users.value),
        }}
        Icon={UsersIcon}
      />
    </div>
  );
}
