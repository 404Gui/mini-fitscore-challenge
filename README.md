# FitScore LEGAL™

Aplicação front-end para avaliação de candidatos com base em **Performance**, **Energia** e **Cultura**.  
O sistema calcula o **FitScore** de cada candidato, classifica em níveis e exibe os resultados em um dashboard interativo.

---

## ✨ Funcionalidades

### 1. Formulário FitScore
- 10 perguntas divididas em 3 blocos:
  - **Performance**: experiência, entregas, habilidades
  - **Energia**: disponibilidade, prazos, pressão
  - **Cultura**: visão viva, execução energizada, resultados com ressonância, alinhamento com alma
- Preenchimento com escala **1 a 10**
- Cálculo automático do **FitScore**
- Classificação:
  - **Fit Altíssimo** (≥ 80)
  - **Fit Aprovado** (60–79)
  - **Fit Questionável** (40–59)
  - **Fora do Perfil** (< 40)
- Notificação simulada via **SweetAlert2**

---

### 2. Dashboard
- Lista de todos os candidatos avaliados
- Exibição: Nome, E-mail, FitScore e Classificação
- Filtros por classificação
- Estatísticas gerais (total, aprovados, altíssimos)
- Estados de loading, vazio e erro
- Layout responsivo

---

### 3. Persistência
- **LocalStorage** usado para salvar candidatos (mínimo viável).
- Não há back-end real neste MVP.
- Alternativas recomendadas: **Supabase**, **Firebase** ou JSON Server.

---

### 4. Processamento Assíncrono (simulado)
- **Lógica 1 – Notificação de Resultado**
  - Trigger: envio do formulário
  - Ação: salva candidato no localStorage e mostra notificação (simulando e-mail enviado).
- **Lógica 2 – Relatório de Aprovados**
  - Trigger: execução automática (simulada a cada 60 segundos)
  - Ação: consulta candidatos com FitScore ≥ 60
  - Ação: mostra notificação para o gestor (simulando relatório enviado).

💡 **Extra**: possível evoluir para enviar notificações reais via e-mail/SMS integrando com Supabase ou serviços externos.

---

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/) + React
- [lucide-react](https://lucide.dev/) – ícones
- [SweetAlert2](https://sweetalert2.github.io/) – notificações
- **LocalStorage** – persistência local (simulada)

---

## ⚙️ Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/fitscore-legal.git

# Acesse a pasta
cd fitscore-legal

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev

# Acesse em http://localhost:3000
