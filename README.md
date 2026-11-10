# DOCUMENTAÇÃO TÉCNICA DO PROJETO

# 📱 PAINEL INTERATIVO DE ACESSIBILIDADE DIGITAL (45+ E IDOSOS)
### Plataforma Web Adaptativa e Inclusiva com Recursos Visuais, Motores e de Voz

---

## Capa
* **Instituição de Ensino:** [Nome da tua Instituição / Escola / Faculdade]
* **Curso / Programa:** [Nome do teu Curso, ex: Análise e Desenvolvimento de Sistemas]
* **Disciplina:** [Nome da Disciplina]
* **Título do Projeto:** Painel Interativo de Acessibilidade Digital (45+ e Idosos)
* **Equipa de Desenvolvimento:** [O teu Nome Completo e Nome dos Colegas]
* **Orientador / Professor:** [Nome do Professor]
* **Data / Ano:** 2026

---

## 1. Introdução
O aumento da expectativa de vida e a digitalização acelerada de serviços essenciais exigem que as interfaces web sejam projetadas para garantir a inclusão de todas as faixas etárias. Este projeto apresenta o desenvolvimento de um painel web interativo voltado para utilizadores maduros (45+) e idosos (60+). A aplicação combina ajustes de interface dinâmicos (visuais e motores), ferramentas de voz para síntese e ditado, navegação direta por âncoras e um indicador de progresso em tempo real que acompanha a configuração da acessibilidade do dispositivo.

---

## 2. Problema
Adultos a partir dos 45 anos iniciam processos de alteração visual, como a presbiopia (vista cansada) e a fadiga ocular. Idosos acima de 60 anos enfrentam frequentemente a redução da precisão motora (tremores ou perda de sensibilidade tátil), além de receio de fraudes virtuais e grande dificuldade em interagir com ecrãs poluídos, de alto brilho, com fontes pequenas e botões difíceis de clicar.

---

## 3. Objetivos
* **Objetivo Geral:** Desenvolver uma aplicação web acessível, intuitiva e altamente adaptável às necessidades visuais, motoras, cognitivas e pedagógicas de utilizadores maduros e idosos.
* **Objetivos Específicos:**
  1. Criar um painel de ajustes rápidos que permita alterar o tamanho das fontes (14px a 30px), o contraste (Alto Contraste), filtros visuais (Luz Azul) e tipografia acessível (OpenDyslexic / Sem Serifa).
  2. Implementar recursos de voz avançados usando a Web Speech API, permitindo leitura por clique, leitura ao passar o rato (hover) e conversação/ditado via microfone.
  3. Proporcionar navegação rápida por âncoras com rolagem suave (`scrollIntoView`) para facilitadores de acesso direto.
  4. Desenvolver um dashboard de progresso dinâmico que calcula de 0% a 100% o nível de adaptação com base num checklist interativo.
  5. Assegurar a persistência de dados localmente via `localStorage`.

---

## 4. Público
* **Adultos Maduros (45 a 59 anos):** Utilizadores que necessitam de ampliação de textos e redução de reflexo/brilho por fadiga visual ao fim do dia.
* **Idosos (60+ anos):** Utilizadores que se beneficiam de alvos de toque ampliados, navegação despoluída, confirmação sonora/tátil e recursos de voz.
* **Professores e Educadores:** Profissionais que lecionam aulas de inclusão digital e necessitam de ferramentas para converter materiais e prestar suporte aos alunos.

---

## 5. Metodologia
Utilizou-se a metodologia ágil **Kanban** combinada com ciclos de desenvolvimento incremental. As etapas foram divididas em sprints focadas em:
1. Levantamento dos requisitos e padrões de acessibilidade baseados na WCAG 2.1 (Nível AA).
2. Construção da estrutura semântica HTML5 e prototipagem de componentes visuais.
3. Programação de regras CSS adaptativas com uso de variáveis CSS.
4. Implementação do comportamento JS (controlo do DOM, síntese de voz, reconhecimento de voz e persistência).
5. Integração com o backend Spring Boot para roteamento da aplicação.

---

## 6. Organização da Equipa
* **Desenvolvimento Front-end:** Estruturação semântica do `index.html`, criação de estilos adaptativos no `style.css` e lógica de interatividade/voz no `script.js`.
* **Desenvolvimento Back-end:** Configuração da classe `AccessibilityController.java` em Java Spring Boot para gestão de rotas e entrega dos ficheiros estáticos.
* **Testes de Qualidade e Documentação:** Validação dos níveis de acessibilidade, testes de microfone/áudio e elaboração da documentação técnica.

---

## 7. Requisitos

### Requisitos Funcionais (RF)
* **RF01:** Permitir a ampliação e redução dinâmica do tamanho do texto entre 14px e 30px.
* **RF02:** Disponibilizar botões seletores para Modo Alto Contraste, Filtro de Luz Azul, Fonte para Dislexia e Modo Simplificado.
* **RF03:** Permitir a navegação por atalhos de voz e leitura de textos em áudio via `SpeechSynthesis`.
* **RF04:** Disponibilizar um módulo de ditado e conversação por voz via `SpeechRecognition` (`webkitSpeechRecognition`).
* **RF05:** Disponibilizar uma barra de navegação com botões de âncoras rápidos para rolagem direta nas secções do sistema.
* **RF06:** Atualizar a barra de progresso dinamicamente até atingir 100% conforme os itens do checklist são selecionados.
* **RF07:** Salvar e carregar automaticamente todas as preferências do utilizador via `localStorage`.

### Requisitos Não Funcionais (RNF)
* **RNF01:** A interface deve seguir rigorosamente os princípios de contraste e acessibilidade da WCAG 2.1.
* **RNF02:** Resposta de interação ágil com feedback hápico (vibração `navigator.vibrate`) em ecrãs móveis.
* **RNF03:** Compatibilidade com navegadores modernos que possuem suporte às APIs Web Speech nativas.

---

## 8. Modelagem
A estrutura arquitetural segue o padrão **MVC (Model-View-Controller)** simplificado, onde o Spring Boot atua na entrega de ativos estáticos e o cliente consome os dados localmente:

* **Controller (Back-end):**
  * `AccessibilityController.java`: Classe responsável por escutar requisições nas rotas `/` e `/acessibilidade`, efetuando o encaminhamento para o ficheiro estático principal.
* **View / Client (Front-end):**
  * `index.html`: Camada de apresentação e estrutura semântica.
  * `style.css`: Camada de estilização e alternância dinâmica de estilos via classes de estado no `body`.
  * `script.js`: Controlador do lado do cliente responsável pelas funções de acessibilidade, gestão de eventos e persistência no `localStorage`.

---

## 9. Protótipo
O protótipo visual foi construído priorizando o conforto visual e a usabilidade de pessoas com limitações motoras leves:
* **Topo:** Título principal limpo em tamanho extra grande, garantindo leitura imediata sem sombras ou faixas de fundo poluídas.
* **Painel de Controlo:** Posicionado estrategicamente no topo da página, contendo botões de ação rápida e atalhos de navegação direta (âncoras).
* **Corpo do Dashboard:** Organizado em cartões (`cards`) bem definidos, tabelas didáticas responsivas com bordas claras e checklist interativo de fácil marcação.

---

## 10. Desenvolvimento
O desenvolvimento foi executado em três camadas perfeitamente integradas:
1. **Estrutura HTML5:** Construída com foco em semântica (`<main>`, `<section>`, `<article>`, `<header>`) e marcação para leitores de ecrã.
2. **Estilização CSS3:** Utilizou variáveis CSS (`:root`) para permitir trocas instantâneas de temas (Alto Contraste, Luz Azul, Fonte Dislexia) sem recarregar a página.
3. **Comportamento em JavaScript (Vanilla):** Implementou manipuladores para eventos de clique, atalhos de teclado (`Alt + 1`, `Alt + 2`, `Alt + C`), leitura por hover, cálculo percentual do progresso (0% a 100%) e controlo das Web APIs de Voz.
4. **Servidor Java Spring Boot:** Criação da estrutura de projeto Java que mapeia as portas do servidor e entrega a aplicação web pronta para produção.

---

## 11. Explicação do Código

### 1. Mapeamento no Back-end (`AccessibilityController.java`)
```java
package com.exemplo.acessibilidade.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AccessibilityController {

    // Mapeia a raiz e a rota /acessibilidade para servir o index.html
    @GetMapping({"/", "/acessibilidade"})
    public String index() {
        return "forward:/index.html";
    }
}



function updateProgress() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    
    // Cálculo proporcional: atinge exatamente 100% ao marcar todas as caixas
    const percentage = Math.round((checkedCount / checkboxes.length) * 100);
    
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    progressBar.style.width = percentage + '%';
    progressText.textContent = percentage === 100 ? '100% Concluído 🎉' : percentage + '% Concluído';
}



function toggleDictation() {
    if (!recognition) {
        alert("O seu navegador não suporta o reconhecimento de voz.");
        return;
    }

    const btn = document.getElementById('btn-dictate');
    const output = document.getElementById('dictation-output');

    if (!isListening) {
        recognition.start();
        isListening = true;
        btn.textContent = '🛑 A escutar... (Fale agora)';
        output.textContent = 'A escutar...';
    } else {
        recognition.stop();
        isListening = false;
        btn.textContent = '🎤 Falar / Ditar';
    }
}
