using System.Reflection.Metadata;
using server.Database;
using server.Services;

namespace server.Dto.Response;

public record ChannelMessageResponse(
    int Id,
    string Message,
    string? Attachment,
    string Username,
    int SenderId,
    string? Avatar,
    DateTime CreatedAt,
    DateTime? UpdateAt)
{
    public static async Task<ChannelMessageResponse> FromChat(Chat chat, IFileService fileService)
    {
        var attachmentUrl = chat.AttachmentName == null
            ? null
            : await fileService.GetFileUrlAsync(chat.AttachmentName);

        return new ChannelMessageResponse(
            Id: chat.Id,
            Message: chat.Message,
            Attachment: attachmentUrl,
            Username: chat.User.Name,
            SenderId: chat.UserId,
            Avatar: "not-implemented",
            CreatedAt: chat.CreatedAt,
            UpdateAt: chat.UpdateAt
        );
    }
}

public record GetChannelMessagesResponse(List<ChannelMessageResponse> Messages, int? LastMessageId);

