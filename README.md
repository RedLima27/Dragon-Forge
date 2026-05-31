# Dragon Forge — Site Público

Site institucional e vitrine comercial da Dragon Forge Cutelaria Artesanal.  
Desenvolvido em HTML, CSS e JavaScript puro — sem frameworks, sem dependências de build.

## Estrutura

```
/
├── index.html          ← entrada principal
├── vercel.json         ← configuração de deploy (Vercel)
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── config.js   ← URL da API (edite antes do deploy)
    │   ├── script.js
    │   └── mat_imgs.js
    └── IMG/
        ├── Dragon Forge Logo.png
        └── materiais/  ← fotos dos aços e madeiras
```

## Como rodar localmente

Abra o `index.html` diretamente no navegador ou use o Live Server do VS Code.

## Deploy na Vercel

1. Faça fork/clone deste repositório
2. Abra `assets/js/config.js` e troque `API_URL` pela URL do seu backend:
   ```js
   const CONFIG = {
     API_URL: 'https://sua-api.railway.app/api',
     WA_NUMBER: '5511999999999',
   };
   ```
3. Importe o repositório na [Vercel](https://vercel.com)
4. Framework preset: **Other**
5. Root directory: `/` (raiz do repo)
6. Clique em **Deploy**

O `vercel.json` já está configurado — nenhuma outra configuração necessária.

## Modo offline

O site funciona sem backend. Catálogo, configurador, promoções e FAQ carregam com dados locais. Pagamento e rastreio ficam em modo demo. Para funcionalidade completa, suba o `backend-public` separadamente.

## Repositórios relacionados

| Parte | Repositório |
|-------|-------------|
| Este (site público) | `dragon-forge-public` |
| Painel admin | `dragon-forge-admin` |
| API pública | `dragon-forge-backend-public` |
| API admin | `dragon-forge-backend-admin` |

---

Dragon Forge Cutelaria Artesanal · Todos os direitos reservados
