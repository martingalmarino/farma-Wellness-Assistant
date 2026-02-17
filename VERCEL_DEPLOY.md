# 🚀 Guía de Deployment en Vercel

## ✅ Código ya está en GitHub

Tu proyecto ya está publicado en:
**https://github.com/martingalmarino/farma-Wellness-Assistant**

---

## Método 1: Deploy desde Vercel Dashboard (Recomendado)

### Paso 1: Acceder a Vercel
1. Ve a https://vercel.com
2. Inicia sesión con tu cuenta de GitHub

### Paso 2: Importar Proyecto
1. Click en **"Add New..."** → **"Project"**
2. Busca **"farma-Wellness-Assistant"** en tu lista de repos
3. Click en **"Import"**

### Paso 3: Configurar Proyecto
Vercel detectará automáticamente que es un proyecto Next.js:

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

**No necesitas cambiar nada**, Vercel lo configura automáticamente.

### Paso 4: Deploy
1. Click en **"Deploy"**
2. Espera 2-3 minutos mientras se construye
3. ¡Listo! Tu app estará live en: `https://farma-wellness-assistant.vercel.app`

---

## Método 2: Deploy desde Terminal (Alternativa)

### Instalar Vercel CLI

```bash
npm i -g vercel
```

### Deploy

```bash
cd "/Users/martingalmarino/Desktop/farmaquiero demo agentica"
vercel
```

Sigue las instrucciones:
- **Set up and deploy?** → Y
- **Which scope?** → Tu cuenta personal
- **Link to existing project?** → N
- **Project name?** → farma-wellness-assistant
- **Directory?** → ./
- **Override settings?** → N

Luego para production:
```bash
vercel --prod
```

---

## Configuración Automática de Vercel

Vercel detecta automáticamente:
- ✅ Framework: Next.js 14
- ✅ Node version: 18.x o superior
- ✅ Build command: `npm run build`
- ✅ Output directory: `.next`
- ✅ Install command: `npm install`

**No necesitas variables de entorno** - todo funciona out-of-the-box.

---

## URLs del Proyecto

Una vez deployed, tendrás:

- **Production URL:** `https://farma-wellness-assistant.vercel.app`
- **Git Branch:** main
- **GitHub Repo:** https://github.com/martingalmarino/farma-Wellness-Assistant

---

## Deployments Automáticos

Vercel está configurado para auto-deploy:

- **Push a `main`** → Automatic production deployment
- **Pull Request** → Automatic preview deployment
- **Cada commit** genera una preview URL única

---

## Verificar el Deployment

Una vez desplegado, verifica:

1. **Home page:** `https://tu-url.vercel.app/`
2. **Assistant:** `https://tu-url.vercel.app/assistant`
3. **Cart:** `https://tu-url.vercel.app/cart`
4. **Debug:** `https://tu-url.vercel.app/debug`

### Checklist Post-Deployment

- [ ] La página principal carga sin errores
- [ ] El asistente funciona correctamente
- [ ] El carrito persiste en localStorage
- [ ] Las recomendaciones se generan
- [ ] El checkout simula correctamente
- [ ] Los eventos se registran en /debug
- [ ] Mobile responsive funciona
- [ ] No hay errores en la consola

---

## Performance en Vercel

Tu app está optimizada para Vercel:
- ✅ Edge Network global
- ✅ Automatic HTTPS
- ✅ Serverless Functions
- ✅ Image Optimization
- ✅ Analytics incluido

---

## Comandos Útiles

```bash
# Ver status del proyecto
vercel ls

# Ver deployments
vercel list

# Ver logs
vercel logs

# Eliminar proyecto
vercel remove farmaquiero-demo
```

---

## Troubleshooting

### Build Falla

Si el build falla en Vercel:

1. Verifica que el repo esté actualizado:
```bash
git status
git push
```

2. Limpia y rebuild localmente:
```bash
rm -rf .next node_modules
npm install
npm run build
```

3. Si funciona local, debería funcionar en Vercel.

### localStorage no funciona

- localStorage funciona normalmente en Vercel
- Es del lado del cliente, no afecta el deployment
- Verifica que no estés en modo incógnito

---

## URLs de Referencia

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Docs Next.js + Vercel:** https://nextjs.org/docs/deployment
- **GitHub Repo:** https://github.com/martingalmarino/farma-Wellness-Assistant

---

## 🎉 ¡Tu App está Lista para Deploy!

**Pasos Finales:**

1. Ve a https://vercel.com
2. Import → Selecciona "farma-Wellness-Assistant"
3. Click "Deploy"
4. Espera 2-3 minutos
5. ¡Disfruta tu app en producción!

**Tiempo total:** ~5 minutos

---

*Última actualización: 17 de febrero de 2026*
