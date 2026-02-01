type Lang = 'pt' | 'en' | 'es'

type TranslateOptions = {
  lang: Lang
}

function applyReplacements(input: string, pairs: Array<[RegExp, string]>): string {
  return pairs.reduce((acc, [re, to]) => acc.replace(re, to), input)
}

const commonToEn: Array<[RegExp, string]> = [
  [/\bLicenças Digitais\b/gi, 'Digital Licenses'],
  [/\blicenças digitais\b/gi, 'digital licenses'],
  [/\bLicença\b/gi, 'License'],
  [/\blicença\b/gi, 'license'],
  [/\bChave\b/gi, 'Key'],
  [/\bchave\b/gi, 'key'],
  [/\bAtivação\b/gi, 'Activation'],
  [/\bativação\b/gi, 'activation'],
  [/\bTutorial\b/gi, 'Tutorial'],
  [/\bEntrega digital\b/gi, 'Digital delivery'],
  [/\bEntrega\b/gi, 'Delivery'],
  [/\bentrega\b/gi, 'delivery'],
  [/\bEnvio\b/gi, 'Delivery'],
  [/\benvio\b/gi, 'delivery'],
  [/\bEnvio por e-mail\b/gi, 'Email delivery'],
  [/\be-mail\b/gi, 'email'],
  [/\bpor e-mail\b/gi, 'by email'],
  [/\bSuporte\b/gi, 'Support'],
  [/\bsuporte\b/gi, 'support'],
  [/\bPagamento\b/gi, 'Payment'],
  [/\bpagamento\b/gi, 'payment'],
  [/\bconfirmação\b/gi, 'confirmation'],
  [/\bConfirmação\b/gi, 'Confirmation'],
  [/\bWindows Server\b/gi, 'Windows Server'],
  [/\bMicrosoft 365\b/gi, 'Microsoft 365'],
  [/\bOffice 365\b/gi, 'Office 365'],
  [/\bOffice\b/gi, 'Office'],
  [/\bWindows\b/gi, 'Windows'],
  [/\bProduto\b/gi, 'Product'],
  [/\bproduto\b/gi, 'product'],
  [/\bComprar agora\b/gi, 'Buy now'],
  [/\bVer tutorial\b/gi, 'View tutorial'],
  [/\bTutorial de Ativação\b/gi, 'Activation tutorial'],
  [/\bSem conteúdo\b/gi, 'No content.'],
  [/\bCarregando\b/gi, 'Loading'],
  [/\bnão encontrado\b/gi, 'not found']
]

const commonToEs: Array<[RegExp, string]> = [
  [/\bLicenças Digitais\b/gi, 'Licencias digitales'],
  [/\blicenças digitais\b/gi, 'licencias digitales'],
  [/\bLicença\b/gi, 'Licencia'],
  [/\blicença\b/gi, 'licencia'],
  [/\bChave\b/gi, 'Clave'],
  [/\bchave\b/gi, 'clave'],
  [/\bAtivação\b/gi, 'Activación'],
  [/\bativação\b/gi, 'activación'],
  [/\bTutorial\b/gi, 'Tutorial'],
  [/\bEntrega digital\b/gi, 'Entrega digital'],
  [/\bEntrega\b/gi, 'Entrega'],
  [/\bentrega\b/gi, 'entrega'],
  [/\bEnvio\b/gi, 'Envío'],
  [/\benvio\b/gi, 'envío'],
  [/\bEnvio por e-mail\b/gi, 'Envío por e-mail'],
  [/\be-mail\b/gi, 'e-mail'],
  [/\bpor e-mail\b/gi, 'por e-mail'],
  [/\bSuporte\b/gi, 'Soporte'],
  [/\bsuporte\b/gi, 'soporte'],
  [/\bPagamento\b/gi, 'Pago'],
  [/\bpagamento\b/gi, 'pago'],
  [/\bconfirmação\b/gi, 'confirmación'],
  [/\bConfirmação\b/gi, 'Confirmación'],
  [/\bWindows Server\b/gi, 'Windows Server'],
  [/\bMicrosoft 365\b/gi, 'Microsoft 365'],
  [/\bOffice 365\b/gi, 'Office 365'],
  [/\bOffice\b/gi, 'Office'],
  [/\bWindows\b/gi, 'Windows'],
  [/\bProduto\b/gi, 'Producto'],
  [/\bproduto\b/gi, 'producto'],
  [/\bComprar agora\b/gi, 'Comprar ahora'],
  [/\bVer tutorial\b/gi, 'Ver tutorial'],
  [/\bTutorial de Ativação\b/gi, 'Tutorial de activación'],
  [/\bSem conteúdo\b/gi, 'Sin contenido.'],
  [/\bCarregando\b/gi, 'Cargando'],
  [/\bnão encontrado\b/gi, 'no encontrado']
]

const phrasesToEn: Array<[RegExp, string]> = [
  [/Após a confirmação do pagamento,/gi, 'After payment confirmation,'],
  [/após a confirmação do pagamento/gi, 'after payment confirmation'],
  [/você recebe/gi, 'you will receive'],
  [/Você recebe/gi, 'You will receive'],
  [/por meio de uma conta fornecida/gi, 'through a provided account'],
  [/\(login e senha\)/gi, '(login and password)'],
  [/válida pelo período informado/gi, 'valid for the stated period'],
  [/Validade de 12 meses/gi, 'Validity: 12 months'],
  [/O acesso é feito com a conta fornecida/gi, 'Access is made with the provided account'],
  [/não é ativação em uma conta Microsoft pessoal já existente/gi, 'it is not activation on an existing personal Microsoft account'],
  [/Se tiver qualquer dúvida/gi, 'If you have any questions'],
  [/entre em contato/gi, 'contact us'],
  [/número do pedido/gi, 'order number']
]

const phrasesToEs: Array<[RegExp, string]> = [
  [/Após a confirmação do pagamento,/gi, 'Tras la confirmación del pago,'],
  [/após a confirmação do pagamento/gi, 'después de la confirmación del pago'],
  [/você recebe/gi, 'recibirás'],
  [/Você recebe/gi, 'Recibirás'],
  [/por meio de uma conta fornecida/gi, 'mediante una cuenta proporcionada'],
  [/\(login e senha\)/gi, '(usuario y contraseña)'],
  [/válida pelo período informado/gi, 'válida por el periodo informado'],
  [/Validade de 12 meses/gi, 'Validez de 12 meses'],
  [/O acesso é feito com a conta fornecida/gi, 'El acceso se realiza con la cuenta proporcionada'],
  [/não é ativação em uma conta Microsoft pessoal já existente/gi, 'no es activación en una cuenta Microsoft personal existente'],
  [/Se tiver qualquer dúvida/gi, 'Si tienes cualquier duda'],
  [/entre em contato/gi, 'ponte en contacto'],
  [/número do pedido/gi, 'número del pedido']
]

export function autoTranslateText(text: string | null | undefined, opts: TranslateOptions): string | null {
  if (text === null || text === undefined) return null
  const raw = String(text)
  const lang = opts.lang
  if (lang === 'pt') return raw

  const common = lang === 'en' ? commonToEn : commonToEs
  const phrases = lang === 'en' ? phrasesToEn : phrasesToEs

  const step1 = applyReplacements(raw, phrases)
  const step2 = applyReplacements(step1, common)
  return step2
}

export function autoTranslateMaybe(input: unknown, opts: TranslateOptions): unknown {
  if (typeof input !== 'string') return input
  return autoTranslateText(input, opts)
}
