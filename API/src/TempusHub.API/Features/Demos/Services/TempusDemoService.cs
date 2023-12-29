using System.IO.Compression;
using TempusApi;

namespace TempusHub.API.Features.Demos.Services;

public class TempusDemoService(ITempusClient tempusClient, HttpClient httpClient)
{
    public async Task<StvParserResponse> ExtractDemoAsync(long demoId, CancellationToken cancellationToken)
    {
        var demo = await tempusClient.GetDemoInfoAsync(demoId, cancellationToken);
        var url = demo.Overview.Url;

        var downloadStream = httpClient.GetStreamAsync(url, cancellationToken);

        var zipFilePath = Path.Join(Environment.CurrentDirectory, "demos", demo.Overview.FileName + ".zip");
        Directory.CreateDirectory(Path.GetDirectoryName(zipFilePath) ?? string.Empty);
        await using (var fileStream = File.Create(zipFilePath))
        {
            await downloadStream.Result.CopyToAsync(fileStream, cancellationToken);
            
            await fileStream.FlushAsync(cancellationToken);
        }
        
        var filePath = zipFilePath.Replace(".zip", ".dem");

        // Its a zip file, extract the underlying .dem
        using (var archive = ZipFile.OpenRead(zipFilePath))
        {
            var entry = archive.Entries.FirstOrDefault(e => e.FullName.EndsWith(".dem"));
            if (entry is null)
            {
                throw new InvalidOperationException("Demo was not a valid zip file");
            }


            entry.ExtractToFile(filePath, true);
        }

        var output = StvParser.ExtractStvData(filePath);

        File.Delete(zipFilePath);
        File.Delete(filePath);

        return output;
    }
}