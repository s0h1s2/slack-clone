import { GetWorkspaceResponse } from "@/api";
import { apiClient } from "@/api/client";
import {useQuery} from "@tanstack/react-query"
export const useGetWorkspace=(id:number)=>{
    const {data:workspace,isLoading:isWorkspaceLoading,error:workspaceError}=useQuery({
        queryKey:["workspace",id],
        queryFn:async ()=>{
            try{
                return apiClient.workspaceApi.apiWorkspacesIdGet({id:id});
            }catch(e){
                throw e
            }
        }
        
    })
    return {
        workspace, 
        isWorkspaceLoading,
        workspaceError
    };
};