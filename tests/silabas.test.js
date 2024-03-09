import { dividirSilabas } from "../lib/silabas.js";
import * as assert from "node:assert";
import test, { describe } from "node:test";

/**
 * Associa palavras (propriedades) com suas sílabas (valores).
 *
 * Exemplo:
 * ```js
 * const mapa = {
 *   erro: ["er", "ro"],
 *   cachorro: ["ca", "chor", "ro"]
 * };
 * ```
 *
 * @typedef {{[palavra: string]: string[]}} MapaSilabico
 */

/**
 * Verifica se {@link dividirSilabas} produz os mesmos resultados que um
 * {@link MapaSilabico}.
 *
 * @param {MapaSilabico} mapaSilabico
 */
function verificarMapa(mapaSilabico) {
  for (const [palavra, silabasCorretas] of Object.entries(mapaSilabico)) {
    const silabas = dividirSilabas(palavra);
    assert.deepEqual(silabas, silabasCorretas);
  }
}

describe("Separação de sílabas", () => {
  test("RR é separado", () => {
    verificarMapa({
      erro: ["er", "ro"],
    });
  });

  test("SS é separado", () => {
    verificarMapa({
      assim: ["as", "sim"],
    });
  });

  test("Encontro consonantal perfeito", () => {
    verificarMapa({
      mostra: ["mos", "tra"],
      macro: ["ma", "cro"],
      clicar: ["cli", "car"],
    });
  });

  test("Encontro consonantal imperfeito", () => {
    verificarMapa({
      ritmo: ["rit", "mo"],
      algente: ["al", "gen", "te"],
      lista: ["lis", "ta"],
      objecto: ["ob", "jec", "to"],
      genro: ["gen", "ro"],
      enlata: ["en", "la", "ta"],
      facção: ["fac", "ção"],
    });
  });

  test("QUA é apenas uma sílaba", () => {
    verificarMapa({ quarta: ["quar", "ta"] });
  });

  test("QUE é apenas uma sílaba", () => {
    verificarMapa({
      pequem: ["pe", "quem"],
      saque: ["sa", "que"],
    });
  });

  test("QUI é apenas uma sílaba", () => {
    verificarMapa({
      pequim: ["pe", "quim"],
      pequi: ["pe", "qui"],
    });
  });

  test("QUO é apenas uma sílaba", () => {
    verificarMapa({
      aquoso: ["a", "quo", "so"],
    });
  });

  test("GUA é apenas uma sílaba", () => {
    verificarMapa({
      aguarde: ["a", "guar", "de"],
    });
  });

  test("GUE é apenas uma sílaba", () => {
    verificarMapa({
      aguente: ["a", "guen", "te"],
    });
  });

  test("GUI é apenas uma sílaba", () => {
    verificarMapa({
      guincho: ["guin", "cho"],
    });
  });

  test("GUO é apenas uma sílaba", () => {
    verificarMapa({
      ambíguo: ["am", "bí", "guo"],
    });
  });

  test("Ditongos após sílaba tônica", () => {
    verificarMapa({
      mágoa: ["má", "goa"],
      água: ["á", "gua"],
    });
  });

  test("Hiatos", () => {
    verificarMapa({
      magoa: ["ma", "go", "a"],
      gazua: ["ga", "zu", "a"],
      abraão: ["a", "bra", "ão"],
      suíno: ["su", "í", "no"],
      saída: ["sa", "í", "da"],
    });
  });
});
