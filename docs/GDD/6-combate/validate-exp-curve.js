#!/usr/bin/env node

/**
 * Script de Validação: Curva de EXP ProjectX
 *
 * Compara a EXP calculada pelo expParams do RPG Maker MZ
 * com a fórmula ideal: 50 * nivel²
 *
 * Uso: node validate-exp-curve.js [output-csv-path]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o arquivo Classes.json
const CLASSES_PATH = '/Users/edney/projects/coreto/projectX/frontend/data/Classes.json';

/**
 * Calcula EXP usando a fórmula do RPG Maker MZ
 * Fórmula: base + extra * level^(inclination/100) * (1 + acceleration/100)
 *
 * @param {number} level - Nível alvo
 * @param {Array<number>} expParams - [base, extra, inclination, acceleration]
 * @returns {number} EXP necessária para o nível
 */
function rpgMakerExpForLevel(level, expParams) {
  const [base, extra, inclination, acceleration] = expParams;
  return base + extra * Math.pow(level, inclination / 100) * (1 + acceleration / 100);
}

/**
 * Calcula EXP usando a fórmula ideal do ProjectX
 * Fórmula: 50 * nivel²
 *
 * @param {number} level - Nível alvo
 * @returns {number} EXP necessária para o nível
 */
function idealExpForLevel(level) {
  return 50 * Math.pow(level, 2);
}

/**
 * Calcula a diferença percentual entre dois valores
 *
 * @param {number} actual - Valor implementado
 * @param {number} ideal - Valor ideal
 * @returns {string} Diferença percentual formatada
 */
function percentDiff(actual, ideal) {
  if (ideal === 0) return 'N/A';
  const diff = ((actual - ideal) / ideal) * 100;
  const sign = diff > 0 ? '+' : '';
  return `${sign}${diff.toFixed(2)}%`;
}

/**
 * Formata número para exibição
 *
 * @param {number} num - Número a formatar
 * @returns {string} Número formatado com separadores de milhar
 */
function formatNumber(num) {
  return num.toLocaleString('pt-BR');
}

/**
 * Gera tabela ASCII para console
 *
 * @param {Array} results - Resultados da validação
 * @returns {string} Tabela formatada
 */
function generateAsciiTable(results) {
  let output = '\n';
  output += '='.repeat(120) + '\n';
  output += 'RELATORIO DE VALIDACAO - CURVA DE EXP PROJECTX\n';
  output += '='.repeat(120) + '\n\n';

  // Cabeçalho da tabela
  output += '+--------+------------------+------------------+---------------+------------------+\n';
  output += '| Nivel  | EXP Implementada | EXP Ideal (50n²) | Diferença     | % Diferença      |\n';
  output += '+--------+------------------+------------------+---------------+------------------+\n';

  // Linhas da tabela
  results.forEach(row => {
    const nivel = row.level.toString().padEnd(6);
    const implemented = formatNumber(row.expImplemented).padStart(16);
    const ideal = formatNumber(row.expIdeal).padStart(16);
    const diff = (row.expDifference > 0 ? '+' : '') + formatNumber(row.expDifference);
    const diffStr = diff.padStart(13);
    const pct = row.percentDiff.padEnd(16);

    output += `| ${nivel} | ${implemented} | ${ideal} | ${diffStr} | ${pct} |\n`;
  });

  output += '+--------+------------------+------------------+---------------+------------------+\n';

  // Resumo estatístico
  const maxDiff = Math.max(...results.map(r => Math.abs(r.expDifference)));
  const maxPct = Math.max(...results.map(r => Math.abs(parseFloat(r.percentDiff) || 0)));
  const avgPct = results.reduce((sum, r) => sum + Math.abs(parseFloat(r.percentDiff) || 0), 0) / results.length;

  output += '\nRESUMO ESTATISTICO:\n';
  output += '-'.repeat(120) + '\n';
  output += `Maior diferença absoluta: ${formatNumber(maxDiff)} EXP\n`;
  output += `Maior diferença percentual: ${maxPct.toFixed(2)}%\n`;
  output += `Diferença percentual média: ${avgPct.toFixed(2)}%\n`;
  output += '-'.repeat(120) + '\n';

  // Veredito
  const isGood = maxPct < 5.0; // Aceitável se diferença < 5%
  const veredito = isGood
    ? 'V CURVA COMPATIVEL: Diferença dentro da margem aceitavel (< 5%)'
    : '! CURVA REQUER AJUSTE: Diferença acima da margem aceitavel (>= 5%)';

  output += `\nVEREDITO: ${veredito}\n`;
  output += '='.repeat(120) + '\n';

  return output;
}

/**
 * Gera CSV para exportação
 *
 * @param {Array} results - Resultados da validação
 * @returns {string} CSV formatado
 */
function generateCsv(results) {
  let csv = 'Nivel,EXP_Implementada,EXP_Ideal,Diferenca,Porc_Diferenca\n';
  results.forEach(row => {
    csv += `${row.level},${row.expImplemented},${row.expIdeal},${row.expDifference},${row.percentDiff}\n`;
  });
  return csv;
}

/**
 * Função principal
 */
function main() {
  console.log('Script de Validacao: Curva de EXP ProjectX');
  console.log('='.repeat(50));

  // Ler arquivo Classes.json
  let classesData;
  try {
    const content = fs.readFileSync(CLASSES_PATH, 'utf-8');
    classesData = JSON.parse(content);
  } catch (error) {
    console.error(`ERRO: Nao foi possivel ler ${CLASSES_PATH}`);
    console.error(error.message);
    process.exit(1);
  }

  // Pegar expParams da primeira classe (todas devem ser iguais)
  const firstClass = classesData.find(c => c && c.expParams);
  if (!firstClass) {
    console.error('ERRO: Nenhuma classe encontrada com expParams');
    process.exit(1);
  }

  const expParams = firstClass.expParams;
  console.log(`\nexpParams encontrado: [${expParams.join(', ')}]`);

  // Calcular EXP para níveis 1 a 30
  const results = [];
  for (let level = 1; level <= 30; level++) {
    const expImplemented = Math.round(rpgMakerExpForLevel(level, expParams));
    const expIdeal = idealExpForLevel(level);
    const expDifference = expImplemented - expIdeal;
    const pctDiff = percentDiff(expImplemented, expIdeal);

    results.push({
      level,
      expImplemented,
      expIdeal,
      expDifference,
      percentDiff: pctDiff
    });
  }

  // Gerar e exibir tabela ASCII
  const table = generateAsciiTable(results);
  console.log(table);

  // Salvar CSV se caminho fornecido
  const csvPath = process.argv[2];
  if (csvPath) {
    const csv = generateCsv(results);
    try {
      fs.writeFileSync(csvPath, csv, 'utf-8');
      console.log(`\nCSV salvo em: ${csvPath}`);
    } catch (error) {
      console.error(`\nERRO: Nao foi possivel salvar CSV em ${csvPath}`);
      console.error(error.message);
    }
  } else {
    console.log('\nDica: Para salvar CSV, execute: node validate-exp-curve.js <caminho-csv>');
  }

  // Exit code baseado no veredito
  const maxPct = Math.max(...results.map(r => Math.abs(parseFloat(r.percentDiff) || 0)));
  process.exit(maxPct >= 5.0 ? 1 : 0);
}

// Executar
main();
