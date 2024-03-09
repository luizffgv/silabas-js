/**
 * Divide uma subpalavra do português brasileiro onde há hiato.
 *
 * @param palavra - Subpalavra para dividir.
 * @param aposTonica - Caso essa subpalavra venha logo após uma sílaba tônica.
 */
function dividirHiatos(palavra: string, aposTonica: boolean = false): string[] {
  const hiatoIndice = palavra.match(
    aposTonica
      ? /a(a|á|ã|e|é|ê|í|o|ó|ú)|e(á|ã|e|é|í|ó|ú)|i(á|ã|é|i|í|ó|ú)|o(á|ã|e|é|í|o|ó)|u(á|é|í|u|ó|ú)/i
      : /a(á|ã|e|é|ê|í|o|ó|ú)|e(a|á|ã|e|é|í|o|ó|ú)|i(a|á|ã|e|é|i|í|o|ó|ú)|o(a|á|ã|e|é|í|o|ó)|u(u|ú)|(?<!g|q)u(a|á|e|é|í|o|ó)/i
  )?.index;

  if (hiatoIndice != null) {
    const subpalavraA = palavra.slice(0, hiatoIndice + 1);
    const subpalavraB = palavra.slice(hiatoIndice + 1);

    return [subpalavraA, ...dividirHiatos(subpalavraB, false)];
  } else return [palavra];
}

/**
 * Divide uma subpalavra do português brasileiro em sílabas.
 * Não funciona se houver um dígrafo consonantal separável na subpalavra.
 * Não funciona se houver um dígrafo consonantal inseparável na subpalavra.
 *
 * @param palavra - Subpalavra para dividir.
 * @param aposTonica - Caso essa subpalavra venha logo após uma sílaba tônica.
 */
function dividirSilabasSemDCSeDCI(
  palavra: string,
  aposTonica: boolean = false
): string[] {
  // Divide a palavra no primeiro encontro consonantal entre vogais.
  const match = palavra.match(
    /[aãâáeêéiíoôóuú](([bcdfgjkpqtwxyz])[lr]|[bcdfghjklmnpqrstvwxyz]?([bcçdfghjklmnpqrstvwxyz])[bcdfghjklmnpqrstvwxyz]?)[aãâáeêéiíoôóuú]/di
  );
  const encontroIndice = match?.indices?.[2]?.[0] ?? match?.indices?.[3]?.[0];

  if (encontroIndice != null) {
    const subpalavraA = palavra.slice(0, encontroIndice);
    const subpalavraB = palavra.slice(encontroIndice);

    const silabasA = dividirHiatos(subpalavraA, aposTonica);
    const silabasB = dividirSilabasSemDCSeDCI(
      subpalavraB,
      /[áãéêíóõú]/i.test(silabasA[silabasA.length - 1].slice(-1))
    );

    return [...silabasA, ...silabasB];
  } else return dividirHiatos(palavra, aposTonica);
}

/**
 * Divide uma subpalavra do português brasileiro em sílabas.
 * Não funciona se houver um dígrafo consonantal separável na subpalavra.
 *
 * @param palavra - Subpalavra para dividir.
 * @param aposTonica - Caso essa subpalavra venha logo após uma sílaba tônica.
 */
function dividirSilabasSemDCS(
  palavra: string,
  aposTonica: boolean = false
): string[] {
  // Divide a palavra no começo do primeiro dígrafo consonantal inseparável
  const dciIndice = palavra.match(/gu|qu|lh|nh|ch|sh/i)?.index;
  if (dciIndice != null && dciIndice > 0) {
    const subpalavraA = palavra.slice(0, dciIndice);
    const subpalavraB = palavra.slice(dciIndice);

    const silabasA = dividirSilabasSemDCSeDCI(subpalavraA, aposTonica);
    const silabasB = dividirSilabasSemDCS(
      subpalavraB,
      /[áãéêíóõú]/i.test(silabasA[silabasA.length - 1].slice(-1))
    );

    return [...silabasA, ...silabasB];
  } else return dividirSilabasSemDCSeDCI(palavra, aposTonica);
}

/**
 * Divide uma palavra/subpalavra do português brasileiro em sílabas.
 *
 * @param palavra - Palavra/subpalavra para dividir.
 * @param aposTonica - Caso essa subpalavra venha logo após uma sílaba tônica.
 */
export function dividirSilabas(
  palavra: string,
  aposTonica: boolean = false
): string[] {
  // Divide a palavra no meio do primeiro dígrafo consonantal separável
  const dcsIndice = palavra.match(/rr|ss|sc|sç|xc|xs/i)?.index;
  if (dcsIndice != null) {
    const subpalavraA = palavra.slice(0, dcsIndice + 1);
    const subpalavraB = palavra.slice(dcsIndice + 1);

    const silabasA = dividirSilabasSemDCS(subpalavraA, aposTonica);
    const silabasB = dividirSilabas(
      subpalavraB,
      /[áãéêíóõú]/i.test(silabasA[silabasA.length - 1].slice(-1))
    );

    return [...silabasA, ...silabasB];
  } else return dividirSilabasSemDCS(palavra, aposTonica);
}
