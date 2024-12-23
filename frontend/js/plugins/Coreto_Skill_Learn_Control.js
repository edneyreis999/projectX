//=============================================================================
// RPG Maker MZ - Coreto Skill Learn Control
// Coreto_Skill_Learn_Control.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Controla o aprendizado de habilidades, bloqueando aprendizado automático para habilidades do Skill Shop.
 *
 * @param SkillTicketItemId
 * @text ID do Skill Ticket
 * @type number
 * @default 0
 * @desc Defina o ID do item usado como Skill Ticket.
 * Se não configurado, o plugin exibirá um erro e não funcionará.
 *
 * @help
 * ----------------------------------------------------------------------------
 * **Coreto Skill Learn Control**
 * ----------------------------------------------------------------------------
 * Este plugin permite controlar o aprendizado de habilidades e integra-se
 * ao Skill Shop. Ele implementa as seguintes funcionalidades:
 *
 * - Bloqueia o aprendizado automático de habilidades com as seguintes tags:
 *   <LudosPrice>, <Item x Cost>, <SkillShop>, ou <Can not Forget Skill>.
 * - Permite que habilidades com aprendizado automático sejam configuradas
 *   separadamente.
 * - Permite esquecer habilidades específicas em troca de Skill Tickets.
 *
 * ----------------------------------------------------------------------------
 * **Tags Suportadas**
 * ----------------------------------------------------------------------------
 * **Para habilidades do Skill Shop:**
 * Use a tag abaixo para indicar que a habilidade pode ser comprada:
 *   <Item x Cost: y>
 *   - `x`: ID do item usado como custo (geralmente Skill Ticket).
 *   - `y`: Quantidade necessária para adquirir a habilidade.
 *
 * **Para reembolsar habilidades ao esquecê-las:**
 * Use a tag abaixo para indicar o reembolso ao esquecer:
 *   <Item x Forget Reward: y>
 *   - `x`: ID do item reembolsado (geralmente Skill Ticket).
 *   - `y`: Quantidade reembolsada ao esquecer a habilidade.
 *
 * **Para impedir que habilidades sejam esquecidas:**
 * Use a tag abaixo para bloquear o esquecimento:
 *   <Can not Forget Skill>
 *
 * ----------------------------------------------------------------------------
 * **Funções Disponíveis**
 * ----------------------------------------------------------------------------
 * O plugin expõe as seguintes funções globais:
 *
 * **1. Forget All Skills de um Ator**
 *   `CoretoSkillLearnControl.forgetAllActorSkills(actorId);`
 *   - Esquece todas as habilidades do ator especificado e reembolsa os Skill Tickets.
 *   - `actorId`: ID do ator.
 *
 * **2. Forget All Skills da Party**
 *   `CoretoSkillLearnControl.forgetAllPartySkills();`
 *   - Esquece todas as habilidades de todos os membros da equipe e reembolsa os Skill Tickets.
 *
 * ----------------------------------------------------------------------------
 * **Configuração**
 * ----------------------------------------------------------------------------
 * 1. Configure o `SkillTicketItemId` no editor de plugins com o ID do item usado
 *    como Skill Ticket.
 *
 * 2. Adicione as tags necessárias às habilidades no banco de dados.
 *
 * ----------------------------------------------------------------------------
 * **Exemplo de Uso**
 * ----------------------------------------------------------------------------
 * 1. Adicione a tag `<Item 5 Cost: 2>` a uma habilidade para que ela possa ser
 *    comprada com 2 Skill Tickets (ID 5).
 *
 * 2. Adicione a tag `<Item 5 Forget Reward: 1>` a uma habilidade para que o jogador
 *    receba 1 Skill Ticket ao esquecê-la.
 *
 * 3. Adicione a tag `<Can not Forget Skill>` a uma habilidade que não pode ser esquecida.
 *
 * ----------------------------------------------------------------------------
 * **Licença**
 * ----------------------------------------------------------------------------
 * Este plugin pode ser usado em projetos comerciais e não comerciais, com os
 * devidos créditos.
 * ----------------------------------------------------------------------------
 */

(() => {
  const pluginName = 'Coreto_Skill_Learn_Control';
  const parameters = PluginManager.parameters(pluginName);
  const skillTicketItemId = Number(parameters['SkillTicketItemId'] || 0);

  if (skillTicketItemId <= 0) {
    console.error(`[${pluginName}] ERRO: O ID do Skill Ticket não foi configurado no plugin.`);
    return;
  }

  /**
   * Sobrescreve o método levelUp para bloquear aprendizado automático de habilidades do Skill Shop.
   * As habilidades com <Item x Cost>, <Can not Forget Skill>, ou <SkillShop> no campo Notes serão ignoradas.
   */
  Game_Actor.prototype.levelUp = function () {
    this._level++;

    const skillsToLearn = this.getLearnableSkillsForLevel(this._level);
    for (const skill of skillsToLearn) {
      this.learnSkill(skill.skillId);
      console.log(`[${pluginName}] Habilidade aprendida automaticamente: ${skill.skillId}`);
    }
  };

  /**
   * Retorna habilidades aprendíveis automaticamente no nível atual.
   * Ignora habilidades com <Item x Cost>, <Can not Forget Skill>, ou <SkillShop>.
   */
  Game_Actor.prototype.getLearnableSkillsForLevel = function (level) {
    return this.currentClass().learnings.filter(entry => {
      const note = entry.note || '';
      const isSkillShopSkill = /<Item \d+ Cost: \d+>|<Can not Forget Skill>|<SkillShop>/i.test(note);
      return !isSkillShopSkill && entry.level === level;
    });
  };

  /**
   * Esquece todas as habilidades de um ator e reembolsa os Skill Tickets usados.
   */
  function forgetAllActorSkills(actorId) {
    const actor = $gameActors.actor(actorId);
    if (!actor) {
      console.error(`[${pluginName}] Ator ${actorId} não encontrado.`);
      return;
    }

    const skills = actor.skills();
    for (const skill of skills) {
      const note = skill.note || '';

      if (/<Can not Forget Skill>/i.test(note)) {
        console.warn(`[${pluginName}] Habilidade ${skill.id} não pode ser esquecida.`);
        continue;
      }

      const forgetMatch = note.match(/<Item (\d+) Forget Reward: (\d+)>/i);
      if (forgetMatch) {
        const ticketCount = Number(forgetMatch[2]);
        actor.forgetSkill(skill.id);
        $gameParty.gainItem($dataItems[skillTicketItemId], ticketCount);
        console.log(`[${pluginName}] Habilidade ${skill.id} esquecida. ${ticketCount} Skill Tickets reembolsados.`);
      } else {
        console.warn(`[${pluginName}] Habilidade ${skill.id} não tem recompensa configurada para esquecimento.`);
      }
    }
  }

  /**
   * Esquece todas as habilidades de todos os atores da equipe e reembolsa os Skill Tickets usados.
   */
  function forgetAllPartySkills() {
    const partyMembers = $gameParty.members();
    for (const actor of partyMembers) {
      forgetAllActorSkills(actor.actorId());
    }
  }

  function showResetDialog() {
    const partyMembers = $gameParty.members();
    if (partyMembers.length === 0) {
      console.warn(`[${pluginName}] Não há membros na equipe para resetar habilidades.`);
      $gameMessage.add('\\c[4]Não há membros na party para resetar habilidades.\\.');
      return;
    }

    const choices = partyMembers.map(actor => {
      return `<BgColor: #222233>\\c[1]${actor.name()}\\c[0]`;
    });

    const actorIds = partyMembers.map(actor => actor.actorId());
    choices.push('<BgColor: #334422>\\c[3]Todos os Membros\\c[0]');
    choices.push('<BgColor: #442222>\\c[2]Sair\\c[0]');

    $gameMessage.setChoices(choices, 0, -1);
    $gameMessage.setChoiceCallback(choiceIndex => {
      if (choiceIndex < actorIds.length) {
        const actorId = actorIds[choiceIndex];
        CoretoSkillLearnControl.forgetAllActorSkills(actorId);
        $gameMessage.add(`\\c[1]Habilidades de \\I[${partyMembers[choiceIndex].faceIndex()}]${partyMembers[choiceIndex].name()}\\c[0] foram resetadas!`);
        AudioManager.playSe({ name: 'Magic3', volume: 90, pitch: 100 });
      } else if (choiceIndex === actorIds.length) {
        CoretoSkillLearnControl.forgetAllPartySkills();
        $gameMessage.add('\\c[3]Habilidades de todos os membros foram resetadas!\\c[0]');
        AudioManager.playSe({ name: 'Magic3', volume: 90, pitch: 100 });
      } else {
        $gameMessage.add('\\c[2]Você decidiu não fazer alterações.\\c[0]');
      }
    });

    const dialogIntro = '\\WordWrap\\c[4]Selecione um membro da equipe para resetar as habilidades:\\.';

    $gameMessage.add(dialogIntro);
  }

  // Expor as funções globalmente para integração com outros sistemas
  window.CoretoSkillLearnControl = {
    forgetAllActorSkills,
    forgetAllPartySkills,
    showResetDialog,
  };

  console.log(`[${pluginName}] Plugin inicializado com sucesso. Skill Ticket configurado como ID: ${skillTicketItemId}`);
})();
