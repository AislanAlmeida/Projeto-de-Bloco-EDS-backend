# Projeto-de-Bloco-Engenharia-Disciplinada-de-Softwares
--
## Requisitos Funcionais
- Expressam características e restrições do produto de software, do ponto de vista de *satisfação das necessidades do usuário*
- Independem da tecnologia empregada na construção da solução
- **É a parta mais crítica e propensa a erros no desenvolvimento de software**
- É uma condição ou capacidade com a qual o sistema deve estar em conformidade.
- É uma especificação do que deve ser implementado ou uma restrição de algum tipo no sistema.
- Que tarefas o sistema deverá ter para atender às necessidades dos usuários?
- O Sistema deve... + verbo e complemento, exemplo: *realizar o cadastramento de funcionários*
--
## Requisitos Não Funcionais
- Definem **características qualitativas** do sistema, recursos que o sistema precisa ter para cumprir seus objetivos.
- É necessário fazer um inventário dos **Requisitos não funcionais** nas entrevistas com os interessados, relacionando tudo o que é necessário para o sistema.

[ISO/IEC 9126](https://pt.wikipedia.org/wiki/ISO/IEC_9126)
![plot](https://upload.wikimedia.org/wikipedia/commons/0/0e/ISO-9126-geral.png?raw=true)

--
## Bons Requisitos
- *Completo* - Ler e entender. Não são necessários figuras.
- *Correto* - Apenas o usuário decide se o requisito está correto ou não.
- *Viável (técnica ou financeira)* - É possível fazer e o cliente está disposto a pagar?
- *Necessário* - Não se apegar a uma ideia que sabemos não ser necessária ao funcionamento do sistema.
- *Priorizado* - Toda vez que um novo usuário for entrevistado os requisitos leventados entram na fila de acordo com o seu grau de prioridade.
- *Não ambiguo* - Deve ser medido
- *Verificável* - Deve poder ser testado, se não puder não deve estar na fila.

--
## Ficha de Requisitos

| ID           |Nome                  | Descrição           | Prioridade   |Casos de Uso |Classes |
|--------------|----------------------|---------------------|--------------|-------------|--------|
| RF_Exemplo   | Manter (Crud) Cliente| Descrição exemplo 1 | Prioridade 1 | C_1         |        |
| RF_Exemplo 2 | Manter (CRUD) Produto| Descrição exemplo 2 | Prioridade 2 | C_2         |        |
|              |                      |                     |              |             |        |

--
As prioridades podem ser classificadas como:
- Esseencial - é o requisito sem o qual o sistema não funciona. Precisa ser implementado.
- Importante - é o requisito que permite o sistema entrar em funcionamento, mas não de forma satisfatória.
- Desejável - são os requisitos que não comprometem a funcionalidade básica do sistema

--
## Casos de uso
- Descreve o comportamento sistema do **ponto de vista do usuário**, fornecendo uma descrição funcional.
- Descreve interações do sistema com o exterior (Atores) - *tambem podem ser consideradas Roles* - fogem ao controle do seu sistema.
- Descrevem os requisitos funcionais do sistema ou "o que" deve fazer.
- Descreve claramente as responsabilidades que devem ser cumpridas pelo sistema.

--
-**Ator:** gerador de estímulos no sistema.
-**Processo:** vai absorver e processar estímulos do ator (é o caso de uso)
