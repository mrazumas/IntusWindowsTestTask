using System.Text.Json;
using IntusWindowsTestTask.Server.Entities;
using IntusWindowsTestTask.Server.Interfaces.Processors;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace IntusWindowsTestTask.Server.Processors
{
    public class SVGConfigurationProcessor(IConfiguration configuration) : ISVGConfigurationProcessor
    {
        public async Task SetSvgDimensions(int height, int width)
        {
            if(height == 0 || width == 0)
            {
                return;
            }

            var svgDimensions = new SVGDimensions()
            {
                height = height,
                width = width
            };

            var serialisedDimensions = JsonSerializer.Serialize(svgDimensions);
            var fileName = configuration.GetValue<string>("SvgConfigurationFileName");

            await File.WriteAllTextAsync($"{Environment.CurrentDirectory}/{fileName}", serialisedDimensions);
        }

        public async Task<SVGDimensions> GetSVGDimensions()
        {
            var fileName = configuration.GetValue<string>("SvgConfigurationFileName");
            var fileContents = await File.ReadAllTextAsync($"{Environment.CurrentDirectory}/{fileName}");

            var svgDimensions = JsonSerializer.Deserialize<SVGDimensions>(fileContents);

            return svgDimensions!;
        }
    }
}
