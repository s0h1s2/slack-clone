using System.Reflection;
using server.Services;

namespace server.Extensions;

public static class ChatHandler
{
    public static IServiceCollection AddChatHandlers(this IServiceCollection services, Assembly assembly)
    {
        var chatHandlerImplementations = assembly.GetTypes()
            .Where(t => t.IsClass && !t.IsAbstract && typeof(IChatHandler).IsAssignableFrom(t));

        foreach (var implementation in chatHandlerImplementations)
        {
            services.AddScoped(typeof(IChatHandler), implementation);
        }
        return services;
    }

    public static IServiceCollection AddChatHandlerStrategy(this IServiceCollection services)
    {
        services.AddScoped<ChatHandlerStrategy>();
        return services;
    }
}