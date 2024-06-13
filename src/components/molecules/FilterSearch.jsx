import { Icon } from "@iconify/react/dist/iconify.js";
import Divider from "../atoms/Divider";

export default function FilterSearch() {
  return (
    <div className="border border-gray-300 rounded-[10px] p-4">
      <p className="font-medium text-lg mb-5">Filter</p>
      <div className="flex gap-2 flex-col">
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2 cursor-pointer py-3">
            <Icon icon="mynaui:box" width={25} />
            <span>Transit</span>
          </div>
          <Icon icon="octicon:chevron-right-24" width={25} />
        </div>
        <Divider />
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2 cursor-pointer py-3">
            <Icon icon="tabler:heart" width={25} />
            <span>Fasilitas</span>
          </div>
          <Icon icon="octicon:chevron-right-24" width={25} />
        </div>
        <Divider />
        <div className="flex items-center justify-between cursor-pointer ">
          <div className="flex items-center gap-2 cursor-pointer py-3">
            <Icon icon="mynaui:dollar" width={25} />
            <span>Harga</span>
          </div>
          <Icon icon="octicon:chevron-right-24" width={25} />
        </div>
      </div>
    </div>
  );
}
