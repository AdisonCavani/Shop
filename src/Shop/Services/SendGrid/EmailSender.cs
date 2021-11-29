using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Shop.Services.SendGrid;

public class EmailSender : IEmailSender
{
    public AuthMessageSenderOptions Options { get; } // Set this only via Secret Manager!

    public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor)
    {
        Options = optionsAccessor.Value;
    }

    public Task SendEmailAsync(string email, string subject, string message) => Execute(Options.SendGridKey, subject, message, email);

    public Task Execute(string apiKey, string subject, string message, string email)
    {
        var client = new SendGridClient(apiKey);
        var msg = new SendGridMessage()
        {
            // TODO: Set email and name
            From = new EmailAddress("adriansrodon@tuta.io", "Shop"),
            Subject = subject,
            PlainTextContent = message,
            HtmlContent = message
        };
        msg.AddTo(new EmailAddress(email));

        // Disable click tracking.
        // See https://docs.sendgrid.com/ui/account-and-settings/tracking
        // TODO: Add Google Analytics
        msg.SetClickTracking(true, true);

        return client.SendEmailAsync(msg);
    }
}
