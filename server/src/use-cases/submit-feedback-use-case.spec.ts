import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () =>{

  it('deveria ser possivel enviar um feedback', async () => {

    // Se espera que quando chamado não gere erro
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'exemplo de comentario',
      screenshot: 'data:image/png;base64'
    })).resolves.not.toThrow();

    // Valida se a função de criação do feedback foi chamada
    expect(createFeedbackSpy).toHaveBeenCalled();
    // Valida se a função de envio de e-mail foi chamada
    expect(sendMailSpy).toHaveBeenCalled();

  });

  it('não deveria ser possivel enviar um feedback sem um tipo', async () => {
  
    // Se espera que quando chamado não gere erro
    await expect(submitFeedback.execute({
      type: '',
      comment: 'exemplo de comentario',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow();

  });

  it('não deveria ser possivel enviar um feedback sem um comentario', async () => {
  
    // Se espera que quando chamado não gere erro
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow();

  });

  it('não deveria ser possivel enviar um feedback com imagem inválida', async () => {
  
    // Se espera que quando chamado não gere erro
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'exemplo de comentario',
      screenshot: 'teste.jpg'
    })).rejects.toThrow();

  });

});