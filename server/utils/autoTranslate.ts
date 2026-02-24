type Lang = 'pt' | 'en' | 'es' | 'it' | 'fr'

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

const commonToIt: Array<[RegExp, string]> = [
  [/\bLicenças Digitais\b/gi, 'Licenze digitali'],
  [/\blicenças digitais\b/gi, 'licenze digitali'],
  [/\bLicença\b/gi, 'Licenza'],
  [/\blicença\b/gi, 'licenza'],
  [/\bChave\b/gi, 'Chiave'],
  [/\bchave\b/gi, 'chiave'],
  [/\bAtivação\b/gi, 'Attivazione'],
  [/\bativação\b/gi, 'attivazione'],
  [/\bEntrega digital\b/gi, 'Consegna digitale'],
  [/\bEntrega\b/gi, 'Consegna'],
  [/\bentrega\b/gi, 'consegna'],
  [/\bEnvio\b/gi, 'Consegna'],
  [/\benvio\b/gi, 'consegna'],
  [/\bSuporte\b/gi, 'Supporto'],
  [/\bsuporte\b/gi, 'supporto'],
  [/\bPagamento\b/gi, 'Pagamento'],
  [/\bpagamento\b/gi, 'pagamento'],
  [/\bconfirmação\b/gi, 'conferma'],
  [/\bConfirmação\b/gi, 'Conferma'],
  [/\bProduto\b/gi, 'Prodotto'],
  [/\bproduto\b/gi, 'prodotto'],
  [/\bComprar agora\b/gi, 'Acquista ora'],
  [/\bVer tutorial\b/gi, 'Vedi tutorial'],
  [/\bSem conteúdo\b/gi, 'Nessun contenuto.'],
  [/\bCarregando\b/gi, 'Caricamento'],
  [/\bnão encontrado\b/gi, 'non trovato']
]

const commonToFr: Array<[RegExp, string]> = [
  [/\bLicenças Digitais\b/gi, 'Licences numériques'],
  [/\blicenças digitais\b/gi, 'licences numériques'],
  [/\bLicença\b/gi, 'Licence'],
  [/\blicença\b/gi, 'licence'],
  [/\bChave\b/gi, 'Clé'],
  [/\bchave\b/gi, 'clé'],
  [/\bAtivação\b/gi, 'Activation'],
  [/\bativação\b/gi, 'activation'],
  [/\bEntrega digital\b/gi, 'Livraison numérique'],
  [/\bEntrega\b/gi, 'Livraison'],
  [/\bentrega\b/gi, 'livraison'],
  [/\bEnvio\b/gi, 'Livraison'],
  [/\benvio\b/gi, 'livraison'],
  [/\bSuporte\b/gi, 'Support'],
  [/\bsuporte\b/gi, 'support'],
  [/\bPagamento\b/gi, 'Paiement'],
  [/\bpagamento\b/gi, 'paiement'],
  [/\bconfirmação\b/gi, 'confirmation'],
  [/\bConfirmação\b/gi, 'Confirmation'],
  [/\bProduto\b/gi, 'Produit'],
  [/\bproduto\b/gi, 'produit'],
  [/\bComprar agora\b/gi, 'Acheter maintenant'],
  [/\bVer tutorial\b/gi, 'Voir le tutoriel'],
  [/\bSem conteúdo\b/gi, 'Aucun contenu.'],
  [/\bCarregando\b/gi, 'Chargement'],
  [/\bnão encontrado\b/gi, 'introuvable']
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

const phrasesToIt: Array<[RegExp, string]> = [
  [/Após a confirmação do pagamento,/gi, 'Dopo la conferma del pagamento,'],
  [/após a confirmação do pagamento/gi, 'dopo la conferma del pagamento'],
  [/você recebe/gi, 'riceverai'],
  [/Você recebe/gi, 'Riceverai'],
  [/por meio de uma conta fornecida/gi, 'tramite un account fornito'],
  [/\(login e senha\)/gi, '(login e password)'],
  [/válida pelo período informado/gi, 'valida per il periodo indicato'],
  [/Validade de 12 meses/gi, 'Validità: 12 mesi'],
  [/O acesso é feito com a conta fornecida/gi, "L'accesso avviene con l'account fornito"],
  [/não é ativação em uma conta Microsoft pessoal já existente/gi, 'non è un’attivazione su un account Microsoft personale già esistente'],
  [/Se tiver qualquer dúvida/gi, 'Se hai domande'],
  [/entre em contato/gi, 'contattaci'],
  [/número do pedido/gi, "numero dell'ordine"]
]

const phrasesToFr: Array<[RegExp, string]> = [
  [/Após a confirmação do pagamento,/gi, 'Après confirmation du paiement,'],
  [/após a confirmação do pagamento/gi, 'après confirmation du paiement'],
  [/você recebe/gi, 'vous recevrez'],
  [/Você recebe/gi, 'Vous recevrez'],
  [/por meio de uma conta fornecida/gi, 'via un compte fourni'],
  [/\(login e senha\)/gi, '(identifiant et mot de passe)'],
  [/válida pelo período informado/gi, 'valide pour la période indiquée'],
  [/Validade de 12 meses/gi, 'Validité : 12 mois'],
  [/O acesso é feito com a conta fornecida/gi, "L'accès se fait avec le compte fourni"],
  [/não é ativação em uma conta Microsoft pessoal já existente/gi, "ce n'est pas une activation sur un compte Microsoft personnel existant"],
  [/Se tiver qualquer dúvida/gi, 'Si vous avez des questions'],
  [/entre em contato/gi, 'contactez-nous'],
  [/número do pedido/gi, 'numéro de commande']
]

export function autoTranslateText(text: string | null | undefined, opts: TranslateOptions): string | null {
  if (text === null || text === undefined) return null
  const raw = String(text)
  const lang = opts.lang
  if (lang === 'pt') return raw

  const common =
    lang === 'en'
      ? commonToEn
      : lang === 'es'
        ? commonToEs
        : lang === 'it'
          ? commonToIt
          : commonToFr
  const phrases =
    lang === 'en'
      ? phrasesToEn
      : lang === 'es'
        ? phrasesToEs
        : lang === 'it'
          ? phrasesToIt
          : phrasesToFr

  const step1 = applyReplacements(raw, phrases)
  const step2 = applyReplacements(step1, common)
  return step2
}

export function autoTranslateMaybe(input: unknown, opts: TranslateOptions): unknown {
  if (typeof input !== 'string') return input
  return autoTranslateText(input, opts)
}
