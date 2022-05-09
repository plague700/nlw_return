import { MailAdapter } from "../adapters/mail-adapters";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string
}

export class SubmitFeedbackUseCase {

  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ){}

  async execute(request: SubmitFeedbackUseCaseRequest){

    const {type, comment, screenshot} = request;

    // Trativa para tipo do feedback
    if(!type){
      throw new Error('Tipo é obrigatorio!');
    }

    // Trativa para tipo do comentario
    if(!comment){
      throw new Error('Comentario é obrigatorio!');
    }

    // Trativa para envio de imagem
    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Formato de imagem inválido!');
    }

    // Registro do feedback
    const feedback = await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    });

    // Envio de e-mail
    const sendmail = await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif, font-size: 16px, color: #1211;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : ``,
        '</div>'
      ].join('\n')
    });

    return {feedback, sendmail};

  }

}