import sendgrid from '@sendgrid/mail';
import environment from './environment';
sendgrid.setApiKey(environment.SENDGRID.API_KEY as string);

// configuração de envio
const msg = {
  from: environment.SENDGRID.FROM_EMAIL as string,
  to: "",
  subject: "",
  text:"",
  html:""
}

// configuração de envio
const send = async (email:string) => {
  console.log(msg);
  return sendgrid
    .send(msg)
    .then(() => {
      console.log("email enviado!");
      return true;
    })
    .catch((error) => {
      console.error(`email nao enviado: ${error}`);
      return false;
    });
}

const validateEmail = (email:string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const sendResetToken = (email: string, resetToken: string) => {
  msg.to = email;
  msg.subject = "JWT-AUTH: Reset Password";
  msg.text = `Altere a sua senha copiando e colando o link a seguir 
  http://localhost:3333/reset-password/${resetToken}`;
  msg.html = `<p>Altere a sua senha clicando no link abaixo <strong>
  http://localhost:3333/reset-password/${resetToken}</strong></p>`;

  return send(email);
}

export default {
  sendResetToken,
  validateEmail,
}