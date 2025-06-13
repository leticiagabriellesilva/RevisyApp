# Revisy

## Descrição do projeto:

Aplicativo mobile de estudos baseado em flashcards e na metodologia da repetição espaçada, com o intuito de auxiliar estudantes na retenção de conteúdos e melhoria do desempenho acadêmico.

### Requisitos:
- Visual Studio Code (IDE recomendada)
- Node.js versão 18 ou superior (recomendado)
- npm versão 9 ou superior (recomendado)

## Instalação do projeto:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/leticiagabriellesilva/RevisyApp.git
   cd RevisyApp
   ```

2. **Troque para a branch develop:**
   ```bash
   git checkout develop
   ```

3. **Faça o pull da branch develop:**
   ```bash
   git pull origin develop
   ```
   
4. **Abra o projeto na IDE**

5. **Abra o primeiro terminal e escreva:**
   ```bash
   npm install
   ```

6. **Abra o segundo terminal e escreva:**
  ```bash
   cd .\backend\
   npx prisma migrate dev --name init
   node index.js
   ```
- Após isso, uma mensagem que o servidor está funcionando deve aparecer:
  
![image](https://github.com/user-attachments/assets/0b5c17dc-e062-40ae-a1aa-8fff0fe0c305)


7. **Volte no primeiro terminal e execute o projeto**
  ```bash
   npx expo start
  ```

8. **Desenvolvedores e colaboradores**

Front-end: 
- Leticia Gabrielle Alves da Silva
- Marlon Rodrigues Fontes
- Bruno Luan Lee Holanda

Back-end:
- Luan Lima Spataro
- Júlio César Cardoso Contreras Muniz
  

