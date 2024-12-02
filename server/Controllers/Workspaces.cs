using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

public class Workspaces : Controller
{
    public string Index()
    {
        return "Workspaces";
    }
}