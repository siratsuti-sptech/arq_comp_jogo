# ゲームのことば · Palavras do Jogo

Jogo de estudo para a disciplina de **Arquitetura Computacional** (Sprint 3), feito em HTML, CSS e JavaScript puros. O visual é inspirado em pôsteres japoneses clássicos, com céu de pôr do sol: quanto mais você acerta, mais o sol sobe.

🔗 **Jogue aqui:** https://siratsuti-sptech.github.io/arq_comp_jogo/

## Como jogar

O jogo tem duas fases, que podem ser jogadas em qualquer ordem.

### Montar o Computador
1. Escolha uma peça na bandeja (clique nela ou arraste).
2. Coloque no encaixe cuja descrição combina com a função da peça.
3. Ao acertar, aparece um card com a sigla, o nome completo e uma explicação curta.
4. Peça no lugar errado não encaixa: leia de novo a descrição e tente outra.

### Cruzadinha
1. Clique numa casa (ou numa pista) e digite as letras direto no tabuleiro. As setas do teclado movem o cursor.
2. Pistas numeradas ficam separadas em **Horizontais** e **Verticais**.
3. Clique em **Conferir** para ver quais palavras estão certas (verde) e erradas (vermelho).
4. O contador mostra quantas palavras já estão corretas, por exemplo "8 de 16 palavras".
5. **Reiniciar** limpa o tabuleiro.

As palavras acertadas viram **cartas descobertas**, listadas no fim da página.

## Palavras e pistas

| Nº | Resposta | Termo | Pista |
|----|----------|-------|-------|
| 1 | CPU | CPU (Unidade Central de Processamento) | Cérebro do computador: executa as instruções dos programas. |
| 2 | ULA | ULA (Unidade Lógica e Aritmética) | Parte da CPU que faz as contas e as operações lógicas. |
| 3 | UC | UC (Unidade de Controle) | Dentro da CPU, comanda e coordena o que cada parte deve fazer. |
| 4 | REGISTRADORES | Registradores (Registradores) | Minúsculas áreas dentro da CPU, as mais rápidas de todas. |
| 5 | RAM | RAM (Memória de Acesso Aleatório) | Memória de trabalho rápida: perde tudo quando a energia acaba. |
| 6 | ROM | ROM (Memória Somente de Leitura) | Memória permanente que guarda o programa de inicialização do equipamento. |
| 7 | EEPROM | EEPROM (ROM Programável e Apagável Eletricamente) | Memória não volátil que pode ser apagada por eletricidade, byte a byte. |
| 8 | FLASH | Flash (Memória Flash) | Memória não volátil apagada em blocos, comum em pendrives e SSDs. |
| 9 | CACHE | Cache (Memória Cache) | Pequena e veloz, fica entre a CPU e a RAM guardando o que é usado muito. |
| 10 | MEMORIADEMASSA | Memória de massa (Armazenamento) | Guarda arquivos e programas por muito tempo, como HD ou SSD. |
| 11 | DMA | DMA (Acesso Direto à Memória) | Deixa periféricos trocarem dados com a memória sem ocupar o processador. |
| 12 | ADDRESSBUS | Address bus (Barramento de Endereços) | Caminho que leva da CPU o local da memória a ser acessado. |
| 13 | DATABUS | Data bus (Barramento de Dados) | Caminho por onde os valores trafegam entre CPU, memória e periféricos. |
| 14 | MICROCONTROLADOR | Microcontrolador (Microcontrolador) | Chip único com processador, memória e periféricos, comum em sistemas embarcados. |
| 15 | DUALCORE | Dual core (Processador de dois núcleos) | Processador com dois núcleos de processamento no mesmo chip. |
| 16 | QUADCORE | Quad core (Processador de quatro núcleos) | Processador com quatro núcleos para executar tarefas em paralelo. |

## Estrutura

- `index.html`: estrutura da página
- `style.css`: visual
- `script.js`: dados, montagem do computador e cruzadinha

## Como rodar localmente

Baixe o repositório e abra o `index.html` no navegador. Não precisa instalar nada.

## Publicação

Site estático publicado com GitHub Pages (branch `main`, pasta raiz).
