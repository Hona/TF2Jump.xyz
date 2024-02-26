FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["UI/src/TempusHub.WebUI/TempusHub.WebUI/TempusHub.WebUI.csproj", "UI/src/TempusHub.WebUI/TempusHub.WebUI/"]
COPY ["UI/src/TempusHub.WebUI/TempusHub.WebUI.Client/TempusHub.WebUI.Client.csproj", "UI/src/TempusHub.WebUI/TempusHub.WebUI.Client/"]
RUN dotnet restore "UI/src/TempusHub.WebUI/TempusHub.WebUI/TempusHub.WebUI.csproj"
COPY . .
WORKDIR "/src/UI/src/TempusHub.WebUI/TempusHub.WebUI"
RUN dotnet build "TempusHub.WebUI.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "TempusHub.WebUI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TempusHub.WebUI.dll"]
