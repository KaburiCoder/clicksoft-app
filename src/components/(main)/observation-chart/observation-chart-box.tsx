import React from "react";
import { SearchDataBox } from "../search-data-box";
import VsBox from "./boxes/vs-box";
import BstBox from "./boxes/bst-box";
import InsulinBox from "./boxes/insulin-box";
import IntakeBox from "./boxes/intake-box";
import OutputBox from "./boxes/output-box";
import TextListBox from "./boxes/text-list-box";
import FoodBox from "./boxes/food-box";
import RespirationBox from "./boxes/respiration-box";
import EkgBox from "./boxes/ekg-box";
import ObjListBox from "./boxes/obj-list-box";
import { ObservationChart } from "@/sockets/models/observation-chart";

interface Props {
  data: ObservationChart
}

export default function ObservationChartBox({ data }: Props) {
  return (
    <div className="min-h-80 overflow-auto">
      <SearchDataBox
        contents={[
          { title: "일자", text: data.shortDateText },
          { title: "입원일수", text: data.ibTerm },
        ]}
        className="h-full"
        childrenClassName="flex flex-col gap-4"
      >
        <div className="flex h-full flex-col gap-4 overflow-auto">
          <VsBox vsList={data.vsList} />
          <BstBox bstList={data.bstList} />
          <InsulinBox insulinList={data.insulinList} />
          <IntakeBox intake={data.intake} />
          <OutputBox output={data.output} />
          <TextListBox title="Fluid" textList={data.fluidList} />
          <TextListBox title="(Side, Mixed)" textList={data.sideMixedList} />
          <FoodBox food={data.food} />
          <RespirationBox respiration={data.respiration} />
          <EkgBox ekg={data.ekg} />
          <ObjListBox title="Intubation" obj={data.intubation} />
          <TextListBox
            title="Foley"
            textList={data.foleyList}
          />
          <TextListBox
            title="Emergency Order"
            textList={data.emergencyOrderList}
          />
        </div>
      </SearchDataBox>
    </div>
  );
}
