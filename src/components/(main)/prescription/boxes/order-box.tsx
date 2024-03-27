import React, { Fragment } from "react";
import { TitleGroup } from "../../../custom/title-group";
import ObGrid from "../../../custom/grids/ob-grid";
import { ObGridHead } from "../../../custom/grids/ob-grid-head";
import { OrderType, RxOrder } from "@/sockets/entities/prescription";
import { ObGridBody } from "../../../custom/grids/ob-grid-body";
import { cn } from "@/lib/utils";

interface Props {
  orders: RxOrder[] | undefined;
}
export default function OrderBox({ orders }: Props) {
  if (!orders || orders.length === 0) return <></>;

  return (
    <TitleGroup title="처방내역">
      <ObGrid gridType="rx-order">
        <ObGridHead>코드</ObGridHead>
        <ObGridHead>명칭</ObGridHead>
        <ObGridHead>일투</ObGridHead>
        <ObGridHead>횟수</ObGridHead>
        <ObGridHead>총투</ObGridHead>
        <ObGridHead>용법</ObGridHead>
        {orders?.map((order, i) => {
          const isInstructions = order.orderType === OrderType.INSTRUCTIONS;
          const bgStyleObj: { [key: string]: string } = {
            [OrderType.GROUP]: "bg-orange-200",
            [OrderType.SUB_ITEM]: "bg-orange-50",
          };
          const textStyles = isInstructions ? "text-green-700 font-bold" : ""
          const bgStyles = bgStyleObj[order.orderType?.toString() ?? ""];
          return (
            <Fragment key={i}>
              <ObGridBody className={cn(bgStyles, "flex items-center")}>
                {isInstructions ? "" : order.code}
              </ObGridBody>
              <ObGridBody className={cn(bgStyles, textStyles, "text-left")}>
                {order.name}
              </ObGridBody>
              <ObGridBody className={cn(bgStyles, "text-right")}>
                {isInstructions ? "" : order.dailyDose}
              </ObGridBody>
              <ObGridBody className={cn(bgStyles, "text-right")}>
                {isInstructions ? "" : order.frequency}
              </ObGridBody>
              <ObGridBody className={cn(bgStyles, "text-right")}>
                {isInstructions ? "" : order.day}
              </ObGridBody>
              <ObGridBody className={cn(bgStyles, "text-left")}>
                {isInstructions ? "" : order.yongbup}
              </ObGridBody>
            </Fragment>
          );
        })}
      </ObGrid>
    </TitleGroup>
  );
}
