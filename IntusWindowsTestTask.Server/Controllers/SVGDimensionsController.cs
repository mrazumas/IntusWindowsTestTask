using IntusWindowsTestTask.Server.Interfaces.Processors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IntusWindowsTestTask.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SVGDimensionsController(ISVGConfigurationProcessor svgConfigurationProcessor) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> SetSvgDimensions(int height, int width)
        {
            await svgConfigurationProcessor.SetSvgDimensions(height, width);

            await Task.Delay(10000);

            if (width > height)
            {
                return Ok(new { error = "Width exceeds height" });
            }

            return Ok(new { message = "Valid" });
        }

        [HttpGet]
        public async Task<IActionResult> GetSVGDimensions()
        {
            var svgConfiguration = await svgConfigurationProcessor.GetSVGDimensions();
            return Ok(svgConfiguration);
        }
    }
}
