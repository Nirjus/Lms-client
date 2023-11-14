import React,{FC, useState} from 'react'
import DashbordHeader from "./DashbordHeader"
import DashboardWidgets from "../../components/Admin/Widgets/DashboardWidgets"
type Props = {
  isDashboard?: boolean;
}

const DashboardHero:FC<Props> = ({isDashboard}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
        <DashbordHeader open={open} setOpen={setOpen}/>
         {
          isDashboard && (
            <DashboardWidgets open={open}/>
          )
         }
    </div>
  )
}

export default DashboardHero