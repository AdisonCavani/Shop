using Microsoft.AspNetCore.Hosting;

[assembly: HostingStartup(typeof(Shop.Areas.Identity.IdentityHostingStartup))]
namespace Shop.Areas.Identity;

public class IdentityHostingStartup : IHostingStartup
{
    public void Configure(IWebHostBuilder builder)
    {
        builder.ConfigureServices((context, services) =>
        {
        });
    }
}
