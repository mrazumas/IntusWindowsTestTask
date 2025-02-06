using IntusWindowsTestTask.Server.Entities;

namespace IntusWindowsTestTask.Server.Interfaces.Processors
{
    public interface ISVGConfigurationProcessor
    {
        Task<SVGDimensions> GetSVGDimensions();
        Task SetSvgDimensions(int height, int width);
    }
}