
export type IMailer = MailerBase & (textBody | htmlBody)

interface MailerBase{
    from:string,
    to:string,
    subject:string,
}

interface textBody{
    text:string,
    html?:never
}



interface htmlBody{
    html:string,
    text?:never
}