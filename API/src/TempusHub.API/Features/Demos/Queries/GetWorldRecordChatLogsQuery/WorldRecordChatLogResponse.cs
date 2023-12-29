using TempusApi.Enums;
using TempusApi.Models;

namespace TempusHub.API.Features.Demos.Queries.GetWorldRecordChatLogsQuery;

public record WorldRecordChatLogResponse(
    Class Class,
    string PlayerName,
    string RunDuration,
    string WorldRecordSplit,
    string PersonalRecordSplit,
    string SteamId,
    ServerPlayerModel? PlayerInfo,
    SteamUserInfo UserInfo);
    
public record SteamUserInfo(string Name, ulong SteamId, string ProfileUrl, string AvatarUrl);