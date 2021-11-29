using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;

namespace Shop.Services.Smtp;

public class DevEmailSender : IEmailSender
{
    public SmtpSettings Options { get; } // Set this only via Secret Manager!

    public DevEmailSender(IOptions<SmtpSettings> optionsAccessor)
    {
        Options = optionsAccessor.Value;
    }

    public Task SendEmailAsync(string email, string subject, string htmlMessage) => Execute(email, subject, htmlMessage);

    public Task Execute(string email, string subject, string htmlMessage)
    {
        var client = new SmtpClient(Options.Host, Options.Port)
        {
            EnableSsl = true,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential(Options.Email, Options.Password)
        };

        var msg = new MailMessage()
        {
            From = new MailAddress(Options.Email, "Shop"),
            Subject = subject,
            IsBodyHtml = true,
            Body = htmlMessage,
        };
        msg.To.Add(email);

        return client.SendMailAsync(msg);
    }
}
