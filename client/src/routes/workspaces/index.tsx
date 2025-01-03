import { createFileRoute, redirect } from '@tanstack/react-router'
import WorkspaceDashboard from "@/features/workspace";

export const Route = createFileRoute('/workspaces/')({
  beforeLoad:({context})=>{
    if(!context.auth.isAuthenticated){
      throw redirect({to:'/login'})
    }
  },
  component: Workspace,
})

function Workspace() {
  return <WorkspaceDashboard/>
}
